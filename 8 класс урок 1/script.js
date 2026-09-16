const APP_W=1280,APP_H=720;
const viewport=document.getElementById('viewport');
const wrap=document.getElementById('scaled-wrap');
const app=document.getElementById('app');
const screenTitle=document.getElementById('screenTitle');
const instruction=document.getElementById('instruction');
const workspace=document.getElementById('workspace');
const progressText=document.getElementById('progressText');
const progressFill=document.getElementById('progressFill');
const backBtn=document.getElementById('backBtn');
const hintBtn=document.getElementById('hintBtn');
const checkBtn=document.getElementById('checkBtn');
const nextBtn=document.getElementById('nextBtn');
const hintOverlay=document.getElementById('hintOverlay');
const hintText=document.getElementById('hintText');
const closeHint=document.getElementById('closeHint');
const moreHint=document.getElementById('moreHint');
const timerDisplay=document.getElementById('timerDisplay');
const timerBtn=document.getElementById('timerBtn');
const STORAGE_KEY='rus8-speech-lesson-01-v1';

const stageMinutes=[7,6,12,12,8,8,7];
let current=0;
let checked=false;
let hintLevel=1;
let timer=null;
let timerRunning=false;
let secondsLeft=stageMinutes[0]*60;

const state={
  diag:{d1:'',d2:'',d3:'',d4:'',score:null},
  types:{t1:'',t2:'',t3:'',score:null},
  story:{start:'',event:'',middle:'',end:'',ok:false},
  reason:{thesis:'',explain:'',example:'',conclusion:'',ok:false},
  dialog:{q1:'',q2:'',q3:'',score:null},
  editor:{issues:[],rewrite:'',score:null,ok:false},
  final:{f1:'',f2:'',f3:'',f4:'',hard:'',score:null}
};

const screens=[
  {
    title:'Быстрая диагностика',
    instruction:'Сначала отвечай без подсказки. Так станет видно, что действительно сохранилось после пропусков.',
    hint1:'Не вспоминай целое правило. Ищи опознавательный признак: зависимое слово, часть речи, суффикс или значение.',
    hint2:'Алгоритм:\n1) Н/НН — определи часть речи и признаки причастия.\n2) НЕ — посмотри, есть ли зависимые слова или противопоставление.\n3) Союзы — проверь, можно ли разделить сочетание.\n4) -то, -либо, -нибудь с местоимениями пишутся через дефис.',
    render:renderDiag, check:checkDiag
  },
  {
    title:'Определи тип речи',
    instruction:'Смотри на задачу текста: рассказать о событиях, описать признаки или доказать мысль.',
    hint1:'События можно расположить по времени. Описание отвечает на вопрос «какой?». Рассуждение объясняет «почему?».',
    hint2:'Повествование: что произошло? → действия сменяют друг друга.\nОписание: какой предмет/место? → перечисляются признаки.\nРассуждение: какая мысль? → тезис, объяснение, доказательство, вывод.',
    render:renderTypes, check:checkTypes
  },
  {
    title:'Монолог-повествование',
    instruction:'Составь связный рассказ: ситуация → неожиданное событие → действия → итог.',
    hint1:'Используй слова-связки: сначала, вдруг, затем, после этого, наконец.',
    hint2:'Алгоритм:\n1) Где и когда? Кто участвует?\n2) Что произошло неожиданно?\n3) Что сделали герои?\n4) Чем всё закончилось?\nНе перескакивай через важное событие.',
    render:renderStory, check:checkStory
  },
  {
    title:'Монолог-рассуждение',
    instruction:'Ответь на вопрос: почему важно уметь доводить начатое дело до конца?',
    hint1:'Начни с собственной мысли, а затем объясни причину и приведи конкретный пример.',
    hint2:'Алгоритм: тезис → объяснение → пример → вывод.\nПроверка: пример действительно подтверждает тезис? Вывод подводит итог, а не просто повторяет первую фразу?',
    render:renderReason, check:checkReason
  },
  {
    title:'Диалог: как узнать пропущенное',
    instruction:'Выбери реплики, которые помогают вежливо и точно восстановить пропущенный школьный материал.',
    hint1:'Хороший диалог не заканчивается на «ок». В нём есть уточняющий вопрос и понятное завершение.',
    hint2:'Структура полезного диалога:\n1) вежливо обозначить ситуацию;\n2) задать конкретный вопрос;\n3) уточнить непонятное;\n4) подтвердить, что информация понята.',
    render:renderDialog, check:checkDialog
  },
  {
    title:'Редакторская мастерская',
    instruction:'Найди проблемы слабого ответа и перепиши его так, чтобы мысль стала доказательной.',
    hint1:'Проверь четыре вещи: пунктуация, повторы, пример, вывод.',
    hint2:'Для улучшения ответа используй каркас: «Я считаю, что… Это важно, потому что… Например,… Таким образом,…».',
    render:renderEditor, check:checkEditor
  },
  {
    title:'Итог урока',
    instruction:'Проверь, что осталось в памяти, и отметь самый трудный этап.',
    hint1:'Вспомни две схемы: повествование строится на последовательности событий, рассуждение — на доказательстве мысли.',
    hint2:'Если сомневаешься, сначала определи задачу высказывания: рассказать, объяснить, доказать или поддержать разговор.',
    render:renderFinal, check:checkFinal
  }
];

