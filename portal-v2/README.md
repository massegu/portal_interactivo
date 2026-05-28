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
