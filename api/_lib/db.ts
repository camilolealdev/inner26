import crypto from 'crypto';
import pg from 'pg';
import type { CheckoutItem } from './catalog';
import type { OrderSnapshot, PaymentProvider } from './orders';

const { Pool } = pg;

let pool: pg.Pool | null = null;
let schemaReady: Promise<void> | null = null;

const getPool = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString && process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL no configurado');
  }
  if (!connectionString) {
    throw new Error('DATABASE_URL requerido para ordenes persistentes');
  }
  pool ??= new Pool({
    connectionString,
    ssl:
      process.env.DATABASE_SSL === 'false'
        ? false
        : {
            rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
            ...(process.env.DATABASE_SSL_CA ? { ca: process.env.DATABASE_SSL_CA } : {}),
          },
    max: 4,
  });
  return pool;
};

export const ensureCommerceSchema = async () => {
  schemaReady ??= (async () => {
    const db = getPool();
    await db.query(`
      create table if not exists orders (
        id text primary key,
        status text not null default 'pending_payment',
        provider text not null,
        provider_reference text unique,
        currency text not null default 'COP',
        subtotal_amount integer not null,
        total_amount integer not null,
        amount_in_cents integer not null,
        customer_name text not null,
        customer_email text not null,
        customer_phone text,
        fulfillment_type text,
        delivery_address text,
        idempotency_key text not null unique,
        payload_hash text not null,
        order_token text not null,
        checkout_url text,
        paid_at timestamptz,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create table if not exists order_items (
        id bigserial primary key,
        order_id text not null references orders(id) on delete cascade,
        item_id text not null,
        item_type text not null,
        title text not null,
        details text,
        unit_amount integer not null,
        quantity integer not null,
        line_total integer not null,
        illustration_name text
      );

      create table if not exists webhook_events (
        id bigserial primary key,
        provider text not null,
        event_id text not null,
        payload jsonb not null,
        processed_at timestamptz not null default now(),
        unique(provider, event_id)
      );

      create table if not exists email_deliveries (
        id bigserial primary key,
        order_id text not null references orders(id) on delete cascade,
        delivery_type text not null,
        status text not null,
        message text,
        created_at timestamptz not null default now(),
        unique(order_id, delivery_type)
      );

      alter table orders add column if not exists fulfillment_type text;
      alter table orders add column if not exists delivery_address text;
    `);
  })();
  return schemaReady;
};

export const hashPayload = (value: unknown) =>
  crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

const mapOrder = (row: any, items: CheckoutItem[]): OrderSnapshot => {
  const order: OrderSnapshot = {
    orderId: row.id,
    provider: row.provider as PaymentProvider,
    currency: row.currency,
    amount: row.total_amount,
    amountInCents: row.amount_in_cents,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
      ...(row.customer_phone ? { phone: row.customer_phone } : {}),
    },
    items,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
  };

  if (row.fulfillment_type === 'pickup' || row.fulfillment_type === 'delivery') {
    order.fulfillment = {
      type: row.fulfillment_type,
      ...(row.delivery_address ? { address: row.delivery_address } : {}),
    };
  }

  return order;
};

const mapItem = (row: any): CheckoutItem => ({
  id: row.item_id,
  name: row.title,
  type: row.item_type,
  quantity: row.quantity,
  price: row.unit_amount,
  unitPrice: row.unit_amount,
  lineTotal: row.line_total,
  details: row.details || undefined,
  illustrationName: row.illustration_name || undefined,
});

export const createOrderRecord = async (
  order: OrderSnapshot,
  token: string,
  idempotencyKey: string,
  payloadHash: string
) => {
  await ensureCommerceSchema();
  const db = getPool();
  const existing = await db.query('select * from orders where idempotency_key = $1', [idempotencyKey]);
  if (existing.rowCount) {
    const row = existing.rows[0];
    if (row.payload_hash !== payloadHash) throw new Error('Idempotency-Key reutilizada con payload distinto');
    return getOrderById(row.id);
  }

  const client = await db.connect();
  try {
    await client.query('begin');
    await client.query(
      `insert into orders (
        id, status, provider, currency, subtotal_amount, total_amount, amount_in_cents,
        customer_name, customer_email, customer_phone, fulfillment_type, delivery_address,
        idempotency_key, payload_hash, order_token
      ) values ($1,'pending_payment',$2,'COP',$3,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        order.orderId,
        order.provider,
        order.amount,
        order.amountInCents,
        order.customer.name,
        order.customer.email,
        order.customer.phone || null,
        order.fulfillment?.type || null,
        order.fulfillment?.address || null,
        idempotencyKey,
        payloadHash,
        token,
      ]
    );

    for (const item of order.items) {
      await client.query(
        `insert into order_items (
          order_id, item_id, item_type, title, details, unit_amount, quantity, line_total, illustration_name
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          order.orderId,
          item.id,
          item.type,
          item.name,
          item.details || null,
          item.unitPrice,
          item.quantity,
          item.lineTotal,
          item.illustrationName || null,
        ]
      );
    }

    await client.query('commit');
    return order;
  } catch (error) {
    await client.query('rollback');
    if ((error as { code?: string }).code === '23505') {
      const existing = await db.query('select id, payload_hash from orders where idempotency_key = $1', [idempotencyKey]);
      if (existing.rowCount && existing.rows[0].payload_hash === payloadHash) {
        return getOrderById(existing.rows[0].id);
      }
    }
    throw error;
  } finally {
    client.release();
  }
};

