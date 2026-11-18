import { Lang } from './translations';

/**
 * Política de privacidad del sitio (Ley 19.628 modificada por la Ley 21.719,
 * art. 14 ter). Todo lo que afirma tiene que ser cierto en el sitio: si se
 * agrega analítica, otro campo al formulario u otro proveedor, se actualiza
 * aquí y se sube la versión ANTES de publicar el cambio.
 *
 * Fuente: docs/normativa/fase-0a/E-06a-politica-privacidad-sitio.md (repo Atalaya).
 */
export const PRIVACY_VERSION = '1';

const RESPONSABLE = {
  razonSocial: 'Ingeniería y Seguridad Informática Exxacorp SpA',
  rut: '78.482.025-4',
  domicilio: 'Av. Apoquindo 6410, oficina 1004, piso 10, Las Condes, Santiago, Chile',
  representanteLegal: 'Eduardo Patricio del Río Vera',
  correo: 'contacto@exxacorp.com',
};

export interface PrivacySection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Viñetas antes que los párrafos (por defecto, después). */
  bulletsFirst?: boolean;
  table?: { head: [string, string]; rows: [string, string][] };
}

export interface PrivacyContent {
  eyebrow: string;
  title: string;
  meta: string;
  intro: string;
  sections: PrivacySection[];
  back: string;
}

