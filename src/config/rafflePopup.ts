import type { PageName } from '../context/NavigationContext';

/**
 * Config unica de la rifa activa. Editar estos valores es todo lo que hace
 * falta para cambiar/relanzar la rifa desde codigo: no hay estado duplicado
 * en ningun otro archivo.
 *
 * Para lanzar una rifa nueva, cambia `id` (esto resetea el localStorage de
 * quienes ya vieron/participaron en la anterior) junto con el contenido.
 * Para apagarla sin borrar nada, pon `enabled: false`.
 */
export interface RafflePopupConfig {
  enabled: boolean;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  prizeLabel: string;
  deadlineLabel: string;
  bullets: string[];
  termsUrl?: string;
  ctaLabel: string;
  successTitle: string;
  successMessage: string;
  /** Milisegundos de espera tras cargar la pagina antes de mostrar el popup. */
  delayMs: number;
  /** Si el usuario lo cierra sin participar, dias antes de volver a mostrarlo. */
  reshowAfterDays: number;
  /** Paginas donde puede aparecer. */
  pages: PageName[];
}

export const rafflePopupConfig: RafflePopupConfig = {
  enabled: true,
  id: 'rifa-2026-09',
  eyebrow: 'Rifa Inner Spirit',
  title: 'Gánate una sesión de Sound Healing + Yoga',
  description:
    'Participa dejando tus datos y quedas inscrito automáticamente. Anunciamos a la persona ganadora por Instagram y WhatsApp.',
  prizeLabel: '1 clase de Yoga + 1 sesión de Sound Healing',
  deadlineLabel: 'Cierra el 30 de septiembre de 2026',
  bullets: [
    'Participación gratuita, un registro por persona',
    'Ganador(a) anunciado en @innerspirit_studio',
    'Premio no transferible, aplica en sede Bogotá',
  ],
  termsUrl: '/privacidad',
  ctaLabel: 'Quiero participar',
  successTitle: '¡Ya estás participando!',
  successMessage: 'Guarda este chat: te escribiremos por WhatsApp si resultas ganador(a).',
  delayMs: 4000,
  reshowAfterDays: 7,
  pages: ['home'],
};
