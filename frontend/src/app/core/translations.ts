export type Lang = 'es' | 'en';

export interface ServiceItem {
  icon: 'hardening' | 'pentesting' | 'compliance' | 'development' | 'ot-migration' | 'data-governance';
  title: string;
  description: string;
  bullets: string[];
}

export interface TeamMember {
  role: string;
  initials: string;
}

export interface SiteContent {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    visualHint: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  attackChain: {
    eyebrow: string;
    categories: string[];
    securityStackLabel: [string, string];
    objectiveLabel: string;
    objectiveItems: string[];
    phases: { tag: string; title: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    team: TeamMember[];
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
    };
    directLabel: string;
    email: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: string[] }[];
    rights: string;
    credit: string;
  };
}

const es: SiteContent = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    about: 'Nosotros',
    contact: 'Contacto',
    cta: 'Solicitar diagnóstico',
  },
  hero: {
    eyebrow: 'Ciberseguridad ofensiva & defensiva',
    title: 'Blindamos tu infraestructura antes de que alguien más encuentre el fallo.',
    highlight: 'antes de que alguien más',
    subtitle:
      'Exxacorp es un equipo de especialistas en hardening, pentesting y cumplimiento que reduce tu superficie de ataque real — no solo la que aparece en un reporte.',
    ctaPrimary: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver servicios',
    visualHint: 'Adorables… hasta que hay que resolver un problema. Pasa el cursor sobre el pulpo.',
    stats: [
      { value: '6', label: 'especialistas fundadores' },
      { value: '6', label: 'líneas de servicio' },
      { value: '100%', label: 'enfoque ofensivo + defensivo' },
    ],
  },
  services: {
    eyebrow: 'Qué hacemos',
    title: 'Seguridad de punta a punta',
    subtitle:
      'Combinamos mirada de atacante y de defensor para que cada recomendación sea accionable, priorizada y con impacto real en tu riesgo.',
    items: [
      {
        icon: 'hardening',
        title: 'Hardening de sistemas',
        description:
          'Endurecemos servidores, redes, contenedores y entornos cloud aplicando benchmarks como CIS y buenas prácticas de configuración segura, reduciendo la superficie de ataque desde la base.',
        bullets: ['Servidores Linux / Windows', 'Cloud (AWS, Azure, GCP)', 'Contenedores y Kubernetes', 'Redes y firewalls'],
      },
      {
        icon: 'pentesting',
        title: 'Pentesting & vulnerabilidades',
        description:
          'Simulamos ataques reales contra tus sistemas, aplicaciones y redes para encontrar vulnerabilidades explotables antes que un atacante, con reportes técnicos y ejecutivos accionables.',
        bullets: ['Pentesting web y mobile', 'Redes internas y externas', 'Ingeniería social controlada', 'Retesting incluido'],
      },
      {
        icon: 'compliance',
        title: 'Auditorías & cumplimiento',
        description:
          'Evaluamos tu postura de seguridad frente a estándares como ISO 27001 y PCI-DSS, identificando brechas y acompañando el plan de remediación hasta el cierre.',
        bullets: ['Gap analysis', 'ISO 27001 / PCI-DSS', 'Políticas y procedimientos', 'Acompañamiento a certificación'],
      },
      {
        icon: 'development',
        title: 'Desarrollo y automatización',
        description:
          'Diseñamos y automatizamos herramientas, scripts e integraciones de seguridad a medida, para que tu equipo escale sin depender de procesos manuales.',
        bullets: ['Automatización de tareas de seguridad', 'Integraciones y herramientas a medida', 'Seguridad en CI/CD', 'Scripts de detección y respuesta'],
      },
      {
        icon: 'ot-migration',
        title: 'Migración OT',
        description:
          'Acompañamos la migración y protección de entornos de tecnología operacional (OT/ICS), asegurando la transición sin exponer procesos industriales críticos.',
        bullets: ['Evaluación de redes OT/ICS', 'Segmentación IT/OT', 'Migración segura de sistemas legacy', 'Continuidad operacional'],
      },
      {
        icon: 'data-governance',
        title: 'Gobierno de datos',
        description:
          'Establecemos una única fuente de verdad para tus datos, con políticas claras de propiedad, calidad y control de acceso que sostienen decisiones confiables.',
        bullets: ['Catálogo y linaje de datos', 'Políticas de acceso y calidad', 'Fuente única de verdad', 'Cumplimiento de datos sensibles'],
      },
    ],
  },
  attackChain: {
    eyebrow: 'Cómo pensamos',
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
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Un equipo, dos mentalidades: atacar y defender.',
    paragraphs: [
      'Somos seis profesionales de ciberseguridad que decidimos unir experiencia ofensiva y defensiva en un mismo lugar.',
      'Empezamos Exxacorp porque creemos que la seguridad real no se logra con checklists genéricos, sino entendiendo cómo piensa un atacante para construir defensas que realmente resistan.',
    ],
    team: [
      { role: 'Founder & CEO', initials: 'EX' },
      { role: 'CTO', initials: 'EX' },
      { role: 'Head of Offensive Security', initials: 'EX' },
      { role: 'Head of Compliance', initials: 'EX' },
      { role: 'Lead Security Engineer', initials: 'EX' },
      { role: 'Head of Growth', initials: 'EX' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu seguridad',
    subtitle: 'Contanos sobre tu infraestructura y te respondemos con un diagnóstico inicial sin costo.',
    form: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      service: 'Servicio de interés',
      serviceOptions: [
        'Hardening de sistemas',
        'Pentesting & vulnerabilidades',
        'Auditorías & cumplimiento',
        'Desarrollo y automatización',
        'Migración OT',
        'Gobierno de datos',
        'Otro',
      ],
      message: 'Contanos brevemente tu necesidad',
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      success: 'Gracias, recibimos tu mensaje. Te contactamos a la brevedad.',
      error: 'No pudimos enviar el mensaje. Probá de nuevo o escribinos directamente.',
    },
    directLabel: 'O escribinos directo a',
    email: 'contacto@exxacorp.io',
  },
  footer: {
    tagline: 'Ciberseguridad ofensiva y defensiva para empresas que no quieren enterarse tarde.',
    columns: [
      {
        title: 'Servicios',
        links: [
          'Hardening de sistemas',
          'Pentesting & vulnerabilidades',
          'Auditorías & cumplimiento',
          'Desarrollo y automatización',
          'Migración OT',
          'Gobierno de datos',
        ],
      },
      { title: 'Empresa', links: ['Nosotros', 'Contacto'] },
    ],
    rights: 'Todos los derechos reservados.',
    credit: 'Diseñado y desarrollado por',
  },
};

