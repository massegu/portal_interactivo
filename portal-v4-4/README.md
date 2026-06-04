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


## v4.2 — Login, dashboard por paciente y generadores

Novedades:
- Login por código de paciente reforzado.
- Dashboard individual con selector de paciente.
- Comparación básica entre pacientes guardados localmente.
- Informe PDF imprimible desde el dashboard.
- Sección de ejercicios automáticos:
  - memoria
  - rutas de recados
  - atención
  - audio
  - planificación
- Generadores gratuitos por plantillas, sin OpenAI API.

Nota:
La comparación entre pacientes se basa en los datos guardados localmente en este navegador.
Google Sheets sigue siendo el registro general centralizado.


## v4.3

- Arregla ejercicios de memoria tipo ruta/recados.
- Mejora atención con ejercicios funcionales complejos: tickets, agenda, medicación, transporte, correos.
- Mejora dashboard con colores y explicación de ejes.
- Añade generación IA opcional en `/api/ai-generate`.
- Si no configuras `OPENAI_API_KEY`, la app sigue funcionando con generadores gratuitos.

## OpenAI API Key

Puedes reutilizar la misma API key en varios proyectos de Vercel, pero todo el consumo se acumula en la misma cuenta/proyecto de OpenAI. Recomendado: poner límites de gasto en OpenAI Platform.


## v4.4 — Versión consolidada

Incluye:
- Todo lo de v4.3.
- Atención visual funcional con estímulos autogenerados mediante iconos/elementos visuales.
- Memoria espacial.
- Sección de uso seguro.
- Generación IA opcional mediante OPENAI_API_KEY.
- Generadores gratuitos siguen funcionando sin coste.
- Dashboard con más explicación visual.

## OpenAI

La misma OPENAI_API_KEY puede usarse en varios proyectos de Vercel.
El consumo se acumula en la misma cuenta de OpenAI.
Pon límites de gasto en OpenAI Platform para evitar sorpresas.
