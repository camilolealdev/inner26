export type CommerceItemType = 'product' | 'class' | 'event';

export interface CheckoutItemInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: CommerceItemType;
  details?: string;
  illustrationName?: string;
}

export interface CheckoutItem extends CheckoutItemInput {
  unitPrice: number;
  lineTotal: number;
}

const productCatalog = new Map<string, { name: string; price: number }>([
  ['prod-1', { name: 'Cristal de Cuarzo', price: 45000 }],
  ['prod-2', { name: 'Incienso Natural', price: 22000 }],
  ['prod-3', { name: 'Aceite Esencial', price: 35000 }],
  ['prod-4', { name: 'Diario de Gratitud', price: 65000 }],
  ['prod-5', { name: 'Vela de Soja', price: 48000 }],
  ['prod-6', { name: 'Manta de Lino', price: 120000 }],
  ['prod-7', { name: 'Cuenco Tibetano', price: 160000 }],
  ['prod-8', { name: 'Palo Santo', price: 28000 }],
]);

const normalizeName = (value: string) =>
  value
    .replace(/\u00c3\u00a1/g, 'a')
    .replace(/\u00c3\u00a9/g, 'e')
    .replace(/\u00c3\u00ad/g, 'i')
    .replace(/\u00c3\u00b3/g, 'o')
    .replace(/\u00c3\u00ba/g, 'u')
    .replace(/\u00c3\u00b1/g, 'n')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();

const serviceEntries: Array<[string, { name: string; price: number }]> = [
  ['Yoga', { name: 'Yoga', price: 36000 }],
  ['Clase de Yoga', { name: 'Yoga', price: 36000 }],
  ['Yoga Flow', { name: 'Yoga Flow', price: 36000 }],
  ['Meditacion', { name: 'Meditacion', price: 36000 }],
  ['Meditacion & Breathwork', { name: 'Meditacion & Breathwork', price: 36000 }],
  ['Breathwork', { name: 'Breathwork', price: 36000 }],
  ['Danza & Movimiento', { name: 'Danza & Movimiento', price: 36000 }],
  ['Danza & Sound Healing', { name: 'Danza & Sound Healing', price: 36000 }],
  ['Sound Healing', { name: 'Sound Healing', price: 36000 }],
  ['Inner Dance', { name: 'INNER DANCE', price: 60000 }],
  ['Kamaflight', { name: 'KAMAFLIGHT', price: 75000 }],
];

const serviceCatalog = new Map<string, { name: string; price: number }>(
  serviceEntries.map(([key, value]) => [normalizeName(key), value])
);

const cleanText = (value: unknown, fallback = '') =>
  String(value ?? fallback).trim().slice(0, 180);

export const normalizeCheckoutItems = (items: unknown): CheckoutItem[] => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Carrito vacio');
  }

  return items.slice(0, 20).map((raw) => {
    const item = raw as Partial<CheckoutItemInput>;
    const type = item.type;
    if (type !== 'product' && type !== 'class' && type !== 'event') {
      throw new Error('Tipo de item invalido');
    }

    const id = cleanText(item.id);
    const quantity = Math.min(Math.max(Number(item.quantity ?? 1), 1), 10);
    let name = cleanText(item.name);
    let unitPrice = Number(item.price ?? 0);

    if (type === 'product') {
      const canonical = productCatalog.get(id);
      if (!canonical) throw new Error(`Producto no permitido: ${id}`);
      name = canonical.name;
      unitPrice = canonical.price;
    } else {
      const canonical = serviceCatalog.get(normalizeName(name));
      if (!canonical) throw new Error(`Reserva no permitida: ${name}`);
      name = canonical.name;
      unitPrice = canonical.price;
    }

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      throw new Error('Precio invalido');
    }

    const normalized: CheckoutItem = {
      id,
      name,
      type,
      quantity,
      price: unitPrice,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
    if (item.details) normalized.details = cleanText(item.details);
    if (item.illustrationName) normalized.illustrationName = cleanText(item.illustrationName);
    return normalized;
  });
};
