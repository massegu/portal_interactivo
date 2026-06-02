import React,{useMemo,useState}from"react";import{motion}from"framer-motion";import{Activity,BarChart3,BookOpen,Brain,CheckCircle2,Download,Ear,Eye,EyeOff,FileText,History,Home,ListChecks,Lock,Printer,Search,Settings,Sparkles,Target,Trash2,UserRound,Volume2,Zap}from"lucide-react";import{ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,LineChart,Line,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar}from"recharts";
import{readingTexts}from"./data/reading.js";import{planningTasks}from"./data/planning.js";import{memoryTasks}from"./data/memory.js";import{attentionTasks}from"./data/attention.js";import{audioTasks}from"./data/audio.js";import{executiveTasks}from"./data/executive.js";import{readingScore,memoryScore,planningScore,attentionScore,audioScore,executiveScore}from"./utils/scoring.js";import{getDifficultyLevel,getAdaptiveRecommendation}from"./utils/adaptive.js";import{getModuleStats,getTimelineStats,buildCognitiveProfile,getWeakestModule}from"./utils/analytics.js";
function csvEscape(value){const text=String(value??"");return`"${text.replace(/"/g,'""')}"`}function safeReadSessions(){try{return JSON.parse(localStorage.getItem("portal_sessions_v4")||"[]")}catch{return[]}}function getSheetsUrl(){return localStorage.getItem("google_sheets_web_app_url_v4")||localStorage.getItem("google_sheets_web_app_url")||""}function setSheetsUrl(url){localStorage.setItem("google_sheets_web_app_url_v4",url.trim())}function getPatientCode(){return localStorage.getItem("portal_patient_code")||""}function savePatientCode(code){localStorage.setItem("portal_patient_code",code.trim())}
function buildRows({session,answers}){return Object.entries(answers).map(([field,answer])=>({session_id:session.id,fecha:session.date,paciente:session.patientCode,modulo:session.module,actividad_numero:session.activityNumber,actividad_titulo:session.activityTitle,campo:field,respuesta:answer,score:session.score,max_score:session.maxScore,feedback:session.feedback,response_time_ms:session.responseTime,level:session.level,metadata:session.metadata}))}
function saveSession({module,activityTitle,activityNumber,answers,result,metadata={},level=""}){const previous=safeReadSessions();const now=Date.now();const session={id:now,date:new Date().toLocaleString(),patientCode:getPatientCode(),module,activityTitle,activityNumber,answers,score:result?.score??"",maxScore:result?.maxScore??100,feedback:result?.feedback??"",responseTime:metadata.responseTime??"",level,metadata:{...metadata,details:result?.details??{}}};const rows=buildRows({session,answers});const stored={...session,rows};localStorage.setItem("portal_sessions_v4",JSON.stringify([stored,...previous]));return stored}
function buildCsvFromSessions(sessions){const headers=["session_id","fecha","paciente","modulo","actividad_numero","actividad_titulo","campo","respuesta","score","max_score","feedback","response_time_ms","level","metadata"];const rows=sessions.flatMap(s=>s.rows||[]);return[headers,...rows.map(row=>headers.map(h=>row[h]??""))].map(row=>row.map(csvEscape).join(",")).join("\n")}
async function sendSessionToGoogleSheets(session){const url=getSheetsUrl();if(!url)return{ok:false,message:"No hay URL de Google Sheets configurada."};try{await fetch(url,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({session,rows:session.rows||[]})});return{ok:true,message:"Sesión enviada a Google Sheets."}}catch(error){return{ok:false,message:`No se pudo enviar a Google Sheets: ${error.message}`}}}
function Button({children,className="",variant="plain",...props}){return <button className={`btn ${variant} ${className}`} {...props}>{children}</button>}function SectionTitle({icon:Icon,title,subtitle}){return <div className="section-title"><div className="section-heading"><motion.div className="icon-box" whileHover={{rotate:-8,scale:1.05}}><Icon size={25}/></motion.div><div><h2>{title}</h2><p className="section-subtitle">{subtitle}</p></div></div><motion.div className="doodle" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}}><motion.div className="doodle-fx" animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:3}}>🧠</motion.div><motion.div className="doodle-dot" animate={{x:[0,10,0]}} transition={{repeat:Infinity,duration:3.5}}/><motion.div className="doodle-line" animate={{rotate:[-6,6,-6]}} transition={{repeat:Infinity,duration:2.8}}>vida diaria</motion.div></motion.div></div>}
function InputArea({label,value,onChange}){return <label><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)} placeholder="Escribe aquí tu respuesta..."/></label>}function LoginGate({onLogin}){const[code,setCode]=useState(getPatientCode());const submit=()=>{if(!code.trim())return alert("Introduce un código de paciente.");savePatientCode(code);onLogin(code.trim())};return <div className="login-wrap"><motion.div className="card login-card" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}><div className="icon-box"><Lock size={26}/></div><h1>Acceso del paciente</h1><p>Introduce tu código de paciente para guardar las sesiones y comparar la evolución. Evita usar nombre completo.</p><label><span>Código de paciente</span><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Ej.: PACIENTE-001"/></label><div style={{marginTop:16}}><Button variant="primary" onClick={submit}><UserRound size={18}/> Entrar</Button></div></motion.div></div>}
function HomeSection(){const sessions=safeReadSessions();const weakest=getWeakestModule(sessions);return <section className="section"><SectionTitle icon={Home} title="Inicio" subtitle="Entrenamiento cognitivo práctico orientado a vida diaria."/><div className="grid-3"><div className="card"><h3>Áreas trabajadas</h3><p>Lectura, planificación, memoria, atención, comprensión oral y funciones ejecutivas.</p></div><div className="card"><h3>Paciente activo</h3><p><span className="score-badge">{getPatientCode()}</span></p></div><div className="card"><h3>Recomendación actual</h3><p>{weakest?`Reforzar ${weakest.module}: promedio ${weakest.porcentaje}%.`:"Completa varias actividades para generar recomendaciones."}</p></div></div><div className="card" style={{marginTop:18}}><h3>Uso recomendado</h3><div className="grid-3"><div className="mini-card"><b>Sesiones cortas</b><p>10-20 minutos, varias veces por semana.</p></div><div className="mini-card"><b>Registrar siempre</b><p>Guardar cada actividad para ver evolución.</p></div><div className="mini-card"><b>Ajustar dificultad</b><p>Usar el dashboard para elegir módulos prioritarios.</p></div></div></div></section>}
function GenericOpenModule({module,title,subtitle,icon:Icon,tasks,pillClass,scorer,renderBody}){const[selected,setSelected]=useState(0);const[answers,setAnswers]=useState({});const[status,setStatus]=useState("");const[lastResult,setLastResult]=useState(null);const[startTime,setStartTime]=useState(Date.now());const task=tasks[selected];const changeTask=index=>{setSelected(index);setAnswers({});setLastResult(null);setStartTime(Date.now())};const save=async()=>{const responseTime=Date.now()-startTime;const result=scorer(task,answers);setLastResult(result);const session=saveSession({module,activityTitle:task.title,activityNumber:selected+1,answers,result,level:task.level,metadata:{task,responseTime}});setStatus("Guardando y enviando...");const send=await sendSessionToGoogleSheets(session);setStatus(send.message)};return <section className="section"><SectionTitle icon={Icon} title={title} subtitle={subtitle}/><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>{tasks.map((item,index)=><Button key={item.title} variant={index===selected?"primary":"outline"} onClick={()=>changeTask(index)}>{index+1}</Button>)}</div><div className="card"><p><span className={`pill ${pillClass}`}>{task.level||"actividad"}</span></p><h3>{task.title}</h3>{renderBody({task,answers,setAnswers})}<div style={{marginTop:18,textAlign:"right"}}><Button variant="primary" onClick={save}><CheckCircle2 size={18}/> Guardar actividad</Button>{status&&<p>{status}</p>}</div>{lastResult&&<div className="result-box"><span className="score-badge">{lastResult.score}/{lastResult.maxScore}</span><p><b>Feedback:</b> {lastResult.feedback}</p></div>}</div></section>}
function ReadingModule(){return <GenericOpenModule module="lectura" title="Lectura comprensiva" subtitle="Comprensión, resumen, ideas principales, opinión y vocabulario." icon={BookOpen} tasks={readingTexts} pillClass="reading" scorer={(task,answers)=>readingScore({answers,keywords:task.keywords})} renderBody={({task,answers,setAnswers})=><><div className="text-card">{`${task.text}\n\n${task.extension}`}</div><div className="form-grid"><InputArea label="Título alternativo" value={answers.titulo||""} onChange={v=>setAnswers({...answers,titulo:v})}/><InputArea label="Resumen" value={answers.resumen||""} onChange={v=>setAnswers({...answers,resumen:v})}/><InputArea label="Ideas principales ordenadas" value={answers.ideas||""} onChange={v=>setAnswers({...answers,ideas:v})}/><InputArea label="Opinión personal" value={answers.opinion||""} onChange={v=>setAnswers({...answers,opinion:v})}/><InputArea label={`Categoría gramatical: ${task.words.join(", ")}`} value={answers.gramatica||""} onChange={v=>setAnswers({...answers,gramatica:v})}/></div></>}/>}
function PlanningModule(){return <GenericOpenModule module="planificacion" title="Planificación" subtitle="Organizar pasos, anticipar errores y priorizar tareas cotidianas." icon={ListChecks} tasks={planningTasks} pillClass="planning" scorer={(task,answers)=>{const order=task.steps.map((_,i)=>answers[`orden_${i}`]||0);return planningScore(order,task.steps.length,answers)}} renderBody={({task,answers,setAnswers})=><><p>{task.context}</p><p><b>Ordena los pasos escribiendo 1, 2, 3...</b></p><div className="sequence-grid">{task.steps.map((step,i)=><div className="sequence-item" key={step}><input value={answers[`orden_${i}`]||""} onChange={e=>setAnswers({...answers,[`orden_${i}`]:e.target.value})}/><span>{step}</span></div>)}</div><div className="form-grid">{task.questions.map((q,i)=><InputArea key={q} label={q} value={answers[`pregunta_${i+1}`]||""} onChange={v=>setAnswers({...answers,[`pregunta_${i+1}`]:v})}/>)}</div></>}/>}

