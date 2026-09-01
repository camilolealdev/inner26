import { recordLead, type LeadInput } from './_lib/db';

const readBody = (req: any) => (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {});

const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);

const emailOk = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  try {
    const body = readBody(req);

    // Honeypot anti-bot: si viene relleno, fingir exito sin guardar.
    if (clean(body.honeypot, 200)) return res.status(200).json({ stored: false });

    const source = body.source === 'newsletter' ? 'newsletter' : 'contact';
    const email = clean(body.email, 180).toLowerCase();
    if (!emailOk(email)) return res.status(400).json({ error: 'Email invalido' });

    // Consentimiento explicito requerido (Habeas Data). El frontend envia consent=true
    // solo si el usuario marca la casilla que enlaza a la politica de privacidad.
    if (body.consent !== true) return res.status(400).json({ error: 'Consentimiento requerido' });

    const name = clean(body.name, 120);
    if (source === 'contact' && name.length < 2) {
      return res.status(400).json({ error: 'Nombre requerido' });
    }

    const lead: LeadInput = {
      source,
      email,
      consent: true,
      ...(name ? { name } : {}),
      ...(body.phone ? { phone: clean(body.phone, 40) } : {}),
      ...(body.interest ? { interest: clean(body.interest, 60) } : {}),
      ...(body.message ? { message: clean(body.message, 2000) } : {}),
    };

    try {
      await recordLead(lead);
      return res.status(201).json({ stored: true });
    } catch (dbError) {
      // Sin base de datos configurada el sitio sigue funcionando (los formularios
      // tambien abren WhatsApp). No romper la UX: reportar que no se persistio.
      const reason = dbError instanceof Error ? dbError.message : 'db no disponible';
      return res.status(200).json({ stored: false, reason });
    }
  } catch {
    return res.status(400).json({ error: 'Solicitud invalida' });
  }
}
