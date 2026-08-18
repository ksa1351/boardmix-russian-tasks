const data = {
  "active-present": [
    ["читать","читающий"], ["гнать","гонящий"], ["брить","бреющий"], ["строить","строящий"], ["держать","держащий"],
    ["писать","пишущий"], ["дышать","дышащий"], ["лечить","лечащий"], ["слышать","слышащий"], ["рисовать","рисующий"],
    ["смотреть","смотрящий"], ["клеить","клеящий"], ["видеть","видящий"], ["сеять","сеющий"], ["ненавидеть","ненавидящий"],
    ["любить","любящий"], ["обидеть",null], ["таять","тающий"], ["вертеть","вертящий"], ["хранить","хранящий"],
    ["зависеть","зависящий"], ["бороться","борющийся"], ["терпеть","терпящий"], ["колоть","колющий"], ["стелить","стелющий"],
    ["говорить","говорящий"], ["полоть","полющий"], ["лететь","летящий"], ["молоть","мелющий"], ["сидеть","сидящий"]
  ].map(([verb,answer])=>({verb,answer,noForm:answer===null})),
  "active-past": [
    ["читать","читавший"], ["нести","нёсший"], ["сделать","сделавший"], ["принести","принёсший"], ["решить","решивший"],
    ["унести","унёсший"], ["построить","построивший"], ["расти","росший"], ["написать","написавший"], ["вырасти","выросший"],
    ["открыть","открывший"], ["ползти","ползший"], ["услышать","услышавший"], ["выползти","выползший"], ["потерять","потерявший"],
    ["печь","пёкший"], ["нарисовать","нарисовавший"], ["испечь","испёкший"], ["проверить","проверивший"], ["беречь","берёгший"],
    ["заметить","заметивший"], ["сберечь","сберёгший"], ["прочитать","прочитавший"], ["стеречь","стерёгший"], ["рассказать","рассказавший"],
    ["мочь","могший"], ["улыбнуться","улыбнувшийся"], ["замёрзнуть","замёрзший"], ["увидеть","увидевший"], ["погибнуть","погибший"]
  ].map(([verb,answer])=>({verb,answer,noForm:false})),
  "passive-present": [
    ["читать","читаемый"], ["брить",null], ["гнать","гонимый"], ["проверять","проверяемый"], ["держать",null],
    ["уважать","уважаемый"], ["дышать",null], ["хранить","хранимый"], ["слышать","слышимый"], ["решать","решаемый"],
    ["смотреть",null], ["обсуждать","обсуждаемый"], ["видеть","видимый"], ["изучать","изучаемый"], ["ненавидеть","ненавидимый"],
    ["выполнять","выполняемый"], ["обидеть",null], ["создавать","создаваемый"], ["вертеть","вертимый","Редкая нормативная форма; употребляется нечасто."], ["любить","любимый"],
    ["зависеть",null], ["носить","носимый"], ["терпеть","терпимый"], ["вести","ведомый"], ["стелить","стелимый","Редкая нормативная форма; употребляется нечасто."],
    ["строить","строимый"], ["управлять","управляемый"], ["бежать",null], ["улыбаться",null], ["спать",null]
  ].map(([verb,answer,note])=>({verb,answer,note:note||"",noForm:answer===null})),
  "passive-past": [
    ["прочитать","прочитанный"], ["брить","бритый"], ["гнать",null], ["посеять","посеянный"], ["держать","держанный","Редкая нормативная форма; употребляется нечасто."],
    ["построить","построенный"], ["дышать",null], ["решить","решённый"], ["слышать","слышанный"], ["принести","принесённый"],
    ["смотреть",null], ["закрыть","закрытый"], ["видеть","виденный"], ["сжать","сжатый"], ["ненавидеть",null],
    ["написать","написанный"], ["обидеть","обиженный"], ["открыть","открытый"], ["вертеть","верченный","Редкая нормативная форма; употребляется нечасто."], ["увидеть","увиденный"],
    ["зависеть",null], ["испечь","испечённый"], ["терпеть",null], ["разбить","разбитый"], ["стелить","стеленный","Редкая нормативная форма; употребляется нечасто."],
    ["подмести","подметённый"], ["потерять","потерянный"], ["улыбаться",null], ["бежать",null], ["спать",null]
  ].map(([verb,answer,note])=>({verb,answer,note:note||"",noForm:answer===null}))
};

