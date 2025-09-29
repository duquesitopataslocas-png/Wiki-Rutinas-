# Mini-Notion de Rutinas

Mini-Notion Git-first para rutinas personalizadas construida con Next.js (App Router), MDX y Contentlayer.

## Requisitos

- Node.js 18+
- npm 9+

## Inicio rápido

```bash
npm install
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver el sitio.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: ejecuta `contentlayer build` y luego `next build`.
- `npm run start`: inicia el servidor en modo producción.
- `npm run lint`: ejecuta ESLint sobre todo el proyecto.
- `npm run typecheck`: ejecuta TypeScript en modo estricto sin emitir archivos.
- `npm run format`: formatea el código con Prettier.
- `npm run content`: genera los tipos de Contentlayer.

## Estructura de contenido

Las rutinas viven en `content/rutinas`. Cada archivo es un documento MDX con front matter tipado por Contentlayer.

Ejemplo: `content/rutinas/semana-1.mdx`

```mdx
---
title: "Semana 1"
semanas: 8
dias: 3
objetivo: "Fuerza"
rpeObjetivo: "6–8"
deloadSemana: 5
---

# Semana 1

Bienvenido a la primera semana. RPE objetivo <RPEBadge valor={7} />.

<PlanTabla
  ejercicios={[
    { nombre: "Sentadilla trasera", series: 4, reps: 6, intensidad: "70%", tempo: "3-0-1", descanso: "120s" },
    { nombre: "Press banca", series: 4, reps: 5, intensidad: "75%", tempo: "2-0-1", descanso: "120s" },
    { nombre: "Remo barra", series: 3, reps: 8, intensidad: "@RPE7", tempo: "2-1-1", descanso: "90s" }
  ]}
/>
```

## Crear una nueva rutina

1. Duplica `content/rutinas/semana-1.mdx`.
2. Cambia el nombre del archivo para que coincida con el slug deseado, por ejemplo `semana-2.mdx`.
3. Edita el front matter (título, semanas, días, objetivo) y el contenido MDX.
4. Guarda y ejecuta `npm run dev` para ver la nueva página en `http://localhost:3000/rutinas/<slug>`.

## Componentes MDX disponibles

- `<RPEBadge valor={6} />`: muestra un badge de intensidad. Valores fuera del rango 6–10 mostrarán `N/A`.
- `<PlanTabla ejercicios={[{ nombre, series, reps, intensidad, tempo, descanso }]} />`: tabla editable en cliente para hacer seguimiento de ejercicios y marcar cuando se completan.

## Flujo Git-first

1. Crea una rama nueva y realiza tus cambios.
2. Ejecuta los scripts de calidad (`npm run lint`, `npm run typecheck`, `npm run build`).
3. Haz commit y push a GitHub.

## Deploy en Vercel

1. Conecta tu repositorio de GitHub a Vercel.
2. Configura el proyecto indicando `npm run build` como comando de build y `next start` como comando de producción (Vercel lo detecta automáticamente).
3. Cada push a la rama principal disparará un deploy.

## CI/CD

El workflow en `.github/workflows/ci.yml` ejecuta `npm ci`, `npm run typecheck`, `npm run lint` y `npm run build` en cada push o pull request.

## Nota PowerShell

Si usas PowerShell, ejecuta los comandos uno por uno (sin usar `\` para dividir líneas).
