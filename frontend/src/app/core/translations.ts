export type Lang = 'es' | 'en';

export interface ServiceItem {
  /** 'core' = tarjeta principal; 'extra' = franja compacta "También hacemos". */
  tier: 'core' | 'extra';
  icon: 'hardening' | 'pentesting' | 'compliance' | 'development' | 'ot-migration' | 'data-governance';
  title: string;
  description: string;
  bullets: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface LawItem {
  code: string;
  name: string;
  authority: string;
  appliesTo: string;
  obligations: string[];
  help: string[];
}

export interface SiteContent {
  nav: {
    home: string;
    services: string;
    regulation: string;
    methodology: string;
    about: string;
    contact: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Franja de compromisos verificables bajo el hero (sin cifras infladas). */
    proof: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    extraLabel: string;
    items: ServiceItem[];
  };
  attackChain: {
    eyebrow: string;
    title: string;
    categories: string[];
    securityStackLabel: [string, string];
    objectiveLabel: string;
    objectiveItems: string[];
    phases: { tag: string; title: string; description: string }[];
  };
  regulation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Texto del aviso antes y después de la entrada en vigencia de la Ley 21.719. */
    deadlineBefore: string;
    deadlineAfter: string;
    appliesToLabel: string;
    obligationsLabel: string;
    helpLabel: string;
    laws: LawItem[];
    frameworks: string;
    cta: string;
    disclaimer: string;
  };
  deliverables: {
    eyebrow: string;
    title: string;
    subtitle: string;
    processLabel: string;
    steps: { title: string; description: string }[];
    itemsLabel: string;
    items: { title: string; description: string }[];
    cta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    principles: { title: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      service: string;
      serviceOptions: string[];
      message: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      required: string;
      errorPrefix: string;
      nameError: string;
      emailError: string;
      messageError: string;
      privacyNotice: string;
      privacyLink: string;
    };
    directLabel: string;
    scheduleLabel: string;
    email: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: FooterLink[] }[];
    rights: string;
    privacy: string;
    credit: string;
  };
}

