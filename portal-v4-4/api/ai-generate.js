export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return response.status(200).json({
      ok: false,
      fallback: true,
      message: "IA no activada. Falta OPENAI_API_KEY en Vercel. Puedes seguir usando generadores gratuitos."
    });
  }

  try {
    const { type = "audio", level = "medio", patientProfile = "" } = request.body || {};
    const prompt = `
Genera un ejercicio cognitivo funcional en español para vida diaria.
Tipo: ${type}
Nivel: ${level}
Perfil orientativo, si existe: ${patientProfile}

Devuelve SOLO JSON válido.
Formatos:
audio: { "title": string, "level": string, "text": string, "questions": string[], "keywords": string[] }
ruta: { "title": string, "level": string, "type":"ruta", "route":[{"place":string,"task":string}], "prompt": string }
atencion: { "title": string, "level": string, "type":"visual_table", "target": string, "instructions": string, "rows": string[][], "answer": number }
planificacion: { "title": string, "level": string, "context": string, "steps": string[], "questions": string[] }
ejecutivas: { "title": string, "level": string, "context": string, "questions": string[], "keywords": string[] }

No hagas diagnóstico clínico. No pidas datos personales. Evita contenido médico sensible.
`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Diseñas ejercicios cognitivos funcionales para vida diaria. Eres claro, práctico y prudente." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!aiResponse.ok) {
      return response.status(200).json({ ok: false, fallback: true, message: "Error llamando a OpenAI. Revisa la API key o el saldo." });
    }

    const data = await aiResponse.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    return response.status(200).json({ ok: true, exercise: JSON.parse(content) });
  } catch (error) {
    return response.status(200).json({ ok: false, fallback: true, message: error.message });
  }
}