export const privacyContent: Record<Lang, PrivacyContent> = {
  es: {
    eyebrow: 'Privacidad',
    title: 'Política de privacidad',
    meta: `Versión ${PRIVACY_VERSION} · vigente desde el 1 de diciembre de 2026`,
    intro:
      'Esta política explica qué datos personales trata Exxacorp cuando visitas exxacorp.com o nos escribes, para qué, quién los recibe, cuánto tiempo los guardamos y cómo ejercer tus derechos.',
    sections: [
      {
        title: 'Quién es responsable',
        paragraphs: [
          `${RESPONSABLE.razonSocial}, RUT ${RESPONSABLE.rut}, con domicilio en ${RESPONSABLE.domicilio}. Representante legal: ${RESPONSABLE.representanteLegal}. Contacto: ${RESPONSABLE.correo}.`,
        ],
      },
      {
        title: 'Qué datos usamos',
        bulletsFirst: true,
        bullets: [
          'Si nos escribes por el formulario: tu nombre, tu email, tu empresa (si la indicas), el servicio que te interesa y tu mensaje.',
          `Si nos escribes a ${RESPONSABLE.correo}: tu email y lo que nos envíes.`,
          'Cuando visitas el sitio: tu dirección IP y tu navegador, que quedan en los registros técnicos de nuestro proveedor de alojamiento.',
        ],
        paragraphs: [
          'No usamos analítica, cookies de publicidad ni rastreadores. Las tipografías vienen del propio sitio. Solo guardamos en tu navegador el idioma que eliges.',
        ],
      },
      {
        title: 'Para qué y con qué base',
        paragraphs: [
          'Para responder tu consulta y, si nos lo pides, preparar una propuesta. La base es tu consentimiento al enviarnos el mensaje y las gestiones previas a un contrato que nos pides (Ley 19.628 modificada por la Ley 21.719, art. 13). Los registros técnicos sirven para mantener el sitio funcionando y protegerlo, por nuestro interés legítimo (art. 13 letra d).',
          'No elaboramos perfiles ni tomamos decisiones automatizadas sobre ti. No te pedimos datos sensibles; por favor no los incluyas en tu mensaje.',
        ],
      },
      {
        title: 'Quién los recibe',
        paragraphs: [
          'Dentro de Exxacorp, solo quien atiende el contacto. No vendemos ni cedemos tus datos. Dos proveedores los tratan por encargo nuestro:',
        ],
        bullets: [
          'Formspree recibe el formulario y nos lo reenvía por email.',
          'Vercel aloja el sitio.',
        ],
      },
      {
        title: 'Transferencia internacional',
        paragraphs: [
          'Los servidores de estos proveedores pueden estar fuera de Chile, por lo que usar el sitio o el formulario implica una transferencia internacional de datos. Se hace bajo los términos de tratamiento de datos que cada proveedor ofrece a sus clientes. Hoy no existe un listado de países con nivel adecuado de protección aprobado por la autoridad chilena.',
        ],
      },
      {
        title: 'Cuánto tiempo los guardamos',
        table: {
          head: ['Dato', 'Plazo'],
          rows: [
            [
              'Mensajes del formulario y emails de consultas que no avanzan',
              '12 meses desde el último contacto; luego se borran.',
            ],
            [
              'Si pasas a ser cliente',
              'Mientras dure la relación y los plazos legales que correspondan.',
            ],
            ['Registros técnicos de las visitas', 'Los que fija el proveedor de alojamiento.'],
          ],
        },
      },
      {
        title: 'Cómo los protegemos',
        paragraphs: [
          'Conexión cifrada (HTTPS) y acceso a los mensajes solo para quien atiende el contacto.',
        ],
      },
      {
        title: 'Tus derechos',
        paragraphs: [
          'Puedes pedir acceso a tus datos, que los corrijamos, que los borremos, oponerte a su uso, recibirlos en un formato de uso común o que suspendamos su uso mientras se resuelve una solicitud. Es gratis.',
          `Escríbenos a ${RESPONSABLE.correo} o por carta a ${RESPONSABLE.domicilio}. Respondemos dentro de 30 días corridos, y en 2 días hábiles si pides suspender el uso de tus datos.`,
          'Si no respondemos o no estás de acuerdo con la respuesta, puedes reclamar ante la Agencia de Protección de Datos Personales.',
        ],
      },
      {
        title: 'Cambios',
        paragraphs: [
          'Si cambiamos esta política, publicamos la nueva versión en esta página con su fecha.',
        ],
      },
    ],
    back: 'Volver al inicio',
  },
  en: {
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    meta: `Version ${PRIVACY_VERSION} · effective December 1, 2026`,
    intro:
      'This policy explains which personal data Exxacorp processes when you visit exxacorp.com or write to us, why, who receives it, how long we keep it and how to exercise your rights. It is governed by Chilean law; the Spanish version prevails.',
    sections: [
      {
        title: 'Who is responsible',
        paragraphs: [
          `${RESPONSABLE.razonSocial}, tax ID (RUT) ${RESPONSABLE.rut}, located at ${RESPONSABLE.domicilio}. Legal representative: ${RESPONSABLE.representanteLegal}. Contact: ${RESPONSABLE.correo}.`,
        ],
      },
      {
        title: 'What data we use',
        bulletsFirst: true,
        bullets: [
          'If you write to us through the form: your name, your email, your company (if you provide it), the service you are interested in and your message.',
          `If you email ${RESPONSABLE.correo}: your email address and whatever you send us.`,
          "When you visit the site: your IP address and browser, which appear in our hosting provider's technical logs.",
        ],
        paragraphs: [
          'We do not use analytics, advertising cookies or trackers. Fonts are served by the site itself. We only store the language you choose in your browser.',
        ],
      },
      {
        title: 'Why, and on what legal basis',
        paragraphs: [
          'To answer your inquiry and, if you ask us to, prepare a proposal. The legal basis is the consent you give by sending the message and the pre-contractual steps you request (Chilean Law 19.628 as amended by Law 21.719, art. 13). Technical logs keep the site running and protected, based on our legitimate interest (art. 13 d).',
          'We do not profile you or make automated decisions about you. We do not ask for sensitive data; please do not include it in your message.',
        ],
      },
      {
        title: 'Who receives it',
        paragraphs: [
          'Within Exxacorp, only whoever handles contact requests. We do not sell or share your data. Two providers process it on our behalf:',
        ],
        bullets: [
          'Formspree receives the form and forwards it to us by email.',
          'Vercel hosts the site.',
        ],
      },
      {
        title: 'International transfer',
        paragraphs: [
          "These providers' servers may be located outside Chile, so using the site or the form involves an international data transfer, made under the data processing terms each provider offers its customers. There is currently no list of countries with an adequate level of protection approved by the Chilean authority.",
        ],
      },
      {
        title: 'How long we keep it',
        table: {
          head: ['Data', 'Period'],
          rows: [
            [
              'Form messages and emails about inquiries that do not move forward',
              '12 months from the last contact; then deleted.',
            ],
            [
              'If you become a client',
              'For the duration of the relationship and any applicable legal periods.',
            ],
            ['Technical logs of visits', 'As set by the hosting provider.'],
          ],
        },
      },
      {
        title: 'How we protect it',
        paragraphs: [
          'Encrypted connection (HTTPS), and only whoever handles contact requests can access the messages.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'You can ask to access your data, correct it, delete it, object to its use, receive it in a commonly used format or have us suspend its use while a request is resolved. It is free.',
          `Write to ${RESPONSABLE.correo} or send a letter to ${RESPONSABLE.domicilio}. We reply within 30 calendar days, and within 2 business days if you ask us to suspend the use of your data.`,
          'If we do not reply or you disagree with our answer, you can file a complaint with the Chilean Personal Data Protection Agency (Agencia de Protección de Datos Personales).',
        ],
      },
      {
        title: 'Changes',
        paragraphs: [
          'If we change this policy, we will publish the new version on this page with its date.',
        ],
      },
    ],
    back: 'Back to home',
  },
};
