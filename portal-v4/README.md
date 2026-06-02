# Portal Cognitivo v4

Cambios principales:
- Eliminadas las secciones de matemáticas.
- Sustituidas por ejercicios cognitivos orientados a vida diaria.
- Motor heurístico gratuito sin OpenAI API.
- 12 ejercicios de audio.
- Dashboard avanzado.
- Perfil cognitivo, recomendaciones adaptativas y exportación PDF mediante imprimir.
- Google Sheets en pestaña `Respuestas_v4`.

## Añadir ejercicios

Añadir contenido en:

```text
src/data/reading.js
src/data/planning.js
src/data/memory.js
src/data/attention.js
src/data/audio.js
src/data/executive.js
```

No hace falta tocar App.jsx para añadir ejercicios del mismo tipo.

## Google Sheets

Sustituye el Apps Script por `google-apps-script.js`.

Luego:
Implementar > Gestionar implementaciones > Editar > Nueva versión > Implementar.

## Vercel

Root Directory: `portal-v4`
Build Command: `npm run build`
Output Directory: `dist`

No necesita OPENAI_API_KEY.


## v4.1 — Memoria de rutas y recados

Añadidos ejercicios de memoria funcional en los que el paciente debe recordar:

- secuencia de sitios a visitar
- tarea concreta en cada sitio
- detalles funcionales: horarios, documentos, colores, prioridades
- orden correcto de la ruta

Archivo principal:

```text
src/data/memory.js
```

Para añadir más rutas, añade objetos a `routeMemoryTasks`.
