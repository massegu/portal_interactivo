export const spatialMemoryTasks = [
  {
    title: "Memoria espacial: objetos en casa",
    level: "medio",
    type: "spatial_grid",
    prompt: "Memoriza dónde está cada objeto. Después oculta la cuadrícula y escribe la ubicación de cada uno.",
    grid: [
      ["🔑", "⬜", "📱"],
      ["⬜", "👛", "⬜"],
      ["💊", "⬜", "📘"]
    ],
    expected: ["llaves arriba izquierda", "móvil arriba derecha", "cartera centro", "medicación abajo izquierda", "libro abajo derecha"]
  },
  {
    title: "Memoria espacial: ruta en edificio",
    level: "alto",
    type: "spatial_grid",
    prompt: "Memoriza la distribución. Después indica dónde está cada lugar importante.",
    grid: [
      ["Recepción", "⬜", "Consulta"],
      ["Ascensor", "Sala", "⬜"],
      ["Baño", "⬜", "Salida"]
    ],
    expected: ["recepción arriba izquierda", "consulta arriba derecha", "ascensor centro izquierda", "sala centro", "baño abajo izquierda", "salida abajo derecha"]
  },
  {
    title: "Memoria espacial: compra colocada",
    level: "medio",
    type: "spatial_grid",
    prompt: "Memoriza dónde se ha colocado cada producto.",
    grid: [
      ["🍎", "🥛", "⬜"],
      ["🍞", "⬜", "🥚"],
      ["⬜", "🧴", "🐟"]
    ],
    expected: ["manzanas arriba izquierda", "leche arriba centro", "pan centro izquierda", "huevos centro derecha", "detergente abajo centro", "pescado abajo derecha"]
  }
];
