# Portal terapéutico interactivo v2

Novedades:
- Planificación de vida diaria
- Memoria
- Atención
- Audio con voz del navegador
- Login simple por código de paciente
- Nuevas columnas para Google Sheets

## Cómo actualizar

1. Descomprime este ZIP.
2. Sustituye los archivos de tu repositorio GitHub por estos.
3. Haz commit.
4. Vercel redeployará automáticamente.

## Google Sheets

Esta versión usa más columnas. Sustituye el código de Apps Script por `google-apps-script.js`.

Después:
Implementar > Gestionar implementaciones > Editar > Nueva versión > Implementar.

Encabezados recomendados:
session_id | fecha | paciente | modulo | actividad_numero | actividad_titulo | campo | respuesta | score | max_score | metadata

## v3: IA, dashboard y adaptación

Novedades:
- Función segura de Vercel: `api/ai-correct.js`
- Corrección automática con IA para lectura y planificación
- Dashboard terapeuta con gráficos
- Recomendación adaptativa según módulo más débil

## Activar IA en Vercel

1. En Vercel, entra en el proyecto v3.
2. Settings > Environment Variables.
3. Añade `OPENAI_API_KEY` con tu clave de OpenAI.
4. Redeploy.

Sin esa variable, la app funciona igualmente, pero la IA mostrará un aviso de que falta activarla.