function fit(){
  const s=Math.min(window.innerWidth/APP_W,window.innerHeight/APP_H);
  wrap.style.width=(APP_W*s)+'px';wrap.style.height=(APP_H*s)+'px';
  app.style.transform='scale('+s+')';
}
window.addEventListener('resize',fit);fit();

function esc(v){return String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function status(msg,type='good'){return `<div class="status ${type}">${msg}</div>`;}
function fmt(sec){sec=Math.max(0,sec);return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');}
function stopTimer(){if(timer)clearInterval(timer);timer=null;timerRunning=false;timerBtn.textContent='▶';}
function resetTimer(){stopTimer();secondsLeft=stageMinutes[current]*60;timerDisplay.textContent=fmt(secondsLeft);}
timerBtn.addEventListener('click',()=>{
  if(timerRunning){stopTimer();return;}
  if(secondsLeft<=0)secondsLeft=stageMinutes[current]*60;
  timerRunning=true;timerBtn.textContent='Ⅱ';
  timer=setInterval(()=>{secondsLeft--;timerDisplay.textContent=fmt(secondsLeft);if(secondsLeft<=0){stopTimer();timerDisplay.textContent='00:00';}},1000);
});

function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({current,state}));}catch(e){}}
function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(!x)return;if(Number.isInteger(x.current))current=Math.max(0,Math.min(6,x.current));if(x.state){Object.keys(state).forEach(k=>{if(x.state[k])Object.assign(state[k],x.state[k]);});}}catch(e){}}

function render(){
  checked=false;hintLevel=1;
  const s=screens[current];
  screenTitle.textContent=s.title;
  instruction.textContent=s.instruction;
  progressText.textContent='Этап '+(current+1)+' из '+screens.length;
  progressFill.style.width=((current+1)/screens.length*100)+'%';
  backBtn.disabled=current===0;
  nextBtn.disabled=true;
  nextBtn.textContent=current===screens.length-1?'Урок завершён':'Дальше →';
  hintBtn.disabled=false;checkBtn.disabled=false;checkBtn.textContent='Проверить';
  resetTimer();
  s.render();
  restoreStageCompletion();
  save();
}

function restoreStageCompletion(){
  const done=[state.diag.score!==null,state.types.score!==null,state.story.ok,state.reason.ok,state.dialog.score!==null,state.editor.ok,state.final.score!==null][current];
  if(done){nextBtn.disabled=current===6;checkBtn.textContent='Проверить ещё раз';}
}

backBtn.addEventListener('click',()=>{if(current>0){current--;render();}});
nextBtn.addEventListener('click',()=>{if(current<6&&!nextBtn.disabled){current++;render();}});
checkBtn.addEventListener('click',()=>screens[current].check());
hintBtn.addEventListener('click',()=>{hintLevel=1;showHint();});
closeHint.addEventListener('click',()=>hintOverlay.classList.add('hidden'));
moreHint.addEventListener('click',()=>{hintLevel=2;showHint();});
hintOverlay.addEventListener('click',e=>{if(e.target===hintOverlay)hintOverlay.classList.add('hidden');});
function showHint(){hintText.textContent=hintLevel===1?screens[current].hint1:screens[current].hint2;moreHint.style.display=hintLevel===1?'inline-block':'none';hintOverlay.classList.remove('hidden');}