const es: SiteContent = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    regulation: 'Normativa',
    methodology: 'Metodología',
    about: 'Nosotros',
    contact: 'Contacto',
    cta: 'Solicitar diagnóstico',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    languageLabel: 'Idioma',
  },
  hero: {
    eyebrow: 'Hardening · Pentesting · Cumplimiento',
    title: 'De la ley al servidor.',
    subtitle:
      'Endurecemos y ponemos a prueba tu infraestructura, y te entregamos la evidencia técnica que exigen la Ley 21.663, la Ley 21.719 e ISO 27001. Controles reales, no solo documentos.',
    ctaPrimary: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver qué recibes',
    proof: [
      { value: 'Ley 21.663 · Ley 21.719 · ISO 27001', label: 'Hallazgos mapeados a cada control' },
      { value: 'Informe técnico + ejecutivo', label: 'Para tu equipo y para el directorio' },
      { value: 'Retest incluido', label: 'Verificamos que cada brecha quede cerrada' },
    ],
  },
  services: {
    eyebrow: 'Qué hacemos',
    title: 'Tres servicios, un mismo entregable: evidencia',
    subtitle:
      'Combinamos mirada de atacante y de defensor. Cada hallazgo llega priorizado, con su corrección y el control legal o ISO al que responde.',
    extraLabel: 'También hacemos',
    items: [
      {
        tier: 'core',
        icon: 'hardening',
        title: 'Hardening de sistemas',
        description:
          'Endurecemos servidores, redes, contenedores y entornos cloud aplicando benchmarks como CIS y buenas prácticas de configuración segura, reduciendo la superficie de ataque desde la base.',
        bullets: ['Servidores Linux / Windows', 'Cloud (AWS, Azure, GCP)', 'Contenedores y Kubernetes', 'Redes y firewalls'],
      },
      {
        tier: 'core',
        icon: 'pentesting',
        title: 'Pentesting & vulnerabilidades',
        description:
          'Simulamos ataques reales contra tus sistemas, aplicaciones y redes para encontrar vulnerabilidades explotables antes que un atacante, con reportes técnicos y ejecutivos accionables.',
        bullets: ['Pentesting web y mobile', 'Redes internas y externas', 'Ingeniería social controlada', 'Retesting incluido'],
      },
      {
        tier: 'core',
        icon: 'compliance',
        title: 'Auditorías & cumplimiento',
        description:
          'Evaluamos tu postura de seguridad tomando como referencia ISO 27001 y buenas prácticas como CIS Controls, identificamos brechas y acompañamos el plan de remediación hasta el cierre.',
        bullets: ['Gap analysis', 'Diagnóstico con referencia ISO 27001', 'Políticas y procedimientos', 'Preparación para auditorías'],
      },
      {
        tier: 'extra',
        icon: 'development',
        title: 'Desarrollo y automatización',
        description:
          'Diseñamos y automatizamos herramientas, scripts e integraciones de seguridad a medida, para que tu equipo escale sin depender de procesos manuales.',
        bullets: ['Automatización de tareas de seguridad', 'Integraciones y herramientas a medida', 'Seguridad en CI/CD', 'Scripts de detección y respuesta'],
      },
      {
        tier: 'extra',
        icon: 'ot-migration',
        title: 'Migración OT',
        description:
          'Acompañamos la migración y protección de entornos de tecnología operacional (OT/ICS), asegurando la transición sin exponer procesos industriales críticos.',
        bullets: ['Evaluación de redes OT/ICS', 'Segmentación IT/OT', 'Migración segura de sistemas legacy', 'Continuidad operacional'],
      },
      {
        tier: 'extra',
        icon: 'data-governance',
        title: 'Gobierno de datos',
        description:
          'Establecemos una única fuente de verdad para tus datos, con políticas claras de propiedad, calidad y control de acceso que sostienen decisiones confiables.',
        bullets: ['Catálogo y linaje de datos', 'Políticas de acceso y calidad', 'Fuente única de verdad', 'Cumplimiento de datos sensibles'],
      },
    ],
  },
  attackChain: {
    eyebrow: 'Metodología',
    title: 'Pensamos como un atacante para que no llegue uno real',
    categories: [
      'Red',
      'Superficie externa',
      'Nube',
      'Infraestructura interna',
      'Aplicaciones web',
      'Identidad',
      'Endpoints',
      'Datos y secretos',
      'Agentes de IA',
    ],
    securityStackLabel: ['STACK DE SEGURIDAD', 'CONTROLES DEFENSIVOS'],
    objectiveLabel: 'OBJETIVO',
    objectiveItems: ['Datos sensibles', 'Compromiso de dominio', 'Ransomware', 'Hipervisor', 'Servidores de backup', 'Compromiso de apps web'],
    phases: [
      {
        tag: 'FASE 01',
        title: 'Reconocimiento',
        description: 'Mapeamos la superficie de ataque real: qué está expuesto, cómo se conecta y dónde están los puntos ciegos, antes de tocar nada.',
      },
      {
        tag: 'FASE 02',
        title: 'Sondeo adaptativo',
        description: 'Probamos en paralelo, priorizamos por impacto y ajustamos la estrategia con cada respuesta del sistema.',
      },
      {
        tag: 'FASE 03',
        title: 'Golpe de precisión',
        description: 'Con las rutas validadas, ejecutamos con velocidad y propósito, y te mostramos exactamente cómo se llega al peor escenario.',
      },
    ],
  },
  regulation: {
    eyebrow: 'Normativa chilena',
    title: 'Cumplir la ley empieza en tus servidores',
    subtitle:
      'Las nuevas leyes de ciberseguridad y de datos personales exigen controles técnicos reales, no solo documentos. Te ayudamos a cumplirlas con hardening, pentesting y evidencia lista para auditar.',
    deadlineBefore: 'La Ley 21.719 de datos personales entra en vigencia el 1 de diciembre de 2026.',
    deadlineAfter: 'La Ley 21.719 de datos personales está vigente desde el 1 de diciembre de 2026.',
    appliesToLabel: 'Aplica a',
    obligationsLabel: 'Qué exige',
    helpLabel: 'Cómo te ayudamos',
    laws: [
      {
        code: 'Ley 21.663',
        name: 'Ley Marco de Ciberseguridad',
        authority: 'Fiscaliza la ANCI',
        appliesTo: 'Prestadores de servicios esenciales y operadores de importancia vital (OIV).',
        obligations: [
          'Reportar incidentes al CSIRT Nacional, con alerta temprana dentro de 3 horas',
          'Sistema de gestión de seguridad de la información y gestión continua de riesgos',
          'Planes de continuidad operacional y de ciberseguridad',
          'Multas de hasta 40.000 UTM para operadores de importancia vital',
        ],
        help: [
          'Diagnóstico de brechas frente a la ley',
          'Hardening y pentesting para cerrar los controles técnicos',
          'Procedimiento de detección y reporte de incidentes',
        ],
      },
      {
        code: 'Ley 21.719',
        name: 'Protección de datos personales',
        authority: 'Fiscaliza la Agencia de Protección de Datos Personales',
        appliesTo: 'Toda organización que trate datos personales en Chile: clientes, colaboradores o usuarios.',
        obligations: [
          'Medidas de seguridad técnicas y organizativas proporcionales al riesgo',
          'Notificar las brechas de seguridad a la Agencia y, si hay riesgo, a los afectados',
          'Evaluaciones de impacto para tratamientos de alto riesgo',
          'Multas de hasta 20.000 UTM',
        ],
        help: [
          'Mapeo de dónde viven tus datos personales',
          'Controles de acceso, cifrado y hardening de los sistemas que los guardan',
          'Plan de respuesta ante brechas',
        ],
      },
    ],
    frameworks: 'Trabajamos alineados con ISO 27001, NIST CSF y CIS Controls.',
    cta: 'Solicitar diagnóstico normativo',
    disclaimer: 'Resumen informativo. No reemplaza la asesoría legal.',
  },
  deliverables: {
    eyebrow: 'Qué recibes',
    title: 'Un proceso claro y entregables que sirven ante un auditor',
    subtitle: 'Sabes desde el inicio qué vamos a revisar, qué vas a recibir y cómo se demuestra que quedó resuelto.',
    processLabel: 'Cómo trabajamos',
    steps: [
      { title: 'Diagnóstico', description: 'Entendemos tu infraestructura, tus riesgos y qué normativa te aplica.' },
      { title: 'Propuesta', description: 'Definimos alcance, reglas de trabajo y entregables antes de empezar.' },
      { title: 'Ejecución', description: 'Hardening y pruebas de intrusión controladas sobre el alcance acordado.' },
      { title: 'Evidencia y retest', description: 'Entregamos los informes y verificamos que cada corrección funcione.' },
    ],
    itemsLabel: 'Entregables',
    items: [
      { title: 'Informe ejecutivo', description: 'El riesgo en lenguaje de negocio, con prioridades claras para la gerencia y el directorio.' },
      { title: 'Informe técnico', description: 'Cada hallazgo con evidencia, criticidad, impacto y los pasos para corregirlo.' },
      { title: 'Matriz de cumplimiento', description: 'Cada hallazgo y corrección mapeados a ISO 27001, la Ley 21.663 y la Ley 21.719.' },
      { title: 'Retest', description: 'Volvemos a probar lo corregido y dejamos constancia de que la brecha quedó cerrada.' },
    ],
    cta: 'Solicitar diagnóstico',
  },
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Un equipo, dos mentalidades: atacar y defender.',
    paragraphs: [
      'Somos seis profesionales de ciberseguridad que decidimos unir experiencia ofensiva y defensiva en un mismo lugar.',
      'Empezamos Exxacorp porque creemos que la seguridad real no se logra con checklists genéricos, sino entendiendo cómo piensa un atacante para construir defensas que realmente resistan.',
    ],
    principles: [
      { title: 'Mirada de atacante', description: 'Probamos tus sistemas como lo haría un adversario real, no contra una lista genérica.' },
      { title: 'Evidencia, no promesas', description: 'Todo lo que afirmamos en un informe se puede verificar y reproducir.' },
      { title: 'Confidencialidad', description: 'Trabajamos con reglas de enfrentamiento acordadas y tratamos tu información como propia.' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos qué necesitas proteger o cumplir',
    subtitle:
      'El diagnóstico inicial no tiene costo: una conversación para entender tu infraestructura y la normativa que te aplica. Después te enviamos una propuesta con alcance y entregables.',
    form: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      service: 'Servicio de interés',
      serviceOptions: [
        'Hardening de sistemas',
        'Pentesting & vulnerabilidades',
        'Auditorías & cumplimiento',
        'Diagnóstico normativo (Ley 21.663 / 21.719)',
        'Desarrollo y automatización',
        'Migración OT',
        'Gobierno de datos',
        'Otro',
      ],
      message: 'Cuéntanos brevemente tu necesidad',
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      success: 'Gracias, recibimos tu mensaje. Te contactamos a la brevedad.',
      error: 'No pudimos enviar el mensaje. Prueba de nuevo o escríbenos directamente.',
      required: 'obligatorio',
      errorPrefix: 'Error',
      nameError: 'Ingresa tu nombre.',
      emailError: 'Ingresa un email válido, por ejemplo nombre@empresa.com.',
      messageError: 'Cuéntanos brevemente qué necesitas.',
      privacyNotice: 'Usaremos tus datos solo para responder tu mensaje. Los recibe nuestro proveedor de formularios, Formspree. Más detalles en nuestra',
      privacyLink: 'política de privacidad',
    },
    directLabel: 'O escríbenos directo a',
    scheduleLabel: 'Agendar una reunión',
    email: 'contacto@exxacorp.com',
  },
  footer: {
    tagline: 'Hardening, pentesting y evidencia de cumplimiento para empresas en Chile.',
    columns: [
      {
        title: 'Servicios',
        links: [
          { label: 'Hardening de sistemas', href: '/#servicios' },
          { label: 'Pentesting & vulnerabilidades', href: '/#servicios' },
          { label: 'Auditorías & cumplimiento', href: '/#servicios' },
          { label: 'Ley 21.663 y Ley 21.719', href: '/#normativa' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Metodología', href: '/#metodologia' },
          { label: 'Qué recibes', href: '/#entregables' },
          { label: 'Nosotros', href: '/#nosotros' },
          { label: 'Contacto', href: '/#contacto' },
        ],
      },
    ],
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de privacidad',
    credit: 'Diseñado y desarrollado por',
  },
};