function getMemoryExpectedItems(task) {
  if (task.type === "ruta" && Array.isArray(task.route)) {
    return task.route.flatMap((stop) => [stop.place, stop.task]);
  }
  return task.items || [];
}

function MemoryModule(){const[visible,setVisible]=useState(true);return <GenericOpenModule module="memoria" title="Memoria" subtitle="Recuerdo de listas, recados, instrucciones y secuencias." icon={Brain} tasks={memoryTasks} pillClass="memory" scorer={(task,answers)=>memoryScore(answers.recuerdo||"",task.items)} renderBody={({task,answers,setAnswers})=><><p>{task.prompt}</p><Button variant="outline" onClick={()=>setVisible(!visible)}>{visible?<EyeOff size={16}/>:<Eye size={16}/>} {visible?"Ocultar estímulos":"Ver estímulos"}</Button>{visible&&<div className="info pink" style={{marginTop:12}}><b>{task.items.join(" · ")}</b></div>}<div className="form-grid"><InputArea label={task.type === "ruta" ? "Escribe la ruta completa en orden, con lugar y tarea" : "Escribe lo que recuerdas"} value={answers.recuerdo||""} onChange={v=>setAnswers({...answers,recuerdo:v})}/></div></>}/>}
function AttentionModule(){return <GenericOpenModule module="atencion" title="Atención" subtitle="Búsqueda visual, precisión y control de impulsividad." icon={Search} tasks={attentionTasks} pillClass="attention" scorer={(task,answers)=>attentionScore(answers.respuesta,task.answer)} renderBody={({task,answers,setAnswers})=><><p>Cuenta cuántas veces aparece: <span className="pill attention">{task.target}</span></p><div className="text-card" style={{fontSize:"1.35rem",letterSpacing:".12em"}}>{task.sequence}</div><label style={{marginTop:16}}><span>Respuesta</span><input value={answers.respuesta||""} onChange={e=>setAnswers({...answers,respuesta:e.target.value})} placeholder="Número de apariciones"/></label></>}/>}
function AudioModule(){const speak=text=>{if(!("speechSynthesis"in window))return alert("Este navegador no permite lectura en voz alta.");window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="es-ES";u.rate=.92;window.speechSynthesis.speak(u)};return <GenericOpenModule module="audio" title="Audio y comprensión oral" subtitle="Escuchar instrucciones, retener información y responder preguntas." icon={Ear} tasks={audioTasks} pillClass="audio" scorer={(task,answers)=>audioScore(answers,task.keywords)} renderBody={({task,answers,setAnswers})=><><div className="audio-box"><Button variant="good" onClick={()=>speak(task.text)}><Volume2 size={18}/> Escuchar audio</Button><span style={{color:"#64748b"}}>12 actividades disponibles.</span></div><div className="form-grid">{task.questions.map((q,i)=><InputArea key={q} label={q} value={answers[`pregunta_${i+1}`]||""} onChange={v=>setAnswers({...answers,[`pregunta_${i+1}`]:v})}/>)}</div></>}/>}
function ExecutiveModule(){return <GenericOpenModule module="ejecutivas" title="Funciones ejecutivas" subtitle="Resolución de problemas, flexibilidad, toma de decisiones y autocontrol." icon={Activity} tasks={executiveTasks} pillClass="exec" scorer={(task,answers)=>executiveScore(answers,task.keywords)} renderBody={({task,answers,setAnswers})=><><div className="text-card">{task.context}</div><div className="form-grid">{task.questions.map((q,i)=><InputArea key={q} label={q} value={answers[`pregunta_${i+1}`]||""} onChange={v=>setAnswers({...answers,[`pregunta_${i+1}`]:v})}/>)}</div></>}/>}

