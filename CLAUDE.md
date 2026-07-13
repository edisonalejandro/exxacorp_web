# Exxacorp

Startup de ciberseguridad (hardening, pentesting, auditorías/cumplimiento) fundada por 6 socios. Este repo por ahora solo contiene el **sitio web de promoción de servicios** (frontend). `backend/` e `infra/` están scaffoldeados para más adelante (Spring Boot + PostgreSQL + Docker) pero no están en uso todavía.

## Frontend (`frontend/`)

Landing page en **Angular 22** (standalone components, signals, `OnPush`) + **Tailwind CSS v4**.

### Identidad de marca
- Logo: hexágono outline + pulpo bicolor (violeta oscuro / lavanda), recreado en SVG en [`src/app/shared/logo/logo.component.ts`](frontend/src/app/shared/logo/logo.component.ts) — no hay asset real todavía, es un placeholder editable a la espera del archivo final de Eduardo.
- Paleta y tipografías definidas como design tokens de Tailwind en [`src/styles.css`](frontend/src/styles.css) (`@theme`): tonos `ink-*` (casi negro, headers/hero/footer/contacto), `violet-*` (acento de marca), `mist-*` (fondos claros de contenido). Tipografía: Sora (headings) + Inter (texto), cargadas vía Google Fonts en `index.html`.
- Estilo: "corporativo confiable" — hero/contacto/footer en fondo oscuro (donde mejor luce el logo), secciones de contenido (servicios/nosotros) en fondo claro.

### Estructura
```
src/app/
  core/
    i18n.service.ts       # servicio de idioma (signals), persiste en localStorage, autodetecta navigator.language
    translations.ts       # contenido ES/EN tipado (SiteContent): nav, hero, services, about, contact, footer
    config.ts             # FORMSPREE_ENDPOINT (placeholder a reemplazar)
  shared/logo/             # LogoComponent (SVG del isotipo + wordmark)
  layout/
    header/                # nav sticky, toggle ES/EN, menú mobile
    footer/                # logo, tagline, columnas de links, redes (placeholders)
  sections/
    hero/                  # #inicio
    services/               # #servicios — Hardening / Pentesting & vulnerabilidades / Auditorías & cumplimiento
    about/                  # #nosotros — texto + grid de 6 fundadores (placeholders "EX" + rol)
    contact/                # #contacto — formulario reactivo (Angular Forms) → POST a Formspree
  app.ts / app.html         # composición de header + secciones + footer (single page, nav por anchors)
```

### Idioma (ES/EN)
Todo el copy vive en `translations.ts` como objeto tipado por idioma (no hay claves sueltas tipo `t('a.b.c')`). El toggle está en el header; el idioma persiste en `localStorage` (`exxacorp-lang`) y por defecto se autodetecta según el navegador.

### Formulario de contacto
Sin backend propio todavía: el submit hace `POST` a Formspree (`core/config.ts`).

**Pendiente**: reemplazar `FORMSPREE_ENDPOINT` por el ID real de un form creado en [formspree.io](https://formspree.io) (gratis, sin backend).

### Pendientes conocidos
- `FORMSPREE_ENDPOINT` en `core/config.ts` es un placeholder.
- El equipo en "Nosotros" (`translations.ts` → `about.team`) usa placeholders genéricos (iniciales "EX" + rol, sin nombres ni fotos reales).
- El logo es una recreación propia en SVG; falta reemplazar por el asset final si Eduardo provee un archivo (SVG/PNG) distinto.
- Email de contacto (`contact.email` en `translations.ts`) es `contacto@exxacorp.io`, placeholder.

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
- Secciones: Home, Servicios, Nosotros/Equipo, Contacto (todo en una sola página, navegación por anchors).
- Contacto: formulario funcional vía servicio externo (Formspree) en vez de mock o mailto, para no depender del backend propio todavía.