const en: SiteContent = {
  nav: {
    home: 'Home',
    services: 'Services',
    regulation: 'Regulation',
    methodology: 'Methodology',
    about: 'About',
    contact: 'Contact',
    cta: 'Request assessment',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    languageLabel: 'Language',
  },
  hero: {
    eyebrow: 'Hardening · Pentesting · Compliance',
    title: 'From the law to the server.',
    subtitle:
      "We harden and test your infrastructure, and hand you the technical evidence required by Chile's Cybersecurity Framework Law (21.663), its Personal Data Law (21.719) and ISO 27001. Real controls, not just paperwork.",
    ctaPrimary: 'Request assessment',
    ctaSecondary: 'See what you get',
    proof: [
      { value: 'Ley 21.663 · Ley 21.719 · ISO 27001', label: 'Findings mapped to each control' },
      { value: 'Technical + executive report', label: 'For your team and for the board' },
      { value: 'Retest included', label: 'We verify every gap is closed' },
    ],
  },
  services: {
    eyebrow: 'What we do',
    title: 'Three services, one deliverable: evidence',
    subtitle:
      'We combine an attacker and a defender mindset. Every finding comes prioritized, with its fix and the legal or ISO control it answers to.',
    extraLabel: 'We also do',
    items: [
      {
        tier: 'core',
        icon: 'hardening',
        title: 'Systems hardening',
        description:
          'We harden servers, networks, containers and cloud environments applying CIS benchmarks and secure configuration best practices, shrinking the attack surface from the ground up.',
        bullets: ['Linux / Windows servers', 'Cloud (AWS, Azure, GCP)', 'Containers & Kubernetes', 'Networks & firewalls'],
      },
      {
        tier: 'core',
        icon: 'pentesting',
        title: 'Pentesting & vulnerability assessment',
        description:
          'We simulate real attacks against your systems, applications and networks to find exploitable vulnerabilities before an attacker does, with actionable technical and executive reports.',
        bullets: ['Web & mobile pentesting', 'Internal & external networks', 'Controlled social engineering', 'Retesting included'],
      },
      {
        tier: 'core',
        icon: 'compliance',
        title: 'Audits & compliance',
        description:
          'We assess your security posture using ISO 27001 and best practices such as CIS Controls as a reference, identify gaps and support the remediation roadmap through to closure.',
        bullets: ['Gap analysis', 'ISO 27001-based assessment', 'Policies & procedures', 'Audit readiness'],
      },
      {
        tier: 'extra',
        icon: 'development',
        title: 'Development & automation',
        description:
          'We design and automate custom security tools, scripts and integrations, so your team scales without depending on manual processes.',
        bullets: ['Security task automation', 'Custom integrations & tooling', 'CI/CD security', 'Detection & response scripts'],
      },
      {
        tier: 'extra',
        icon: 'ot-migration',
        title: 'OT migration',
        description:
          'We support the migration and protection of operational technology (OT/ICS) environments, ensuring the transition without exposing critical industrial processes.',
        bullets: ['OT/ICS network assessment', 'IT/OT segmentation', 'Secure legacy system migration', 'Operational continuity'],
      },
      {
        tier: 'extra',
        icon: 'data-governance',
        title: 'Data governance',
        description:
          'We establish a single source of truth for your data, with clear ownership, quality and access-control policies that support reliable decisions.',
        bullets: ['Data catalog & lineage', 'Access & quality policies', 'Single source of truth', 'Sensitive data compliance'],
      },
    ],
  },
  attackChain: {
    eyebrow: 'Methodology',
    title: 'We think like an attacker so a real one never gets in',
    categories: ['Network', 'External Surface', 'Cloud', 'Internal Infrastructure', 'Web Apps', 'Identity', 'Endpoints', 'Data & Secrets', 'AI Agents'],
    securityStackLabel: ['SECURITY STACK', 'DEFENSIVE CONTROLS'],
    objectiveLabel: 'OBJECTIVE',
    objectiveItems: ['Sensitive data', 'Domain compromise', 'Ransomware', 'Hypervisor', 'Backup servers', 'Web app compromise'],
    phases: [
      {
        tag: 'PHASE 01',
        title: 'Reconnaissance',
        description: "We map the real attack surface: what's exposed, how it connects, and where the blind spots are, before touching anything.",
      },
      {
        tag: 'PHASE 02',
        title: 'Adaptive Scouting',
        description: 'We probe in parallel, prioritize by impact, and adjust strategy with every response from the system.',
      },
      {
        tag: 'PHASE 03',
        title: 'Precision Strike',
        description: 'With validated paths, we execute with speed and purpose, and show you exactly how the worst case happens.',
      },
    ],
  },
  regulation: {
    eyebrow: 'Chilean regulation',
    title: 'Compliance starts on your servers',
    subtitle:
      "Chile's new cybersecurity and personal data laws require real technical controls, not just paperwork. We help you meet them with hardening, pentesting and audit-ready evidence.",
    deadlineBefore: "Chile's personal data law (Ley 21.719) takes effect on December 1, 2026.",
    deadlineAfter: "Chile's personal data law (Ley 21.719) has been in effect since December 1, 2026.",
    appliesToLabel: 'Applies to',
    obligationsLabel: 'What it requires',
    helpLabel: 'How we help',
    laws: [
      {
        code: 'Ley 21.663',
        name: 'Cybersecurity Framework Law',
        authority: 'Enforced by ANCI',
        appliesTo: 'Essential service providers and operators of vital importance (OIV).',
        obligations: [
          'Report incidents to the national CSIRT, with an early warning within 3 hours',
          'Information security management system and continuous risk management',
          'Business continuity and cybersecurity plans',
          'Fines of up to 40,000 UTM for operators of vital importance',
        ],
        help: [
          'Gap assessment against the law',
          'Hardening and pentesting to close the technical controls',
          'Incident detection and reporting procedure',
        ],
      },
      {
        code: 'Ley 21.719',
        name: 'Personal data protection',
        authority: 'Enforced by the Personal Data Protection Agency',
        appliesTo: 'Any organization processing personal data in Chile: customers, employees or users.',
        obligations: [
          'Technical and organizational security measures proportional to the risk',
          'Notify security breaches to the Agency and, when there is risk, to those affected',
          'Impact assessments for high-risk processing',
          'Fines of up to 20,000 UTM',
        ],
        help: [
          'Mapping where your personal data lives',
          'Access controls, encryption and hardening of the systems that store it',
          'Breach response plan',
        ],
      },
    ],
    frameworks: 'Aligned with ISO 27001, NIST CSF and CIS Controls.',
    cta: 'Request a compliance assessment',
    disclaimer: 'Informational summary. Not a substitute for legal advice.',
  },
  deliverables: {
    eyebrow: 'What you get',
    title: 'A clear process and deliverables that hold up in an audit',
    subtitle: 'From day one you know what we will review, what you will receive and how we prove it was fixed.',
    processLabel: 'How we work',
    steps: [
      { title: 'Assessment', description: 'We learn your infrastructure, your risks and which regulations apply to you.' },
      { title: 'Proposal', description: 'We agree on scope, rules of engagement and deliverables before starting.' },
      { title: 'Execution', description: 'Hardening and controlled penetration testing within the agreed scope.' },
      { title: 'Evidence & retest', description: 'We deliver the reports and verify that every fix works.' },
    ],
    itemsLabel: 'Deliverables',
    items: [
      { title: 'Executive report', description: 'Risk in business terms, with clear priorities for management and the board.' },
      { title: 'Technical report', description: 'Every finding with evidence, severity, impact and the steps to fix it.' },
      { title: 'Compliance matrix', description: 'Every finding and fix mapped to ISO 27001, Ley 21.663 and Ley 21.719.' },
      { title: 'Retest', description: 'We test the fixes again and document that each gap is closed.' },
    ],
    cta: 'Request assessment',
  },
  about: {
    eyebrow: 'Who we are',
    title: 'One team, two mindsets: attack and defend.',
    paragraphs: [
      'We are six cybersecurity professionals who decided to bring offensive and defensive expertise together under one roof.',
      'We started Exxacorp because real security is not built with generic checklists — it comes from understanding how an attacker thinks, so defenses can actually hold.',
    ],
    principles: [
      { title: 'Attacker mindset', description: 'We test your systems the way a real adversary would, not against a generic checklist.' },
      { title: 'Evidence, not promises', description: 'Everything we state in a report can be verified and reproduced.' },
      { title: 'Confidentiality', description: 'We work under agreed rules of engagement and treat your information as our own.' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Tell us what you need to protect or comply with',
    subtitle:
      'The initial assessment is free: a conversation to understand your infrastructure and the regulations that apply to you. Then we send you a proposal with scope and deliverables.',
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      service: 'Service of interest',
      serviceOptions: [
        'Systems hardening',
        'Pentesting & vulnerability assessment',
        'Audits & compliance',
        'Compliance assessment (Ley 21.663 / 21.719)',
        'Development & automation',
        'OT migration',
        'Data governance',
        'Other',
      ],
      message: 'Briefly tell us what you need',
      submit: 'Send message',
      submitting: 'Sending...',
      success: "Thanks, we've got your message. We'll be in touch shortly.",
      error: "We couldn't send your message. Please try again or email us directly.",
      required: 'required',
      errorPrefix: 'Error',
      nameError: 'Enter your name.',
      emailError: 'Enter a valid email address, for example name@company.com.',
      messageError: 'Briefly tell us what you need.',
      privacyNotice: 'We will only use your data to answer your message. It is received by our form provider, Formspree. More details in our',
      privacyLink: 'privacy policy',
    },
    directLabel: 'Or email us directly at',
    scheduleLabel: 'Book a meeting',
    email: 'contacto@exxacorp.com',
  },
  footer: {
    tagline: 'Hardening, pentesting and compliance evidence for companies in Chile.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Systems hardening', href: '/#servicios' },
          { label: 'Pentesting & vulnerability assessment', href: '/#servicios' },
          { label: 'Audits & compliance', href: '/#servicios' },
          { label: 'Ley 21.663 & Ley 21.719', href: '/#normativa' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Methodology', href: '/#metodologia' },
          { label: 'What you get', href: '/#entregables' },
          { label: 'About', href: '/#nosotros' },
          { label: 'Contact', href: '/#contacto' },
        ],
      },
    ],
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
    credit: 'Designed and built by',
  },
};

export const translations: Record<Lang, SiteContent> = { es, en };