const hintContent = {
  "active-present": {
    title: "Действительное причастие настоящего времени",
    formula: [
      ["Основа","НСВ → 3-е л. мн. ч. → основа настоящего времени","читать → читают → чита-"],
      ["Спряжение","I: -ут/-ют → -ущ-/-ющ-<br>II: -ат/-ят → -ащ-/-ящ-","читают → I спр."],
      ["Сборка","основа + суффикс причастия","чита- + -ющ- = читающий"]
    ],
    note: "<b>Искл.:</b> I — брить, стелить; II — гнать, держать, дышать, слышать, смотреть, видеть, ненавидеть, обидеть, зависеть, терпеть, вертеть."
  },
  "active-past": {
    title: "Действительное причастие прошедшего времени",
    formula: [
      ["Основа","Форма прошедшего времени → основа прошедшего времени","прочитал → прочита-; нёс → нёс-"],
      ["Суффикс","основа на гласный → -вш-<br>основа на согласный → -ш-","прочита- → -вш-; нёс- → -ш-"],
      ["Сборка","основа + суффикс причастия","прочита- + -вш- = прочитавший<br>нёс- + -ш- = нёсший"]
    ],
    note: "Если основы различаются, ориентируйся на прошедшее время: <b>нести → нёс → нёсший</b>."
  },
  "passive-present": {
    title: "Страдательное причастие настоящего времени",
    formula: [
      ["Основа","НСВ + переходный → основа настоящего времени","проверяем → проверя-; храним → хран-"],
      ["Спряжение","I спр. → -ем-<br>II спр. → -им-","проверяем → I; храним → II"],
      ["Сборка","основа + суффикс причастия","проверя- + -ем- = проверяемый<br>хран- + -им- = хранимый"]
    ],
    note: "Если нормативной формы нет, выбирай <b>«Не образуется»</b>."
  },
  "passive-past": {
    title: "Страдательное причастие прошедшего времени",
    formula: [
      ["Основа","Обычно переходный глагол → выдели основу","прочитать → прочита-; решить → реш-; закрыть → закры-"],
      ["Суффикс","-нн- · -енн-/-ённ- · -т-","-ать → -анный; -ять → -янный"],
      ["Сборка","основа + нужный суффикс","прочита- + -нн- = прочитанный<br>реш- + -ённ- = решённый<br>закры- + -т- = закрытый"]
    ],
    note: "Если нормативной формы нет, выбирай <b>«Не образуется»</b>."
  }
};

const taskCaption = {
  "active-present":"действительное причастие настоящего времени",
  "active-past":"действительное причастие прошедшего времени",
  "passive-present":"страдательное причастие настоящего времени",
  "passive-past":"страдательное причастие прошедшего времени"
};

const blockOrder = ["active-present","active-past","passive-present","passive-past"];
const blockTitles = {
  "active-present":"Действительные причастия настоящего времени",
  "active-past":"Действительные причастия прошедшего времени",
  "passive-present":"Страдательные причастия настоящего времени",
  "passive-past":"Страдательные причастия прошедшего времени"
};

const state = Object.fromEntries(blockOrder.map(id=>[id,makeState(id)]));
function makeState(id){
  return {idx:0,attempts:Array(data[id].length).fill(0),checks:0,first:0,next:false,noFormSelected:false,done:false,hintOpen:false,draft:'',feedbackText:'',feedbackClass:'empty'};
}
let current = blockOrder[0];

const titleEl = document.getElementById('title');
const blockProgressEl = document.getElementById('blockProgress');
const fillEl = document.getElementById('fill');
const drillEl = document.getElementById('drill');
const statusEl = document.getElementById('allStatus');

function norm(s){ return (s||"").trim().toLowerCase().replace(/ё/g,'е').replace(/\s+/g,' '); }

function scaleApp(){
  const app = document.getElementById('app');
  const wrap = document.getElementById('wrap');
  const vw = window.innerWidth, vh = window.innerHeight;
  const scale = Math.min(vw/1280, vh/720);
  app.style.transform = `scale(${scale})`;
  wrap.style.width = `${1280*scale}px`;
  wrap.style.height = `${720*scale}px`;
}
window.addEventListener('resize', scaleApp);
scaleApp();

document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{ current = btn.dataset.id; render(); });
});

function render(){
  document.querySelectorAll('.tab').forEach(btn=>btn.classList.toggle('active', btn.dataset.id===current));
  titleEl.textContent = blockTitles[current];
  const blockIndex = blockOrder.indexOf(current)+1;
  blockProgressEl.textContent = `Блок ${blockIndex} из 4`;
  fillEl.style.width = `${blockIndex/4*100}%`;
  statusEl.textContent = blockOrder.every(id=>state[id].done) ? 'Все 4 блока завершены.' : '';
  statusEl.className = blockOrder.every(id=>state[id].done) ? 'done' : '';
  renderBlock(current);
}

function renderHint(id){
  const conf = hintContent[id];
  const open = state[id].hintOpen;
  const boxes = conf.formula.map((x,i)=>`
    <div class="hint-formula-box">
      <div class="hint-formula-title"><span>${i+1}</span>${x[0]}</div>
      <div class="hint-formula-rule">${x[1]}</div>
      <div class="hint-formula-example">${x[2]}</div>
    </div>`).join('');
  return `
    <div class="hint ${open?'open':''}" id="hintBox">
      <div class="hint-title"><span>Подсказка: ${conf.title}</span><span>${open?'▴':'▾'}</span></div>
      <div class="hint-formula-grid">${boxes}</div>
      <div class="hint-note">${conf.note}</div>
    </div>`;
}

