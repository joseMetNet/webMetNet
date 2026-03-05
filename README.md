# MetNet Website

Este proyecto es el repositorio principal para el sitio web de **MetNet**, desarrollado con **Astro**, **React**, y **Tailwind CSS**.

## 🚀 Tecnologías Principales

- [Astro](https://astro.build/) (v5) - Framework principal estático.
- [React](https://react.dev/) (v18) - Librería para componentes de UI interactivos.
- [Tailwind CSS](https://tailwindcss.com/) (v3.4) - Framework de utilidades CSS estilo utilitario.
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático y mejor experiencia de desarrollo.

## 📋 Requisitos Previos

Para poder probar, levantar y contribuir en este proyecto, necesitas instaladas las siguientes herramientas:

- **Node.js** v18 o superior.
- **npm** (u otro gestor como pnpm o yarn).
- **Git** para el control de versiones.

## 🛠️ Comandos Disponibles

Todos los comandos se deben ejecutar desde la raíz del proyecto.

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321`. Incluye Hot Module Replacement (HMR). |
| `npm run build` | Construye el proyecto para producción y lo deposita en la carpeta `dist/`. Ejecuta una verificación de TypeScript previa. |
| `npm run preview` | Sirve la carpeta `dist/` localmente para probar cómo se comportará la app en entorno de producción. |

## 📁 Estructura del Proyecto

El código fuente principal del proyecto se encuentra en la carpeta `src/`. La estructura general es:

```text
/
├── public/           # Archivos estáticos servidos directamente en la raíz (/favicon.ico, imágenes)
├── src/
│   ├── layouts/      # Layouts base (plantillas UI compartidas para envolver las páginas)
│   ├── pages/        # Páquinas de Astro basadas en rutas (ej. index.astro -> /)
│   ├── sections/     # Componentes modulares que conforman cada bloque/sección grande de la landing
│   ├── styles/       # Archivos globales de estilos CSS y directivas de Tailwind
│   └── env.d.ts      # Definiciones de tipos globales y ambiente de Astro
├── package.json      # Dependencias y scripts
├── tailwind.config.mjs # Configuración de Tailwind (temas, colores globales, fuentes)
└── tsconfig.json     # Configuración del compilador TypeScript
```

## 👨‍💻 Reglas y Consideraciones para Desarrolladores

1. **Uso de Astro vs React:**
   - Prioriza siempre la creación de componentes en `.astro`. Astro es extremadamente rápido, ligero y renderiza HTML estático por defecto enviando Zero-JS al navegador.
   - Usa componentes `.tsx` de React **sólo** cuando necesites interactividad en el cliente que requiera estado (hooks como `useState`, clicks complejos, etc.).
   
2. **Estilos y Clases CSS:**
   - Utilizamos **Tailwind CSS** para todo el estilizado. 
   - Las variables globales (como paletas de marca o tipografías de MetNet) deben declararse y extenderse dentro de `tailwind.config.mjs`. 
   - Evita escribir propiedades CSS directamente a menos que sea una animación compleja o algo extremadamente específico que no sea soportado como utilidad.

3. **Arquitectura de UI:**
   - La landing page (por ejemplo `index.astro`) funciona como un esqueleto que simplemente invoca distintos componentes bajo la carpeta `src/sections/`.
   - Si creas una funcionalidad o bloque visual nuevo para la página principal, créalo siempre como un archivo separado dentro de `sections/` para mantener el código limpio e independiente.

## 🚢 Despliegue

La carpeta `dist/` generada con el comando `npm run build` es una compilación SSG (Static Site Generation). Contiene HTML/CSS/JS puro y puede ser alojada en plataformas estáticas como Vercel, Netlify, Cloudflare Pages o GitHub Pages de inmediato.