const en: SiteContent = {
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    cta: 'Request assessment',
  },
  hero: {
    eyebrow: 'Offensive & defensive cybersecurity',
    title: 'We harden your infrastructure before someone else finds the gap.',
    highlight: 'before someone else',
    subtitle:
      'Exxacorp is a team of hardening, pentesting and compliance specialists who shrink your real attack surface — not just the one that shows up in a report.',
    ctaPrimary: 'Request assessment',
    ctaSecondary: 'See services',
    visualHint: "Adorable… until there's a problem to solve. Hover over the octopus.",
    stats: [
      { value: '6', label: 'founding specialists' },
      { value: '6', label: 'service lines' },
      { value: '100%', label: 'offensive + defensive mindset' },
    ],
  },
  services: {
    eyebrow: 'What we do',
    title: 'End-to-end security',
    subtitle:
      'We combine an attacker and a defender mindset so every recommendation is actionable, prioritized, and moves the needle on your actual risk.',
    items: [
      {
        icon: 'hardening',
        title: 'Systems hardening',
        description:
          'We harden servers, networks, containers and cloud environments applying CIS benchmarks and secure configuration best practices, shrinking the attack surface from the ground up.',
        bullets: ['Linux / Windows servers', 'Cloud (AWS, Azure, GCP)', 'Containers & Kubernetes', 'Networks & firewalls'],
      },
      {
        icon: 'pentesting',
        title: 'Pentesting & vulnerability assessment',
        description:
          'We simulate real attacks against your systems, applications and networks to find exploitable vulnerabilities before an attacker does, with actionable technical and executive reports.',
        bullets: ['Web & mobile pentesting', 'Internal & external networks', 'Controlled social engineering', 'Retesting included'],
      },
      {
        icon: 'compliance',
        title: 'Audits & compliance',
        description:
          'We assess your security posture against standards like ISO 27001 and PCI-DSS, identifying gaps and supporting the remediation roadmap through to closure.',
        bullets: ['Gap analysis', 'ISO 27001 / PCI-DSS', 'Policies & procedures', 'Certification support'],
      },
      {
        icon: 'development',
        title: 'Development & automation',
        description:
          'We design and automate custom security tools, scripts and integrations, so your team scales without depending on manual processes.',
        bullets: ['Security task automation', 'Custom integrations & tooling', 'CI/CD security', 'Detection & response scripts'],
      },
      {
        icon: 'ot-migration',
        title: 'OT migration',
        description:
          'We support the migration and protection of operational technology (OT/ICS) environments, ensuring the transition without exposing critical industrial processes.',
        bullets: ['OT/ICS network assessment', 'IT/OT segmentation', 'Secure legacy system migration', 'Operational continuity'],
      },
      {
        icon: 'data-governance',
        title: 'Data governance',
        description:
          'We establish a single source of truth for your data, with clear ownership, quality and access-control policies that support reliable decisions.',
        bullets: ['Data catalog & lineage', 'Access & quality policies', 'Single source of truth', 'Sensitive data compliance'],
      },
    ],
  },
  attackChain: {
    eyebrow: 'How we think',
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
  about: {
    eyebrow: 'Who we are',
    title: 'One team, two mindsets: attack and defend.',
    paragraphs: [
      'We are six cybersecurity professionals who decided to bring offensive and defensive expertise together under one roof.',
      'We started Exxacorp because real security is not built with generic checklists — it comes from understanding how an attacker thinks, so defenses can actually hold.',
    ],
    team: [
      { role: 'Founder & CEO', initials: 'EX' },
      { role: 'CTO', initials: 'EX' },
      { role: 'Head of Offensive Security', initials: 'EX' },
      { role: 'Head of Compliance', initials: 'EX' },
      { role: 'Lead Security Engineer', initials: 'EX' },
      { role: 'Head of Growth', initials: 'EX' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your security",
    subtitle: 'Tell us about your infrastructure and we will get back to you with an initial, no-cost assessment.',
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      service: 'Service of interest',
      serviceOptions: [
        'Systems hardening',
        'Pentesting & vulnerability assessment',
        'Audits & compliance',
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
    },
    directLabel: 'Or email us directly at',
    email: 'contacto@exxacorp.io',
  },
  footer: {
    tagline: 'Offensive and defensive cybersecurity for companies that refuse to find out the hard way.',
    columns: [
      {
        title: 'Services',
        links: [
          'Systems hardening',
          'Pentesting & vulnerability assessment',
          'Audits & compliance',
          'Development & automation',
          'OT migration',
          'Data governance',
        ],
      },
      { title: 'Company', links: ['About', 'Contact'] },
    ],
    rights: 'All rights reserved.',
    credit: 'Designed and built by',
  },
};

export const translations: Record<Lang, SiteContent> = { es, en };
