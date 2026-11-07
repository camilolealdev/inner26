import type { PageName } from '../context/NavigationContext';

/**
 * Config unica de la rifa activa. Editar estos valores es todo lo que hace
 * falta para cambiar/relanzar la rifa desde codigo: no hay estado duplicado
 * en ningun otro archivo.
 *
 * Para lanzar una rifa nueva, cambia `id` (esto resetea el localStorage de
 * quienes ya la cerraron) junto con el contenido. Para apagarla sin borrar
 * nada, pon `enabled: false`.
 *
 * La participacion ocurre en Instagram (no hay formulario en el sitio): el
 * modal solo resume las instrucciones y lleva al perfil.
 */
export interface RaffleStep {
  /** Instruccion corta y accionable. */
  title: string;
  /** Aclaracion opcional que se muestra bajo la instruccion. */
  detail?: string;
}

export interface RafflePopupConfig {
  enabled: boolean;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  prizeLabel: string;
  prizeItems: string[];
  steps: RaffleStep[];
  /** Empujan a comentar mas: se muestra como nota destacada. */
  bonusNote?: string;
  deadlineLabel: string;
  locationNote?: string;
  instagramHandle: string;
  instagramUrl: string;
  ctaLabel: string;
  /** URL de la imagen del premio/rifa */
  imageUrl?: string;
  /** Milisegundos de espera tras cargar la pagina antes de mostrar el popup por tiempo. */
  delayMs: number;
  /** Porcentaje de scroll (0 a 100) para detonar el popup por roll over/scroll profundo si ocurre antes del tiempo. */
  scrollPercentTrigger?: number;
  /** Si el usuario lo cierra sin participar, dias antes de volver a mostrarlo. */
  reshowAfterDays: number;
  /** Paginas donde puede aparecer ('all' para todos los escenarios o lista de PageName). */
  pages: PageName[] | 'all';
}

export const rafflePopupConfig: RafflePopupConfig = {
  enabled: true,
  id: 'rifa-cuenco-2026',
  eyebrow: 'Sorteo Inner Spirit',
  title: 'Gánate un cuenco tibetano artesanal',
  description:
    'Si buscas reducir el estrés, mejorar tus meditaciones o darle un toque de paz y armonía a tus días, este sorteo es para ti.',
  prizeLabel: '¿Qué puedes ganar?',
  prizeItems: [
    'Un cuenco tibetano importado, elaborado artesanalmente',
    'Su maza / baqueta de madera para hacerlo sonar',
    'Cojín de soporte',
  ],
  steps: [
    {
      title: 'Sigue @innerspirit_studio y @innerdance_music',
      detail: 'Debes seguir ambas cuentas para validar tu premio.',
    },
    {
      title: 'Dale "Me gusta" a la publicación',
    },
    {
      title: 'Etiqueta a 2 amigos en los comentarios',
      detail: 'Que necesiten un momento de conexión y relajación.',
    },
    {
      title: 'Comparte la publicación en tus Stories',
    },
  ],
  bonusNote: 'Entre más comentes etiquetando a personas distintas, ¡más oportunidades tienes de ganar!',
  deadlineLabel: 'Miércoles 30 de noviembre',
  locationNote:
    'Sorteo válido para Colombia. La entrega será en nuestro espacio con una clase gratis para asistir.',
  instagramHandle: '@innerspirit_studio',
  instagramUrl: 'https://www.instagram.com/innerspirit_studio',
  ctaLabel: 'Participar en Instagram',
  imageUrl: '/images/raffle/cuenco-tibetano.jpg',
  delayMs: 4000,
  scrollPercentTrigger: 30,
  reshowAfterDays: 2,
  pages: 'all',
};
