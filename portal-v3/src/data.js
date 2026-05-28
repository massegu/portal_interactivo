
export const derivativeExercises = [
  { q: "Deriva f(x)=3x^2+5x-7", a: "f'(x)=6x+5", explanation: "La derivada de 3x^2 es 6x, la de 5x es 5 y la constante desaparece." },
  { q: "Deriva f(x)=x^5-4x^3+2x", a: "f'(x)=5x^4-12x^2+2", explanation: "Se deriva término a término aplicando la regla de la potencia." },
  { q: "Un coche tiene posición s(t)=t^2+3t. ¿Velocidad en t=4?", a: "v(4)=11", explanation: "La velocidad es la derivada: s'(t)=2t+3; s'(4)=11." },
  { q: "Altura h(t)=-5t^2+20t+1. ¿Cuándo alcanza el máximo?", a: "t=2", explanation: "En el máximo la derivada vale 0: h'(t)=-10t+20; t=2." }
];
while (derivativeExercises.length < 30) {
  const i = derivativeExercises.length + 1;
  derivativeExercises.push({ q: `Deriva f(x)=${i}x^2+${i-1}x+1`, a: `f'(x)=${2*i}x+${i-1}`, explanation: "Se deriva término a término. La constante se convierte en 0." });
}

export const functionExercises = [
  { q: "Calcula f(2) si f(x)=3x+4", a: "f(2)=10", explanation: "Sustituimos x por 2: 3·2+4=10." },
  { q: "Dominio de f(x)=1/(x-3)", a: "Todos los reales excepto x=3", explanation: "El denominador no puede valer 0." },
  { q: "Un taxi cobra 4 € fijos y 1,50 €/km. Calcula 8 km.", a: "P(x)=4+1,5x; P(8)=16 €", explanation: "Parte fija más parte variable: 4+1,5·8=16." },
  { q: "Un estudiante ahorra 25 € por semana y empieza con 40 €. Calcula 12 semanas.", a: "A(x)=40+25x; A(12)=340 €", explanation: "Ahorro inicial más ahorro semanal multiplicado por semanas." }
];
while (functionExercises.length < 30) {
  const i = functionExercises.length + 1;
  functionExercises.push({ q: `Calcula f(${i}) si f(x)=2x+${i}`, a: `f(${i})=${3*i}`, explanation: `Sustituimos x por ${i}: 2·${i}+${i}=${3*i}.` });
}

export const readingTexts = [
  { title: "La ciudad que decidió escuchar", type: "Artículo periodístico", text: `Durante años, el tráfico fue el sonido principal de la avenida Norte. Los vecinos se habían acostumbrado a hablar más alto en los balcones y a cerrar las ventanas incluso en primavera. El ayuntamiento decidió cortar la circulación de coches privados los domingos por la mañana. Al principio hubo quejas, pero el primer domingo las familias salieron a pasear, los niños aprendieron a montar en bicicleta sin miedo y dos cafeterías colocaron mesas en la acera. La medida abrió una conversación sobre el uso del espacio público.`, extension: `La experiencia obligó a revisar hábitos del barrio. Varias personas mayores explicaron que hacía tiempo que no cruzaban la avenida con tranquilidad. La discusión dejó una enseñanza clara: una ciudad no se transforma solo con grandes obras, sino también con pequeñas decisiones que modifican la forma de convivir.`, words: ["sencilla", "vecinos", "decidió", "público"] },
  { title: "No todo lo rápido es mejor", type: "Columna de opinión", text: `Vivimos rodeados de promesas de velocidad. El móvil carga más rápido, las series se resumen en vídeos de un minuto y las conversaciones parecen competir por quién responde antes. Se nos repite que ahorrar tiempo es siempre una victoria, pero pocas veces nos preguntamos qué hacemos con el tiempo que ganamos.`, extension: `La prisa se ha convertido en un signo de importancia. Sin embargo, prestar atención requiere tiempo. Escuchar de verdad, revisar un trabajo o pensar una respuesta antes de publicarla puede evitar errores y malentendidos.`, words: ["rápido", "conviene", "amistad", "verdadero"] }
];
while (readingTexts.length < 10) {
  const i = readingTexts.length + 1;
  readingTexts.push({ title: `Texto de lectura ${i}`, type: "Texto mixto", text: `Este texto plantea una situación cercana para practicar comprensión lectora. El alumno debe distinguir ideas principales y secundarias, explicar su opinión con argumentos e identificar palabras importantes.`, extension: `La lectura comprensiva ayuda a mejorar vocabulario, memoria de trabajo y organización de información.`, words: ["cercana", "alumno", "identificar", "real"] });
}

export const planningTasks = [
  { title: "Preparar la mochila", context: "Tienes clase a las 8:30. Debes llevar material, merienda y ropa de deporte.", steps: ["Mirar el horario", "Preparar libros", "Meter estuche", "Preparar ropa", "Añadir merienda", "Dejar la mochila lista"], questions: ["¿Qué harías primero?", "¿Qué prepararías la noche anterior?", "¿Qué error podrías cometer?"] },
  { title: "Organizar una compra", context: "Debes comprar pasta, tomate, fruta y pan. Tienes 30 minutos.", steps: ["Revisar casa", "Escribir lista", "Ordenar por zonas", "Comprar", "Comprobar ticket", "Guardar comida"], questions: ["¿Cómo evitarías olvidos?", "¿Qué harías si no hay un producto?", "¿Qué comprarías primero?"] },
  { title: "Planificar estudio", context: "Tienes examen de matemáticas y una redacción pendiente.", steps: ["Anotar tareas", "Calcular tiempo", "Empezar por lo difícil", "Descanso", "Revisar", "Preparar mochila"], questions: ["¿Qué priorizarías?", "¿Dónde pondrías descanso?", "¿Cómo comprobarías que acabaste?"] }
];

export const memoryTasks = [
  { title: "Lista de la compra", items: ["leche", "pan", "manzanas", "arroz", "yogur", "tomate"], prompt: "Mira la lista, ocúltala y escribe lo que recuerdes." },
  { title: "Recado telefónico", items: ["llamar a Ana", "martes", "17:30", "carpeta azul", "preguntar cita"], prompt: "Memoriza el recado y escríbelo con detalle." },
  { title: "Secuencia", items: ["abrir correo", "descargar archivo", "renombrarlo", "subirlo", "avisar"], prompt: "Recuerda la secuencia en orden." }
];

export const attentionTasks = [
  { title: "Buscar letras", target: "A", sequence: "A H A R P A M N A B Q A A T R A", answer: 7 },
  { title: "Buscar números", target: "3", sequence: "3 8 2 3 5 3 9 1 3 3 7 6 3 0", answer: 6 },
  { title: "Detectar palabra", target: "SOL", sequence: "SAL SOL SOL LOS SOL SIL SOL SEL", answer: 4 }
];

export const audioTasks = [
  { title: "Cita médica", text: "Mañana tienes una cita a las diez y media. Debes llevar la tarjeta sanitaria, una botella de agua y el informe azul. Después de la cita, llama a Marta.", questions: ["¿A qué hora es la cita?", "¿Qué tres cosas debe llevar?", "¿A quién debe llamar después?"] },
  { title: "Instrucciones de cocina", text: "Primero lava las verduras. Después corta el calabacín y la calabaza. Pon una sartén a fuego medio y cocina todo durante diez minutos. Al final añade sal.", questions: ["¿Qué hay que hacer primero?", "¿Cuánto tiempo se cocina?", "¿Qué se añade al final?"] }
];