function renderBlock(id){
  const s = state[id];
  const arr = data[id];
  if(s.done){
    const repeated = arr.map((item,i)=>({verb:item.verb, tries:s.attempts[i]})).filter(x=>x.tries>1);
    drillEl.innerHTML = `
      <div class="summary">
        <h2>${blockTitles[id]} · блок завершён</h2>
        <div class="sumgrid">
          <div class="sum"><b>${arr.length}</b><span>слов выполнено</span></div>
          <div class="sum"><b>${s.first}</b><span>с первой попытки</span></div>
          <div class="sum"><b>${s.checks}</b><span>всего проверок</span></div>
        </div>
        <div class="difficult">${repeated.length ? '<b>Слова, потребовавшие больше одной попытки:</b> ' + repeated.map(x=>`${x.verb} — ${x.tries}`).join(' · ') : 'Все слова выполнены с первой попытки.'}</div>
        <button class="restart" id="restartBtn">Пройти блок ещё раз</button>
      </div>`;
    document.getElementById('restartBtn').onclick = ()=>{
      const hintWasOpen = state[id].hintOpen;
      state[id] = makeState(id);
      state[id].hintOpen = hintWasOpen;
      render();
    };
    return;
  }

  const item = arr[s.idx];
  drillEl.innerHTML = `
    <div class="head">
      <div class="counter">Глагол ${s.idx+1} из ${arr.length}</div>
      <div class="stat">С первой попытки: ${s.first}</div>
      <div class="stat">Проверок: ${s.checks}</div>
    </div>
    <div class="wordbar"><i style="width:${(s.idx+1)/arr.length*100}%"></i></div>
    <div class="card">
      <div class="caption">Образуйте ${taskCaption[id]} от глагола:</div>
      <div class="verb">${item.verb}</div>
      <div class="answer">
        <input id="answerInput" autocomplete="off" spellcheck="false" placeholder="Введите причастие" value="${escapeHtml(s.draft)}" ${s.next?'disabled':''}>
        <button class="check" id="checkBtn">Проверить</button>
        <button class="hint-btn ${s.hintOpen?'active':''}" id="hintBtn">Подсказка</button>
      </div>
      <button class="noform ${s.noFormSelected?'active':''}" id="noFormBtn" ${s.next?'disabled':''}>Не образуется</button>
      <div class="feedback ${s.feedbackClass || 'empty'}" id="feedback">${s.feedbackText || '.'}</div>
      <button class="next ${s.next?'':'hidden'}" id="nextBtn">${s.idx===arr.length-1?'Завершить блок':'Следующий глагол →'}</button>
      ${renderHint(id)}
    </div>`;

  const input = document.getElementById('answerInput');
  const checkBtn = document.getElementById('checkBtn');
  const hintBtn = document.getElementById('hintBtn');
  const noFormBtn = document.getElementById('noFormBtn');
  const nextBtn = document.getElementById('nextBtn');

  function setFeedback(text, cls){
    s.feedbackText = text;
    s.feedbackClass = cls;
  }

  function handleCheck(){
    if(s.next) return;
    const entered = norm(s.draft);
    const noChosen = s.noFormSelected || entered === 'не образуется';
    if(!entered && !noChosen){ setFeedback('Введите причастие или нажмите «Не образуется».', 'bad'); return renderBlock(id); }
    s.attempts[s.idx]++;
    s.checks++;
    const ok = item.noForm ? noChosen : (!noChosen && norm(item.answer) === entered);
    if(ok){
      if(s.attempts[s.idx]===1) s.first++;
      s.next = true;
      let text = item.noForm ? 'Верно: такая форма не образуется.' : `Верно: ${item.answer}.`;
      let cls = 'good';
      if(item.note){ text += ' ' + item.note; cls = 'rare'; }
      setFeedback(text, cls);
    } else {
      setFeedback(item.noForm ? 'Пока неверно. Проверьте условия образования: возможно, форма не образуется.' : 'Пока неверно. Вернитесь к основе и суффиксу нужного типа причастия.', 'bad');
    }
    renderBlock(id);
  }

  function handleNext(){
    if(!s.next) return;
    s.next = false; s.noFormSelected = false; s.draft=''; s.feedbackText=''; s.feedbackClass='empty';
    if(s.idx===arr.length-1) s.done = true;
    else s.idx++;
    render();
  }

  checkBtn.onclick = handleCheck;
  hintBtn.onclick = ()=>{ s.hintOpen = !s.hintOpen; renderBlock(id); };
  noFormBtn.onclick = ()=>{ if(s.next) return; s.noFormSelected = !s.noFormSelected; renderBlock(id); };
  nextBtn.onclick = handleNext;
  input.addEventListener('input', ()=>{ s.draft = input.value; if(s.noFormSelected) s.noFormSelected = false; });
  input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); handleCheck(); } });
  if(!s.next) setTimeout(()=>input.focus(),0);
}

function escapeHtml(s){
  return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

render();
