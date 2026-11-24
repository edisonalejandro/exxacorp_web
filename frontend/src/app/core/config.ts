// Free Formspree form (no backend needed): create one at https://formspree.io and paste its ID below.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myegnqjv';

/**
 * Social profiles shown in the footer. Leave a URL empty to hide that icon
 * (avoids dead "#" links until the real profiles exist).
 */
export const SOCIAL_LINKS = {
  linkedin: '',
  github: '',
  x: '',
} as const;

/**
 * Link de agenda (Calendly, Google Calendar, etc.). Mientras esté vacío,
 * el botón "Agendar una reunión" no se muestra en Contacto.
 */
export const SCHEDULING_URL = '';

/**
 * Entrada en vigencia de la Ley 21.719 (datos personales). Desde esta fecha el
 * aviso de #normativa dice "vigente desde" en vez de "entra en vigencia".
 * Ojo: en noviembre de 2026 hay un proyecto en trámite que la posterga al
 * 15-10-2027. Si se publica, actualizar esta fecha y los textos
 * `regulation.deadlineBefore/After` en translations.ts.
 */
export const LEY_21719_IN_FORCE = new Date('2026-12-01T00:00:00-03:00');
