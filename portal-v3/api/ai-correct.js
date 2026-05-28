export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return response.status(200).json({
      ok: false,
      fallback: true,
      feedback: "La corrección automática con IA aún no está activada. Falta configurar OPENAI_API_KEY en Vercel.",
      score: null,
      maxScore: 10,
      suggestions: ["Configura OPENAI_API_KEY en Vercel para activar la corrección automática."]
    });
  }

  try {
    const { module, activityTitle, prompt, answer, expected, rubric } = request.body || {};
    const systemPrompt = `Eres un asistente educativo/terapéutico. Corrige respuestas de forma prudente, clara y útil. No hagas diagnóstico clínico. Evalúa solo el desempeño en la actividad. Devuelve exclusivamente JSON válido con: {"ok":true,"score":number de 0 a 10,"maxScore":10,"feedback":"comentario breve","strengths":["..."],"improvements":["..."],"suggestions":["..."]}`;
    const userPrompt = `Módulo: ${module || ""}\nActividad: ${activityTitle || ""}\nEnunciado: ${prompt || ""}\nRespuesta del paciente: ${answer || ""}\nReferencia: ${JSON.stringify(expected || {})}\nRúbrica: ${rubric || "Valora precisión, comprensión, organización y claridad."}`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return response.status(200).json({ ok: false, fallback: true, feedback: "No se pudo completar la corrección con IA.", error: errorText, score: null, maxScore: 10, suggestions: ["Revisa la API key en Vercel."] });
    }

    const data = await aiResponse.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    return response.status(200).json(JSON.parse(content));
  } catch (error) {
    return response.status(200).json({ ok: false, fallback: true, feedback: "Error procesando la corrección automática.", error: error.message, score: null, maxScore: 10, suggestions: ["Inténtalo de nuevo."] });
  }
}