function wireRadios(group){
  workspace.querySelectorAll(`input[name="${group}"]`).forEach(r=>r.addEventListener('change',()=>{
    workspace.querySelectorAll(`input[name="${group}"]`).forEach(x=>x.closest('.choice,.dialog-option')?.classList.toggle('selected',x.checked));
    const key=r.dataset.key; if(key){const obj=r.dataset.obj;state[obj][key]=r.value;save();}
  }));
}
function wireText(id,obj,key){const el=document.getElementById(id);el.addEventListener('input',()=>{state[obj][key]=el.value;save();});}

function renderDiag(){
  const q=[
    ['d1','В каком словосочетании пишется НН?',[['a','ветреный день'],['b','решённая задача'],['c','юный спортсмен']]],
    ['d2','Где НЕ пишется раздельно?',[['a','не выполненное вовремя задание'],['b','невысокий дом'],['c','неправда']]],
    ['d3','Какой вариант написан правильно?',[['a','по тому, что было поздно'],['b','потому что было поздно'],['c','потому-что было поздно']]],
    ['d4','В каком слове нужен дефис?',[['a','кто-то'],['b','что бы'],['c','тоже']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Разминка · 7 минут</div><div class="choice-grid">${q.map(([key,text,opts])=>`<div class="task-card"><b>${text}</b>${opts.map(([v,t])=>`<label class="choice"><input type="radio" name="${key}" data-obj="diag" data-key="${key}" value="${v}" ${state.diag[key]===v?'checked':''}><span>${t}</span></label>`).join('')}</div>`).join('')}</div>${state.diag.score!==null?status(`Ранее: ${state.diag.score} из 4. Можно выполнить ещё раз.`,'warn'):''}`;
  q.forEach(x=>wireRadios(x[0]));
}
function checkDiag(){
  const ans={d1:'b',d2:'a',d3:'b',d4:'a'};let score=0,blank=0;
  Object.keys(ans).forEach(k=>{if(!state.diag[k])blank++;else if(state.diag[k]===ans[k])score++;});
  if(blank){appendStatus('Ответь на все 4 вопроса. Осталось: '+blank+'.','bad');return;}
  state.diag.score=score;save();
  appendStatus(score===4?'4 из 4. База сохранена — идём дальше.':score>=2?`${score} из 4. Есть отдельные пробелы: будем возвращать их короткими повторениями.`:`${score} из 4. Орфографию нужно регулярно повторять по 5–7 минут.` ,score>=2?'good':'warn');
  nextBtn.disabled=false;checkBtn.textContent='Проверить ещё раз';
}

function renderTypes(){
  const tasks=[
    ['t1','Мяч ударился о перекладину, отлетел к линии штрафной, и Андрей первым успел к нему. Он сделал передачу, после которой команда забила решающий гол.'],
    ['t2','Стадион был почти пуст. Над тёмными трибунами горели холодные фонари, а мокрая дорожка блестела после дождя.'],
    ['t3','Регулярные тренировки важны не только для результата. Они приучают человека распределять время и доводить начатое до конца. Поэтому спорт помогает воспитывать самодисциплину.']
  ];
  workspace.innerHTML=`<div class="screen-label">Типы речи · 6 минут</div><div class="task-list">${tasks.map(([k,t],i)=>`<div class="task-card"><b>${i+1}. ${t}</b><div class="answers">${[['n','Повествование'],['d','Описание'],['r','Рассуждение']].map(([v,l])=>`<button class="mini-choice ${state.types[k]===v?'active':''}" type="button" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div></div>`).join('')}</div>${state.types.score!==null?status(`Ранее: ${state.types.score} из 3.`,'warn'):''}`;
  workspace.querySelectorAll('.mini-choice').forEach(b=>b.addEventListener('click',()=>{state.types[b.dataset.k]=b.dataset.v;save();renderTypes();}));
}
function checkTypes(){const a={t1:'n',t2:'d',t3:'r'};let score=0,blank=0;Object.keys(a).forEach(k=>{if(!state.types[k])blank++;else if(state.types[k]===a[k])score++;});if(blank){appendStatus('Сначала выбери тип речи для каждого текста.','bad');return;}state.types.score=score;save();appendStatus(score===3?'3 из 3. Ты различаешь типы речи по их задаче.':`${score} из 3. Подумай: события — повествование, признаки — описание, доказательство мысли — рассуждение.`,score===3?'good':'warn');nextBtn.disabled=false;}

function renderStory(){
  workspace.innerHTML=`<div class="screen-label">Повествование · 12 минут</div><p class="lead">Ситуация: команда готовилась к школьному турниру, но перед игрой возникла неожиданная проблема. Расскажи, что произошло и чем всё закончилось.</p><div class="sentence-tools"><span class="tool-chip">сначала</span><span class="tool-chip">вдруг</span><span class="tool-chip">затем</span><span class="tool-chip">после этого</span><span class="tool-chip">наконец</span></div><div class="builder">${[['storyStart','start','Начало','Где и когда? Кто участвует?'],['storyEvent','event','Событие','Что неожиданно случилось?'],['storyMiddle','middle','Развитие','Что сделали участники?'],['storyEnd','end','Итог','Чем всё закончилось?']].map(([id,key,label,ph])=>`<div class="field-card"><label for="${id}">${label}</label><textarea id="${id}" placeholder="${ph}">${esc(state.story[key])}</textarea></div>`).join('')}</div>${state.story.ok?status('Структура уже собрана. Можно улучшить формулировки и проверить снова.','warn'):''}`;
  [['storyStart','start'],['storyEvent','event'],['storyMiddle','middle'],['storyEnd','end']].forEach(x=>wireText(x[0],'story',x[1]));
}
function checkStory(){const vals=[state.story.start,state.story.event,state.story.middle,state.story.end].map(x=>x.trim());const short=vals.filter(x=>x.length<12).length;const all=vals.join(' ');const sentences=countSentences(all);if(short){appendStatus('Заполни все 4 части хотя бы одним содержательным предложением.','bad');return;}state.story.ok=sentences>=4;save();appendStatus(state.story.ok?`Все 4 части есть. Получилось примерно ${sentences} предложений. Теперь прочитай рассказ вслух и проверь порядок событий.`:'Нужно не менее 4 законченных предложений. Добавь подробность там, где мысль обрывается.',state.story.ok?'good':'warn');nextBtn.disabled=!state.story.ok;}

function renderReason(){
  workspace.innerHTML=`<div class="screen-label">Рассуждение · 12 минут</div><p class="lead"><b>Вопрос:</b> почему важно уметь доводить начатое дело до конца?</p><div class="builder">${[['reasonThesis','thesis','1. Тезис','Я считаю, что...'],['reasonExplain','explain','2. Объяснение','Это важно, потому что...'],['reasonExample','example','3. Пример','Например,...'],['reasonConclusion','conclusion','4. Вывод','Таким образом,...']].map(([id,key,label,ph])=>`<div class="field-card"><label for="${id}">${label}</label><textarea id="${id}" placeholder="${ph}">${esc(state.reason[key])}</textarea></div>`).join('')}</div>${state.reason.ok?status('Каркас рассуждения уже собран. Можно улучшить доказательство.','warn'):''}`;
  [['reasonThesis','thesis'],['reasonExplain','explain'],['reasonExample','example'],['reasonConclusion','conclusion']].forEach(x=>wireText(x[0],'reason',x[1]));
}
function checkReason(){const vals=[state.reason.thesis,state.reason.explain,state.reason.example,state.reason.conclusion].map(x=>x.trim());if(vals.some(x=>x.length<12)){appendStatus('Нужны все 4 части: тезис, объяснение, пример и вывод.','bad');return;}const joined=vals.join(' ');const hasCause=/потому|так как|поэтому|поскольку/i.test(joined);const sent=countSentences(joined);state.reason.ok=sent>=4&&hasCause;save();appendStatus(state.reason.ok?`Структура собрана: около ${sent} предложений, есть причинно-следственная связь. Проверь, действительно ли пример доказывает тезис.`:'Добавь явное объяснение причины: «потому что», «так как», «поэтому» — и проверь завершённость предложений.',state.reason.ok?'good':'warn');nextBtn.disabled=!state.reason.ok;}

function renderDialog(){
  const qs=[
    ['q1','Как лучше начать разговор?',[['a','Скинь, что было.'],['b','Привет! Я пропустил урок. Подскажи, пожалуйста, какую тему вы проходили?'],['c','Что там сегодня?']]],
    ['q2','Тебе ответили: «Разбирали словосочетания». Что уточнить?',[['a','Ясно.'],['b','А что именно нужно уметь: находить главное слово или ещё определять вид связи?'],['c','Сложно было?']]],
    ['q3','Как завершить разговор?',[['a','Хорошо, спасибо! Запишу тему и разберу упражнение.'],['b','Ок.'],['c','Ладно, пока.']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Диалог · 8 минут</div><div class="dialogue">${qs.map(([k,q,opts],i)=>`<div class="task-card"><b>${i+1}. ${q}</b><div class="dialog-options">${opts.map(([v,t])=>`<label class="dialog-option ${state.dialog[k]===v?'active selected':''}"><input class="hidden" type="radio" name="${k}" data-obj="dialog" data-key="${k}" value="${v}" ${state.dialog[k]===v?'checked':''}><span>${t}</span></label>`).join('')}</div></div>`).join('')}</div>${state.dialog.score!==null?status(`Ранее: ${state.dialog.score} из 3.`,'warn'):''}`;
  qs.forEach(x=>wireRadios(x[0]));
}
function checkDialog(){const a={q1:'b',q2:'b',q3:'a'};let score=0,blank=0;Object.keys(a).forEach(k=>{if(!state.dialog[k])blank++;else if(state.dialog[k]===a[k])score++;});if(blank){appendStatus('Выбери по одной реплике в каждой ситуации.','bad');return;}state.dialog.score=score;save();appendStatus(score===3?'3 из 3. Диалог получился вежливым, конкретным и полезным.':`${score} из 3. Сильный диалог помогает уточнить информацию, а не просто завершить разговор.`,score===3?'good':'warn');nextBtn.disabled=false;}

function renderEditor(){
  const issues=[['comma','Пропущена запятая перед «что»'],['repeat','Есть неоправданные повторы'],['example','Нет конкретного примера'],['conclusion','Нет полноценного вывода'],['long','Ответ слишком длинный']];
  workspace.innerHTML=`<div class="screen-label">Редактирование · 8 минут</div><div class="editor-layout"><div><div class="weak-text">«Я считаю что планировать время полезно. Потому что это полезно. Когда человек планирует время, он всё планирует. Вот.»</div><p class="small-note">Отметь все реальные проблемы ответа.</p><div class="issue-list">${issues.map(([v,t])=>`<div class="issue"><label><input type="checkbox" value="${v}" ${state.editor.issues.includes(v)?'checked':''}><span>${t}</span></label></div>`).join('')}</div></div><div><label><b>Перепиши ответ лучше</b></label><textarea id="rewrite" class="rewrite" placeholder="Я считаю, что...">${esc(state.editor.rewrite)}</textarea><div class="example-box">Ориентир: тезис → объяснение → пример → вывод.</div></div></div>${state.editor.ok?status('Редактирование выполнено. Можно сделать формулировки ещё точнее.','warn'):''}`;
  workspace.querySelectorAll('.issue input').forEach(ch=>ch.addEventListener('change',()=>{state.editor.issues=[...workspace.querySelectorAll('.issue input:checked')].map(x=>x.value);save();}));
  wireText('rewrite','editor','rewrite');
}
function checkEditor(){const correct=['comma','repeat','example','conclusion'];let score=0;correct.forEach(v=>{if(state.editor.issues.includes(v))score++;});if(state.editor.issues.includes('long'))score=Math.max(0,score-1);state.editor.score=score;const txt=state.editor.rewrite.trim();const sent=countSentences(txt);const hasCause=/потому|так как|поэтому|поскольку/i.test(txt);state.editor.ok=score>=3&&sent>=4&&hasCause;save();if(txt.length<40){appendStatus('Сначала перепиши ответ: нужно не менее 4 содержательных предложений.','bad');return;}appendStatus(state.editor.ok?`Проблемы найдены: ${score} из 4. Новый текст имеет около ${sent} предложений и содержит объяснение причины.`:`Проблемы: ${score} из 4. В новом ответе нужны тезис, причина, пример и вывод.`,state.editor.ok?'good':'warn');nextBtn.disabled=!state.editor.ok;}

function renderFinal(){
  const q=[
    ['f1','Какая схема подходит для рассуждения?',[['a','событие → событие → итог'],['b','тезис → объяснение → пример → вывод']]],
    ['f2','Что главное в повествовании?',[['a','последовательность событий'],['b','перечисление признаков']]],
    ['f3','Хороший развёрнутый ответ...',[['a','повторяет вопрос'],['b','содержит мысль и её объяснение']]],
    ['f4','Что помогает поддерживать диалог?',[['a','уточняющие вопросы и содержательные ответы'],['b','только короткие «да» и «нет»']]]
  ];
  const hard=[['rules','Орфография'],['types','Типы речи'],['story','Повествование'],['reason','Рассуждение'],['dialog','Диалог'],['edit','Редактирование']];
  workspace.innerHTML=`<div class="screen-label">Итог · 7 минут</div><div class="final-wrap"><div class="choice-grid">${q.map(([k,text,opts])=>`<div class="task-card"><b>${text}</b>${opts.map(([v,t])=>`<label class="choice"><input type="radio" name="${k}" data-obj="final" data-key="${k}" value="${v}" ${state.final[k]===v?'checked':''}><span>${t}</span></label>`).join('')}</div>`).join('')}</div><p class="small-note"><b>Что сегодня было труднее всего?</b></p><div class="self-select">${hard.map(([v,t])=>`<button type="button" class="self-btn ${state.final.hard===v?'active':''}" data-v="${v}">${t}</button>`).join('')}</div></div>${state.final.score!==null?finalSummary():''}`;
  q.forEach(x=>wireRadios(x[0]));
  workspace.querySelectorAll('.self-btn').forEach(b=>b.addEventListener('click',()=>{state.final.hard=b.dataset.v;save();renderFinal();}));
}
function checkFinal(){const a={f1:'b',f2:'a',f3:'b',f4:'a'};let score=0,blank=0;Object.keys(a).forEach(k=>{if(!state.final[k])blank++;else if(state.final[k]===a[k])score++;});if(blank||!state.final.hard){appendStatus('Ответь на 4 вопроса и выбери самый трудный этап.','bad');return;}state.final.score=score;save();renderFinal();appendStatus(score>=3?'Итог готов. Ниже — результат и рекомендация для следующего занятия.':'Итог готов. Есть навыки, которые стоит повторить на следующем занятии.',score>=3?'good':'warn');checkBtn.textContent='Пересчитать итог';nextBtn.disabled=true;}
function finalSummary(){
  const auto=[state.diag.score||0,state.types.score||0,state.dialog.score||0,state.editor.score||0,state.final.score||0];
  const got=auto.reduce((a,b)=>a+b,0),max=18;
  const long=[state.story.ok,state.reason.ok,state.editor.ok].filter(Boolean).length;
  const names={rules:'орфография',types:'типы речи',story:'повествование',reason:'рассуждение',dialog:'диалог',edit:'редактирование'};
  let rec='На следующем занятии можно идти дальше по текущей школьной теме.';
  if(state.diag.score<3||state.final.hard==='rules')rec='Оставлять на каждом занятии 7–10 минут на базовую орфографию.';
  else if(!state.reason.ok||state.final.hard==='reason')rec='Продолжить рассуждение: тезис, пример, пояснение и вывод.';
  else if(!state.story.ok||state.final.hard==='story')rec='Ещё раз потренировать последовательность событий и связки между частями рассказа.';
  else if(state.final.hard==='types')rec='Закрепить признаки повествования, описания и рассуждения на коротких текстах.';
  else if(state.final.hard==='dialog')rec='Продолжить развёрнутые ответы и уточняющие вопросы в учебном диалоге.';
  return `<div class="final-grid"><div class="stat"><b>${got}/${max}</b><span>автоматические задания</span></div><div class="stat"><b>${long}/3</b><span>развёрнутые задания</span></div><div class="stat"><b>${names[state.final.hard]||'—'}</b><span>самая трудная часть</span></div></div><div class="recommendation"><b>Рекомендация:</b> ${rec}<br><span class="small-note">Прогресс сохранён на этом устройстве автоматически.</span></div>`;
}

function countSentences(text){return text.split(/[.!?]+/).filter(x=>x.trim().length>3).length;}
function appendStatus(msg,type){workspace.querySelectorAll('.status').forEach(x=>x.remove());workspace.insertAdjacentHTML('beforeend',status(msg,type));}

load();render();