function Dashboard() {
  const [sessions, setSessions] = useState(() => safeReadSessions());
  const [selectedPatient, setSelectedPatient] = useState(getPatientCode());
  const patients = Array.from(new Set(sessions.map((s) => s.patientCode).filter(Boolean)));
  const patientSessions = sessions.filter((s) => s.patientCode === selectedPatient);
  const moduleStats = getModuleStats(patientSessions);
  const timeline = getTimelineStats(patientSessions);
  const profile = buildCognitiveProfile(patientSessions);
  const weakest = getWeakestModule(patientSessions);
  const level = weakest ? getDifficultyLevel(patientSessions.filter(s => s.module === weakest.module).map(s => s.score)) : "basico";
  const recommendation = weakest ? getAdaptiveRecommendation(weakest.module, level) : "Completa algunas actividades para generar recomendaciones.";
  const radarData = Object.entries(profile).map(([module, value]) => ({ module, value }));
  const comparison = patients.map((patient) => {
    const ps = sessions.filter((s) => s.patientCode === patient);
    const stats = getModuleStats(ps);
    const avg = stats.length ? Math.round(stats.reduce((acc, item) => acc + item.porcentaje, 0) / stats.length) : 0;
    return { patient, sesiones: ps.length, promedio: avg };
  });

  return (
    <section className="section">
      <SectionTitle icon={BarChart3} title="Dashboard terapeuta" subtitle="Evolución individual, comparación entre pacientes e informe PDF." />
      <div className="no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        <Button variant="outline" onClick={() => setSessions(safeReadSessions())}>Actualizar</Button>
        <Button variant="primary" onClick={() => window.print()}><Printer size={16}/> Imprimir / guardar PDF</Button>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} style={{ maxWidth: 260 }}>
          {patients.length === 0 && <option>{getPatientCode()}</option>}
          {patients.map((patient) => <option key={patient} value={patient}>{patient}</option>)}
        </select>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Paciente seleccionado: {selectedPatient}</h3>
          <p><b>Sesiones registradas:</b> {patientSessions.length}</p>
          <div className="info indigo"><b>Recomendación adaptativa:</b><br/>{recommendation}</div>
        </div>
        <div className="card">
          <h3>Comparación entre pacientes</h3>
          {comparison.length ? <ResponsiveContainer width="100%" height={240}><BarChart data={comparison}><XAxis dataKey="patient"/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="promedio"/></BarChart></ResponsiveContainer> : <p>Aún no hay datos de pacientes.</p>}
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Promedio por módulo</h3>
          {moduleStats.length ? <ResponsiveContainer width="100%" height={240}><BarChart data={moduleStats}><XAxis dataKey="module"/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="porcentaje"/></BarChart></ResponsiveContainer> : <p>Aún no hay puntuaciones suficientes.</p>}
        </div>
        <div className="card">
          <h3>Evolución individual</h3>
          {timeline.length ? <ResponsiveContainer width="100%" height={240}><LineChart data={timeline}><XAxis dataKey="name"/><YAxis domain={[0,100]}/><Tooltip/><Line type="monotone" dataKey="porcentaje"/></LineChart></ResponsiveContainer> : <p>Aún no hay puntuaciones suficientes.</p>}
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Perfil cognitivo</h3>
          {radarData.some(d => d.value > 0) ? <ResponsiveContainer width="100%" height={260}><RadarChart data={radarData}><PolarGrid/><PolarAngleAxis dataKey="module"/><PolarRadiusAxis domain={[0,100]}/><Radar dataKey="value"/></RadarChart></ResponsiveContainer> : <p>Aún no hay perfil suficiente.</p>}
        </div>
        <div className="card">
          <h3>Informe automático</h3>
          <p><b>Paciente:</b> {selectedPatient}</p>
          <p><b>Área prioritaria:</b> {weakest ? `${weakest.module} (${weakest.porcentaje}%)` : "Sin datos suficientes"}</p>
          <p><b>Nivel recomendado:</b> {level}</p>
          <p><b>Recomendación:</b> {recommendation}</p>
          <p><b>Nota:</b> Este informe es orientativo y se basa en puntuaciones automáticas del portal.</p>
        </div>
      </div>
    </section>
  );
}


