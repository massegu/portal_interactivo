import { groceryItems, places, tasksByPlace, audioSituations } from "../data/generatorPools.js";

function pickMany(array, count) {
  const copy = [...array].sort(() => Math.random() - 0.5);
  return copy.slice(0, count);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMemoryExercise(level = "medio") {
  const count = level === "basico" ? 4 : level === "alto" ? 7 : 5;
  const items = pickMany(groceryItems, count);
  return {
    title: `Memoria automática: lista de ${count} elementos`,
    level,
    type: "lista",
    items,
    prompt: "Memoriza la lista, ocúltala y escribe todos los elementos que recuerdes."
  };
}

export function generateRouteExercise(level = "medio") {
  const count = level === "basico" ? 3 : level === "alto" ? 5 : 4;
  const selectedPlaces = pickMany(places, count);
  const route = selectedPlaces.map((place) => {
    const tasks = tasksByPlace[place] || ["hacer un recado"];
    return { place, task: tasks[randomInt(0, tasks.length - 1)] };
  });
  return {
    title: `Ruta automática de ${count} recados`,
    level,
    type: "ruta",
    route,
    prompt: "Memoriza los lugares y la tarea concreta en cada sitio. Después escribe la ruta en orden."
  };
}

export function generateAttentionExercise(level = "medio") {
  const target = level === "alto" ? "B2" : level === "medio" ? "SOL" : "A";
  const distractors = level === "alto" ? ["B3", "82", "BZ", "62", "R2"] : level === "medio" ? ["SAL", "LOS", "S0L", "SEL", "SIL"] : ["H", "R", "P", "M", "N", "B", "Q", "T"];
  const length = level === "basico" ? 16 : level === "alto" ? 28 : 22;
  const targetCount = randomInt(level === "basico" ? 5 : 4, level === "alto" ? 9 : 7);
  const sequence = [];
  for (let i = 0; i < length; i++) sequence.push(distractors[randomInt(0, distractors.length - 1)]);
  for (let i = 0; i < targetCount; i++) sequence[randomInt(0, length - 1)] = target;
  return {
    title: "Atención automática",
    level,
    target,
    sequence: sequence.join(" "),
    answer: sequence.filter((x) => x === target).length
  };
}

export function generatePlanningExercise(level = "medio") {
  const templates = [
    {
      title: "Mañana con recados",
      context: "Tienes que hacer varios recados antes de comer y uno de ellos tiene horario limitado.",
      steps: ["Escribir lista de tareas", "Comprobar horarios", "Hacer primero la tarea con horario", "Completar el resto de recados", "Revisar si queda algo pendiente"]
    },
    {
      title: "Preparar una salida",
      context: "Debes salir de casa para una cita y necesitas llevar documentación.",
      steps: ["Mirar la hora", "Preparar documentos", "Coger llaves y móvil", "Comprobar ruta", "Salir con margen"]
    },
    {
      title: "Resolver imprevisto",
      context: "Un plan cambia a última hora y debes reorganizar lo que ibas a hacer.",
      steps: ["Mantener la calma", "Identificar qué cambió", "Elegir alternativa", "Avisar si hace falta", "Revisar el nuevo plan"]
    }
  ];
  const selected = templates[randomInt(0, templates.length - 1)];
  return {
    ...selected,
    level,
    questions: ["¿Qué harías primero?", "¿Qué puede esperar?", "¿Cómo comprobarías que el plan funciona?"]
  };
}

export function generateAudioExercise(level = "medio") {
  const situation = audioSituations[randomInt(0, audioSituations.length - 1)];
  const hour = `${randomInt(9, 18)}:${Math.random() > 0.5 ? "30" : "00"}`;
  const item1 = groceryItems[randomInt(0, groceryItems.length - 1)];
  const item2 = groceryItems[randomInt(0, groceryItems.length - 1)];
  const place = places[randomInt(0, places.length - 1)];
  const text = `Mensaje sobre ${situation}. Hoy a las ${hour} debes pasar por ${place}. Recuerda llevar el móvil, comprar ${item1} y ${item2}, y avisar por mensaje cuando termines.`;
  return {
    title: `Audio automático: ${situation}`,
    level,
    text,
    questions: ["¿A qué hora era la tarea?", "¿A qué lugar debe ir?", "¿Qué debe comprar o recordar?"],
    keywords: [hour.split(":")[0], place, "móvil", item1, item2, "mensaje"]
  };
}