export const getOrderById = async (orderId: string): Promise<OrderSnapshot> => {
  await ensureCommerceSchema();
  const db = getPool();
  const orderResult = await db.query('select * from orders where id = $1', [orderId]);
  if (!orderResult.rowCount) throw new Error('Orden no encontrada');
  const itemsResult = await db.query('select * from order_items where order_id = $1 order by id', [orderId]);
  return mapOrder(orderResult.rows[0], itemsResult.rows.map(mapItem));
};

export const getOrderToken = async (orderId: string) => {
  await ensureCommerceSchema();
  const db = getPool();
  const result = await db.query('select order_token from orders where id = $1', [orderId]);
  if (!result.rowCount) throw new Error('Orden no encontrada');
  return String(result.rows[0].order_token);
};

export const getOrderPaymentMeta = async (orderId: string) => {
  await ensureCommerceSchema();
  const db = getPool();
  const result = await db.query(
    'select status, provider, provider_reference, checkout_url from orders where id = $1',
    [orderId]
  );
  if (!result.rowCount) throw new Error('Orden no encontrada');
  return {
    status: String(result.rows[0].status),
    provider: String(result.rows[0].provider),
    providerReference: result.rows[0].provider_reference ? String(result.rows[0].provider_reference) : undefined,
    checkoutUrl: result.rows[0].checkout_url ? String(result.rows[0].checkout_url) : undefined,
  };
};

export const attachCheckoutToOrder = async (orderId: string, providerReference: string, checkoutUrl: string) => {
  await ensureCommerceSchema();
  const db = getPool();
  await db.query(
    `update orders
     set provider_reference = $2, checkout_url = $3, updated_at = now()
     where id = $1`,
    [orderId, providerReference, checkoutUrl]
  );
};

export const markOrderStatus = async (orderId: string, status: string, providerReference?: string) => {
  await ensureCommerceSchema();
  const db = getPool();
  await db.query(
    `update orders
     set status = case when status = 'paid' and $2 <> 'paid' then status else $2 end,
         provider_reference = case when status = 'paid' and $2 <> 'paid' then provider_reference else coalesce($3, provider_reference) end,
         paid_at = case when $2 = 'paid' and paid_at is null then now() else paid_at end,
         updated_at = now()
     where id = $1`,
    [orderId, status, providerReference || null]
  );
};

export const recordWebhookEvent = async (provider: string, eventId: string, payload: unknown) => {
  await ensureCommerceSchema();
  const db = getPool();
  const result = await db.query(
    `insert into webhook_events (provider, event_id, payload)
     values ($1,$2,$3)
     on conflict (provider, event_id) do nothing
     returning id`,
    [provider, eventId, JSON.stringify(payload)]
  );
  return Boolean(result.rowCount);
};

export const recordEmailDelivery = async (
  orderId: string,
  deliveryType: string,
  status: string,
  message?: string
) => {
  await ensureCommerceSchema();
  const db = getPool();
  const result = await db.query(
    `insert into email_deliveries (order_id, delivery_type, status, message)
     values ($1,$2,$3,$4)
     on conflict (order_id, delivery_type) do update
     set status = excluded.status, message = excluded.message, created_at = now()
     where email_deliveries.status in ('failed', 'skipped')
        or (email_deliveries.status = 'processing' and email_deliveries.created_at < now() - interval '10 minutes')
     returning id`,
    [orderId, deliveryType, status, message || null]
  );
  return Boolean(result.rowCount);
};

export const updateEmailDelivery = async (
  orderId: string,
  deliveryType: string,
  status: string,
  message?: string
) => {
  await ensureCommerceSchema();
  const db = getPool();
  await db.query(
    `update email_deliveries
     set status = $3, message = $4, created_at = now()
     where order_id = $1 and delivery_type = $2`,
    [orderId, deliveryType, status, message || null]
  );
};

// --- Leads (contacto / newsletter) -----------------------------------------
// Esquema propio para no arrastrar las tablas de comercio al capturar un lead.
let leadsSchemaReady: Promise<void> | null = null;

export interface LeadInput {
  source: string;
  name?: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  consent: boolean;
}

export const ensureLeadsSchema = async () => {
  leadsSchemaReady ??= (async () => {
    const db = getPool();
    await db.query(`
      create table if not exists leads (
        id bigserial primary key,
        source text not null,
        name text,
        email text not null,
        phone text,
        interest text,
        message text,
        consent boolean not null default false,
        created_at timestamptz not null default now()
      );
    `);
  })();
  return leadsSchemaReady;
};

export const recordLead = async (lead: LeadInput) => {
  await ensureLeadsSchema();
  const db = getPool();
  await db.query(
    `insert into leads (source, name, email, phone, interest, message, consent)
     values ($1,$2,$3,$4,$5,$6,$7)`,
    [lead.source, lead.name || null, lead.email, lead.phone || null, lead.interest || null, lead.message || null, lead.consent]
  );
};