function AutomaticExercises() {
  const [level, setLevel] = useState("medio");
  const [generated, setGenerated] = useState(null);
  const [answers, setAnswers] = useState({});
  const [lastResult, setLastResult] = useState(null);
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(Date.now());

  const create = (type) => {
    const factories = {
      memoria: () => generateMemoryExercise(level),
      ruta: () => generateRouteExercise(level),
      atencion: () => generateAttentionExercise(level),
      planificacion: () => generatePlanningExercise(level),
      audio: () => generateAudioExercise(level)
    };
    setGenerated({ type, task: factories[type]() });
    setAnswers({});
    setLastResult(null);
    setStartTime(Date.now());
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return alert("Este navegador no permite lectura en voz alta.");
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  const scoreGenerated = () => {
    if (!generated) return null;
    const { type, task } = generated;
    if (type === "memoria") return memoryScore(answers.recuerdo || "", task.items);
    if (type === "ruta") return memoryScore(answers.recuerdo || "", task.route.flatMap((stop) => [stop.place, stop.task]));
    if (type === "atencion") return attentionScore(answers.respuesta, task.answer);
    if (type === "planificacion") {
      const order = task.steps.map((_, index) => answers[`orden_${index}`] || 0);
      return planningScore(order, task.steps.length, answers);
    }
    if (type === "audio") return audioScore(answers, task.keywords);
    return { score: 0, maxScore: 100, feedback: "No se pudo corregir." };
  };

  const save = async () => {
    if (!generated) return;
    const result = scoreGenerated();
    setLastResult(result);
    const responseTime = Date.now() - startTime;
    const session = saveSession({
      module: `auto_${generated.type}`,
      activityTitle: generated.task.title,
      activityNumber: 1,
      answers,
      result,
      level: generated.task.level,
      metadata: { generated: true, task: generated.task, responseTime }
    });
    setStatus("Guardando y enviando...");
    const send = await sendSessionToGoogleSheets(session);
    setStatus(send.message);
  };

  return (
    <section className="section">
      <SectionTitle icon={Shuffle} title="Ejercicios automáticos" subtitle="Generación gratuita por plantillas: memoria, rutas, atención, audio y planificación." />
      <div className="card">
        <div className="grid-3">
          <label><span>Nivel</span><select value={level} onChange={(e) => setLevel(e.target.value)}><option value="basico">Básico</option><option value="medio">Medio</option><option value="alto">Alto</option></select></label>
          <div><span style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Generar</span><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}><Button variant="outline" onClick={() => create("memoria")}>Memoria</Button><Button variant="outline" onClick={() => create("ruta")}>Ruta</Button><Button variant="outline" onClick={() => create("atencion")}>Atención</Button><Button variant="outline" onClick={() => create("audio")}>Audio</Button><Button variant="outline" onClick={() => create("planificacion")}>Planificación</Button></div></div>
          <div className="info green"><b>Gratis:</b> no usa API externa. Cada actividad se corrige y se guarda en Sheets.</div>
        </div>
      </div>

      {generated && <div className="card" style={{ marginTop: 18 }}>
        <p><span className="pill exec">{generated.type}</span> <span className="pill planning">{generated.task.level}</span></p>
        <h3>{generated.task.title}</h3>

        {generated.type === "memoria" && <>
          <p>{generated.task.prompt}</p>
          <div className="info pink"><b>{generated.task.items.join(" · ")}</b></div>
          <InputArea label="Escribe lo que recuerdas" value={answers.recuerdo || ""} onChange={(v) => setAnswers({ ...answers, recuerdo: v })}/>
        </>}

        {generated.type === "ruta" && <>
          <p>{generated.task.prompt}</p>
          <div className="info pink"><ol>{generated.task.route.map((stop, index) => <li key={index}><b>{stop.place}:</b> {stop.task}</li>)}</ol></div>
          <InputArea label="Escribe la ruta completa en orden" value={answers.recuerdo || ""} onChange={(v) => setAnswers({ ...answers, recuerdo: v })}/>
        </>}

        {generated.type === "atencion" && <>
          <p>Cuenta cuántas veces aparece: <span className="pill attention">{generated.task.target}</span></p>
          <div className="text-card" style={{ fontSize: "1.35rem", letterSpacing: ".12em" }}>{generated.task.sequence}</div>
          <label><span>Respuesta</span><input value={answers.respuesta || ""} onChange={(e) => setAnswers({ ...answers, respuesta: e.target.value })}/></label>
        </>}

        {generated.type === "audio" && <>
          <Button variant="good" onClick={() => speak(generated.task.text)}><Volume2 size={18}/> Escuchar audio</Button>
          <div className="form-grid">{generated.task.questions.map((q, i) => <InputArea key={q} label={q} value={answers[`pregunta_${i+1}`] || ""} onChange={(v) => setAnswers({ ...answers, [`pregunta_${i+1}`]: v })}/>)}</div>
        </>}

        {generated.type === "planificacion" && <>
          <p>{generated.task.context}</p>
          <p><b>Ordena los pasos escribiendo 1, 2, 3...</b></p>
          <div className="sequence-grid">{generated.task.steps.map((step, index) => <div className="sequence-item" key={step}><input value={answers[`orden_${index}`] || ""} onChange={(e) => setAnswers({ ...answers, [`orden_${index}`]: e.target.value })}/><span>{step}</span></div>)}</div>
          <div className="form-grid">{generated.task.questions.map((q, i) => <InputArea key={q} label={q} value={answers[`pregunta_${i+1}`] || ""} onChange={(v) => setAnswers({ ...answers, [`pregunta_${i+1}`]: v })}/>)}</div>
        </>}

        <div style={{ marginTop: 18, textAlign: "right" }}><Button variant="primary" onClick={save}>Guardar ejercicio automático</Button>{status && <p>{status}</p>}</div>
        {lastResult && <div className="result-box"><span className="score-badge">{lastResult.score}/{lastResult.maxScore}</span><p><b>Feedback:</b> {lastResult.feedback}</p></div>}
      </div>}
    </section>
  );
}


