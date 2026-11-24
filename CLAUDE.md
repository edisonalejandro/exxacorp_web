# Exxacorp

Startup de ciberseguridad (hardening, pentesting, auditorías/cumplimiento) fundada por 6 socios. Este repo por ahora solo contiene el **sitio web de promoción de servicios** (frontend). `backend/` e `infra/` están scaffoldeados para más adelante (Spring Boot + PostgreSQL + Docker) pero no están en uso todavía.

## Frontend (`frontend/`)

Landing page en **Angular 22** (standalone components, signals, `OnPush`) + **Tailwind CSS v4**.

### Identidad de marca
- Logo: hexágono outline + pulpo, imagen en `public/logo/` (`octopus-serious-final.png` es el original; `octopus-mark.webp` es la versión liviana que usa [`logo.component.ts`](frontend/src/app/shared/logo/logo.component.ts) y `octopus-hero.webp` el póster del hero). El hero muestra el pulpo en 3D (`public/assets/3d/octopus-serious.glb`, comprimido con gltf-transform: meshopt + texturas WebP; el loader usa `MeshoptDecoder`). En táctil o con `prefers-reduced-motion` se muestra la imagen estática y no se descarga el 3D.
- Paleta y tipografías definidas como design tokens de Tailwind en [`src/styles.css`](frontend/src/styles.css) (`@theme`): tonos `ink-*` (casi negro, headers/hero/footer/contacto), `violet-*` (acento de marca), `mist-*` (fondos claros de contenido). Tipografía: Sora (headings) + Inter (texto), empaquetadas con `@fontsource` e importadas en `src/styles.css` (sin Google Fonts: ver la política de privacidad).
- Estilo: "corporativo confiable", sobrio y moderno. Secciones oscuras: hero, metodología, contacto y footer. Secciones claras: normativa, servicios, qué recibes y nosotros.
- Posicionamiento: **"De la ley al servidor"**: hardening + pentesting que generan evidencia mapeada a la Ley 21.663, la Ley 21.719 e ISO 27001.

### Estructura
```
src/app/
  core/
    i18n.service.ts       # servicio de idioma (signals), persiste en localStorage, autodetecta navigator.language
    translations.ts       # contenido ES/EN tipado (SiteContent): nav, hero, services, regulation, attackChain, deliverables, about, contact, footer
    config.ts             # FORMSPREE_ENDPOINT, SOCIAL_LINKS, SCHEDULING_URL, LEY_21719_IN_FORCE
    contact-intent.service.ts # un CTA puede preseleccionar el "Servicio de interés" del formulario
  shared/logo/             # LogoComponent (imagen del isotipo + wordmark)
  layout/
    header/                # nav sticky, toggle ES/EN, menú mobile
    footer/                # logo, tagline, columnas de links, redes (placeholders)
  sections/
    hero/                   # #inicio — "De la ley al servidor", franja de compromisos, pulpo 3D con 3 hotspots (uno por servicio principal)
    regulation/             # #normativa — Ley 21.663 (Marco de Ciberseguridad) y Ley 21.719 (datos personales): qué exigen y cómo ayudamos
    services/               # #servicios — 3 principales (tier 'core') + franja "También hacemos" (tier 'extra')
    attack-chain/           # #metodologia — animación con scroll (GSAP); bajo lg solo se muestra la fase activa
    deliverables/           # #entregables — proceso en 4 pasos + entregables (informes, matriz de cumplimiento, retest)
    about/                  # #nosotros — texto + principios (sin perfiles del equipo, ver pendientes)
    contact/                # #contacto — formulario reactivo (Angular Forms) → POST a Formspree
  app.ts / app.html         # composición de header + secciones + footer (single page, nav por anchors)
```

El aviso de la Ley 21.719 en `#normativa` cambia solo de "entra en vigencia" a "vigente desde" a partir de `LEY_21719_IN_FORCE` (`core/config.ts`): 15-10-2027, fijada por la Ley 21.855 (D.O. 23-11-2026), que postergó el 1-12-2026 original. Las obligaciones y multas de `#normativa` se revisaron contra los textos de BCN LeyChile en noviembre de 2026 (21.663 arts. 4, 8, 9 y 40; 21.719 arts. 14 quinquies, 14 sexies, 15 ter, 35 y 38).

SEO: meta tags, Open Graph (`public/og-image.png`), JSON-LD, `robots.txt` y `sitemap.xml` apuntan a `https://exxacorp.com` (dominio principal; también tenemos `exxacorp.cl`, que debe redirigir con 301 al `.com` desde la configuración de dominios de Vercel para no duplicar contenido). El sitio se renderiza solo en el navegador (sin prerender todavía).

### Idioma (ES/EN)
Todo el copy vive en `translations.ts` como objeto tipado por idioma (no hay claves sueltas tipo `t('a.b.c')`). El toggle está en el header; el idioma persiste en `localStorage` (`exxacorp-lang`) y por defecto se autodetecta según el navegador.

### Formulario de contacto
Sin backend propio todavía: el submit hace `POST` a Formspree (`FORMSPREE_ENDPOINT` en `core/config.ts`, ya con el ID real). Si se completa `SCHEDULING_URL`, aparece además un botón "Agendar una reunión".

### Pendientes conocidos
- Perfiles del equipo en "Nosotros" (nombre, foto, cargo, LinkedIn): pendientes. No volver a poner placeholders "EX".
- `SCHEDULING_URL` vacío (no hay link de agenda todavía).
- Prerender/SSG de Angular para que buscadores vean el contenido sin JS (pendiente; ojo con `isPrivacy`, el idioma y el aviso 21.719, que hoy se deciden al cargar en el navegador).
- Validar con un abogado las cifras legales de `#normativa` (alerta en 3 horas, multas de 40.000 / 20.000 UTM).
- Copy de cumplimiento: sin promesas de certificación ni PCI-DSS (decisión de nov. 2026); ISO 27001 solo como referencia.
- Redes sociales del footer: `SOCIAL_LINKS` en `core/config.ts` está vacío; cada ícono (LinkedIn/GitHub/X) aparece solo cuando su URL se completa.

### Comandos
```bash
cd frontend
npm install
npm start        # ng serve, http://localhost:4200
npm run build    # build de producción
npm test         # vitest
```

También se puede levantar todo (frontend + backend + Postgres) con Docker desde `infra/` (`docker-compose up --build`), aunque por ahora el foco es solo el frontend.

## Decisiones tomadas con el usuario
- Logo base: concepto "superior izquierdo" (hexágono outline, pulpo bicolor) de las 4 variantes compartidas.
- Estilo visual: corporativo confiable (no "hacker/dark" agresivo, no minimalista extremo).
- Stack de estilos: Tailwind CSS.
- Idioma: bilingüe ES/EN con selector.
- Servicios destacados: Hardening de sistemas, Pentesting/Vulnerabilidades, Auditorías y cumplimiento.
- Secciones (en este orden): Inicio, Normativa, Servicios, Metodología, Qué recibes, Nosotros, Contacto (una sola página, navegación por anchors).
- Mejoras de la revisión de noviembre 2026 (objetivo: que la web destaque siendo sobria y moderna): hero "De la ley al servidor", sin cifras de relleno, pulpo solo en versión seria, 3 servicios principales, assets livianos.
- Contacto: formulario funcional vía servicio externo (Formspree) en vez de mock o mailto, para no depender del backend propio todavía.
