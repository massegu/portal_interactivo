
export const attentionTasks = [
  {
    title: "Ticket de supermercado",
    level: "medio",
    type: "visual_table",
    target: "productos con precio superior a 3 €",
    instructions: "Observa el ticket y cuenta cuántos productos cuestan más de 3 €.",
    rows: [
      ["Pan", "1,20 €"], ["Leche", "1,05 €"], ["Detergente", "4,80 €"], ["Manzanas", "2,40 €"],
      ["Aceite", "6,95 €"], ["Yogures", "2,10 €"], ["Papel cocina", "3,30 €"], ["Arroz", "1,75 €"]
    ],
    answer: 3
  },
  {
    title: "Agenda semanal",
    level: "medio",
    type: "visual_table",
    target: "citas antes de las 12:00",
    instructions: "Cuenta cuántas citas son antes de las 12:00.",
    rows: [
      ["Lunes", "Dentista", "10:30"], ["Martes", "Farmacia", "13:00"], ["Miércoles", "Banco", "09:45"],
      ["Jueves", "Fisio", "17:15"], ["Viernes", "Médico", "11:20"], ["Sábado", "Compra", "12:30"]
    ],
    answer: 3
  },
  {
    title: "Búsqueda de medicación",
    level: "alto",
    type: "visual_cards",
    target: "caja azul con dosis de noche",
    instructions: "Encuentra cuántas tarjetas cumplen las dos condiciones: caja azul y dosis de noche.",
    cards: [
      { color: "azul", text: "mañana" }, { color: "verde", text: "noche" }, { color: "azul", text: "noche" },
      { color: "roja", text: "noche" }, { color: "azul", text: "noche" }, { color: "azul", text: "desayuno" },
      { color: "amarilla", text: "noche" }, { color: "azul", text: "noche" }
    ],
    answer: 3
  },
  {
    title: "Lista de autobuses",
    level: "alto",
    type: "visual_table",
    target: "líneas que pasan por Centro y salen antes de las 18:00",
    instructions: "Cuenta las líneas que pasan por Centro y salen antes de las 18:00.",
    rows: [
      ["Línea 12", "Centro", "17:35"], ["Línea 8", "Hospital", "17:20"], ["Línea 3", "Centro", "18:05"],
      ["Línea 21", "Centro", "16:50"], ["Línea 5", "Estación", "17:10"], ["Línea 14", "Centro", "17:55"]
    ],
    answer: 3
  },
  {
    title: "Correo con adjuntos",
    level: "alto",
    type: "visual_cards",
    target: "mensajes urgentes con adjunto",
    instructions: "Cuenta cuántos correos son urgentes y además tienen adjunto.",
    cards: [
      { color: "roja", text: "urgente · adjunto" }, { color: "gris", text: "normal · adjunto" },
      { color: "roja", text: "urgente · sin adjunto" }, { color: "roja", text: "urgente · adjunto" },
      { color: "azul", text: "informativo · adjunto" }, { color: "roja", text: "urgente · adjunto" }
    ],
    answer: 3
  },
  {
    title: "Recibo de gastos",
    level: "medio",
    type: "visual_table",
    target: "gastos de transporte",
    instructions: "Cuenta cuántas filas corresponden a transporte.",
    rows: [
      ["Metro", "1,50 €"], ["Café", "1,30 €"], ["Autobús", "1,50 €"], ["Pan", "1,20 €"],
      ["Taxi", "8,90 €"], ["Farmacia", "4,10 €"], ["Tren", "2,80 €"]
    ],
    answer: 4
  }
];