function HistorySection(){const[sessions,setSessions]=useState(()=>safeReadSessions());const[sheetsUrl,setSheetsUrlState]=useState(()=>getSheetsUrl());const[configStatus,setConfigStatus]=useState("");const downloadFile=(content,filename,type)=>{const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=filename;link.click();URL.revokeObjectURL(url)};const exportData=()=>downloadFile(JSON.stringify(sessions,null,2),"registro_respuestas_portal_v4.json","application/json");const exportCsv=()=>downloadFile(`${String.fromCharCode(0xfeff)}${buildCsvFromSessions(sessions)}`,"registro_respuestas_portal_v4.csv","text/csv;charset=utf-8");const clear=()=>{if(confirm("¿Borrar todo el historial local?")){localStorage.removeItem("portal_sessions_v4");setSessions([])}};const saveSheetsConfig=()=>{setSheetsUrl(sheetsUrl);setConfigStatus("URL de Google Sheets guardada.")};const resendAllToSheets=async()=>{setConfigStatus("Reenviando sesiones...");for(const session of sessions)await sendSessionToGoogleSheets(session);setConfigStatus("Sesiones reenviadas.")};const logout=()=>{localStorage.removeItem("portal_patient_code");window.location.reload()};return <section className="section"><SectionTitle icon={History} title="Registro y configuración" subtitle="Google Sheets, exportaciones y gestión local."/><div className="card"><h3>Paciente activo: {getPatientCode()}</h3><Button variant="outline" onClick={logout}>Cambiar paciente</Button></div><div className="card" style={{marginTop:16}}><h3>Conexión con Google Sheets</h3><p>La v4 guarda en la pestaña <b>Respuestas_v4</b>. Pega aquí la URL /exec del Apps Script actualizado.</p><div className="config-row"><input value={sheetsUrl} onChange={e=>setSheetsUrlState(e.target.value)} placeholder="https://script.google.com/macros/s/.../exec"/><Button variant="primary" onClick={saveSheetsConfig}>Guardar URL</Button><Button variant="outline" onClick={resendAllToSheets}>Reenviar historial</Button></div>{configStatus&&<p>{configStatus}</p>}</div><div style={{display:"flex",flexWrap:"wrap",gap:10,margin:"16px 0"}}><Button variant="outline" onClick={()=>setSessions(safeReadSessions())}>Actualizar</Button><Button variant="outline" onClick={exportData}><Download size={16}/> Exportar JSON</Button><Button variant="outline" onClick={exportCsv}><Download size={16}/> Exportar CSV</Button><Button variant="warning" onClick={()=>window.print()}><FileText size={16}/> Informe PDF</Button><Button variant="danger" onClick={clear}><Trash2 size={16}/> Borrar historial local</Button></div>{sessions.length===0?<div className="card">Aún no hay sesiones guardadas.</div>:sessions.map(s=><div className="card" key={s.id} style={{marginBottom:12}}><h3>{s.module}: {s.activityTitle}</h3><p><b>Fecha:</b> {s.date} · <b>Paciente:</b> {s.patientCode} · <b>Puntuación:</b> {s.score}/{s.maxScore} · <b>Feedback:</b> {s.feedback}</p><details><summary>Ver datos</summary><pre>{JSON.stringify(s,null,2)}</pre></details></div>)}</section>}
export default function App(){const[patientCode,setPatientCode]=useState(getPatientCode());const tabs=[["inicio","Inicio",Home],["lectura","Lectura",BookOpen],["planificacion","Planificación",ListChecks],["memoria","Memoria",Brain],["atencion","Atención",Search],["audio","Audio",Ear],["ejecutivas","Ejecutivas",Activity],["dashboard","Dashboard",BarChart3],["historial","Historial",Settings]];const[tab,setTab]=useState("inicio");const Current=useMemo(()=>({inicio:<HomeSection/>,lectura:<ReadingModule/>,planificacion:<PlanningModule/>,memoria:<MemoryModule/>,atencion:<AttentionModule/>,audio:<AudioModule/>,ejecutivas:<ExecutiveModule/>,dashboard:<Dashboard/>,historial:<HistorySection/>}[tab]),[tab]);if(!patientCode)return <LoginGate onLogin={setPatientCode}/>;return <div className="app"><div className="container"><header><motion.div className="hero" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}><div className="floating-symbol">🧠</div><div className="hero-badge"><Sparkles size={16}/> Portal cognitivo interactivo v4</div><h1>Entrenamiento cognitivo para la vida diaria</h1><div className="hero-tags"><span><Zap size={16}/> Gratis sin API externa</span><span><Target size={16}/> Adaptativo</span><span><UserRound size={16}/> {patientCode}</span></div></motion.div><nav className="nav">{tabs.map(([id,label,Icon])=><Button key={id} variant={tab===id?"primary":"plain"} onClick={()=>setTab(id)}><Icon size={17}/>{label}</Button>)}</nav></header><motion.main key={tab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.25}}>{Current}</motion.main><footer className="footer">Prototipo educativo/terapéutico. Usa códigos de paciente, no datos sensibles.</footer></div></div>}
