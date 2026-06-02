export const routeMemoryTasks = [
  {
    title: "Ruta de recados básica",
    level: "basico",
    type: "ruta",
    route: [
      { place: "Panadería", task: "comprar una barra de pan integral" },
      { place: "Farmacia", task: "recoger gasas y suero" },
      { place: "Quiosco", task: "comprar el periódico" }
    ],
    prompt: "Memoriza los sitios y qué debes hacer en cada uno. Después oculta la ruta y escríbela en orden."
  },
  {
    title: "Mañana organizada",
    level: "basico",
    type: "ruta",
    route: [
      { place: "Centro de salud", task: "pedir cita para revisión" },
      { place: "Supermercado", task: "comprar leche, fruta y arroz" },
      { place: "Casa", task: "guardar la compra en la nevera" }
    ],
    prompt: "Recuerda el orden de lugares y la tarea asociada a cada uno."
  },
  {
    title: "Ruta con documentación",
    level: "medio",
    type: "ruta",
    route: [
      { place: "Papelería", task: "hacer fotocopia del DNI" },
      { place: "Banco", task: "entregar el justificante" },
      { place: "Oficina municipal", task: "presentar el formulario firmado" },
      { place: "Casa", task: "archivar el resguardo en la carpeta azul" }
    ],
    prompt: "Memoriza la ruta completa. Presta atención a documentos, colores y lugares."
  },
  {
    title: "Recados antes de comer",
    level: "medio",
    type: "ruta",
    route: [
      { place: "Frutería", task: "comprar manzanas y tomates" },
      { place: "Carnicería", task: "recoger el pedido reservado" },
      { place: "Farmacia", task: "preguntar por la receta" },
      { place: "Portal de Ana", task: "dejarle las llaves en el buzón" }
    ],
    prompt: "Recuerda dónde vas y qué haces en cada sitio. Después escríbelo sin mirar."
  },
  {
    title: "Ruta con cambio de prioridad",
    level: "alto",
    type: "ruta",
    route: [
      { place: "Correos", task: "enviar un paquete certificado antes de las 12" },
      { place: "Banco", task: "sacar efectivo para pagar al técnico" },
      { place: "Ferretería", task: "comprar pilas y cinta aislante" },
      { place: "Casa", task: "dejar el recibo encima de la mesa" },
      { place: "Centro cultural", task: "recoger entradas reservadas" }
    ],
    prompt: "Memoriza la secuencia, las tareas y el dato importante de prioridad horaria."
  },
  {
    title: "Ruta con instrucciones dobles",
    level: "alto",
    type: "ruta",
    route: [
      { place: "Biblioteca", task: "devolver dos libros y renovar el carné" },
      { place: "Supermercado", task: "comprar yogures, pan y detergente" },
      { place: "Tintorería", task: "recoger la chaqueta gris" },
      { place: "Casa de Luis", task: "entregar la carpeta verde" },
      { place: "Casa", task: "anotar en la agenda que todo está hecho" }
    ],
    prompt: "Recuerda lugares, tareas y detalles concretos como colores, cantidades u objetos."
  }
];

export const memoryTasks = [
  { title: "Lista breve de compra", level: "basico", type: "lista", items: ["leche", "pan", "manzanas", "arroz"], prompt: "Mira la lista, ocúltala y escribe todos los elementos que recuerdes." },
  { title: "Recado telefónico", level: "medio", type: "lista", items: ["llamar a Ana", "martes", "17:30", "carpeta azul", "confirmar cita"], prompt: "Memoriza el recado y escríbelo con el mayor detalle posible." },
  { title: "Secuencia de ordenador", level: "medio", type: "lista", items: ["abrir correo", "descargar archivo", "renombrarlo", "subirlo a carpeta", "avisar por mensaje"], prompt: "Recuerda la secuencia en orden." },
  { title: "Preparar una bolsa", level: "basico", type: "lista", items: ["agua", "llaves", "móvil", "cartera", "mascarilla"], prompt: "Memoriza qué hay que meter en la bolsa." },
  { title: "Mensaje con varias condiciones", level: "alto", type: "lista", items: ["si llueve coger paraguas", "comprar pan integral", "llamar antes de las seis", "llevar recibo", "pasar por farmacia"], prompt: "Recuerda las instrucciones y escríbelas." },
  ...routeMemoryTasks
];
