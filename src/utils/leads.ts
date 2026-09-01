import { apiUrl } from './apiBase';

export interface LeadPayload {
  source: 'contact' | 'newsletter';
  email: string;
  name?: string;
  phone?: string;
  interest?: string;
  message?: string;
  consent: boolean;
}

/**
 * Envia el lead al endpoint /api/leads de forma "fire-and-forget": nunca lanza ni
 * bloquea la UX. El redirect a WhatsApp sigue siendo el canal principal; esto solo
 * persiste el contacto cuando la base de datos esta configurada.
 */
export const submitLead = (payload: LeadPayload): void => {
  try {
    void fetch(apiUrl('/api/leads'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Silencioso a proposito: la captura de leads no debe afectar al usuario.
  }
};
