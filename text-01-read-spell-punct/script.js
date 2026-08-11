const fullText = [
  'Иван Кулибин — талантливый русский изобретатель, воплотивший свои самые смелые мечты.',
  'Широко известны такие его изобретения, как первый в России телеграф, самодвижущиеся экипажи, приводимые в действие педалями.',
  'Гениальны проекты деревянных мостов, разработанные Кулибиным.',
  'Русских часовщиков в России тогда почти не было.',
  'Часами занимались немцы, и они распространяли мнение, что русский человек не сможет постигнуть сложность часового механизма.',
  'Любовь к часам, беспристрастно выстукивающим время, появилась у Кулибина с детства и осталась навсегда.',
  'Что бы он ни делал, что бы ни изобретал, мысли его неумолимо возвращались к часам.',
  'Поражают часы, сделанные мастером в виде яйца, в которых каждый час раскрывались золоченые двери, а под музыку разыгрывалось представление.',
  'Часы Кулибина, раскрывая дарование мастера, являли собой чудо русской техники.'
];

const tasks = [
  {
    parts: [
      'Иван Кулибин ',
      {type:'punct', answer:'—', options:['','—',',']},
      ' талантл', {type:'spell', answer:'и', options:['и','е']}, 'вый русский изобр',
      {type:'spell', answer:'е', options:['е','и']}, 'татель',
      {type:'punct', answer:',', options:['',',','—']},
      ' воплотивший свои самые смелые мечты.'
    ]
  },
  {
    parts: [
      'Широко извес', {type:'spell', answer:'т', options:['т','д','']},
      'ны такие его изобретения, как первый в России телеграф',
      {type:'punct', answer:',', options:['',',',';']},
      ' самодвиж', {type:'spell', answer:'у', options:['у','ю','а']}, 'щиеся экипажи',
      {type:'punct', answer:',', options:['',',','—']},
      ' пр', {type:'spell', answer:'и', options:['и','е']}, 'водимые в действие п',
      {type:'spell', answer:'е', options:['е','и']}, 'далями.'
    ]
  },
  {
    parts: [
      'Г', {type:'spell', answer:'е', options:['е','и']}, 'ниальны проекты деревя',
      {type:'spell', answer:'нн', options:['н','нн']}, 'ых мостов',
      {type:'punct', answer:',', options:['',',','—']},
      ' разработа', {type:'spell', answer:'нн', options:['н','нн']}, 'ые Кулибиным.'
    ]
  },
  {
    parts: ['Русских часов', {type:'spell', answer:'щ', options:['щ','ч','ш']}, 'иков в России тогда почти не было.']
  },
  {
    parts: [
      'Часами зан', {type:'spell', answer:'и', options:['и','е']}, 'мались немцы',
      {type:'punct', answer:',', options:['',',',';']},
      ' и они ра', {type:'spell', answer:'с', options:['с','з','сс']}, 'пространяли мнение',
      {type:'punct', answer:',', options:['',',',','—']},
      ' что русский человек не сможет постигнуть сложность часового механизма.'
    ]
  },
  {
    parts: [
      'Любовь к часам', {type:'punct', answer:',', options:['',',','—']},
      ' беспр', {type:'spell', answer:'и', options:['и','е']}, 'страстно выстукивающим время',
      {type:'punct', answer:',', options:['',',','—']},
      ' появилась у Кулибина с детства и осталась навсегда.'
    ]
  },
  {
    parts: [
      'Что ', {type:'spell', answer:'бы', options:['бы','б']}, ' он ',
      {type:'spell', answer:'ни', options:['не','ни']}, ' делал',
      {type:'punct', answer:',', options:['',',',';']},
      ' что ', {type:'spell', answer:'бы', options:['бы','б']}, ' ',
      {type:'spell', answer:'ни', options:['не','ни']}, ' изобретал',
      {type:'punct', answer:',', options:['',',',';']},
      ' мысли его ', {type:'spell', answer:'не', options:['не','ни','']}, 'умолимо возвр',
      {type:'spell', answer:'а', options:['а','о']}, 'щались к часам.'
    ]
  },
  {
    parts: [
      'Пор', {type:'spell', answer:'а', options:['а','о']}, 'жают часы',
      {type:'punct', answer:',', options:['',',','—']},
      ' сдела', {type:'spell', answer:'нн', options:['н','нн']}, 'ые мастером в виде яйца',
      {type:'punct', answer:',', options:['',',','—']},
      ' в которых каждый час раскрывались золоче', {type:'spell', answer:'н', options:['н','нн']}, 'ые двери',
      {type:'punct', answer:',', options:['',',',';']},
      ' а под музыку раз', {type:'spell', answer:'ы', options:['ы','и']}, 'грывалось представление.'
    ]
  },
  {
    parts: [
      'Часы Кулибина', {type:'punct', answer:',', options:['',',','—']},
      ' раскрывая д', {type:'spell', answer:'а', options:['а','о']}, 'рование мастера',
      {type:'punct', answer:',', options:['',',','—']},
      ' являли собой чудо русской техники.'
    ]
  }
];

let page = 0; // 0 — чтение; 1..9 — задания; 10 — итог
const answers = tasks.map(() => []);
const checked = tasks.map(() => false);
const screen = document.getElementById('screen');

function optionLabel(v, type){
  if(v === '') return type === 'punct' ? '∅' : '—';
  return v;
}

function render(){
  if(page === 0) return renderReading();
  if(page === tasks.length + 1) return renderSummary();
  return renderTask(page - 1);
}

function renderReading(){
  screen.innerHTML = `
    <div class="kicker">Работа с текстом</div>
    <h1>Славный мастер</h1>
    <p class="lead">Сначала прочитай текст целиком. Затем восстанови орфографию и пунктуацию в каждом предложении.</p>
    <div class="text-card">
      <p>${fullText.slice(0,3).map((t,i)=>`<b>(${i+1})</b> ${t}`).join(' ')}</p>
      <p>${fullText.slice(3,7).map((t,i)=>`<b>(${i+4})</b> ${t}`).join(' ')}</p>
      <p>${fullText.slice(7,9).map((t,i)=>`<b>(${i+8})</b> ${t}`).join(' ')}</p>
      <p><i>(По Г. Богдановой)</i></p>
    </div>
    <div class="nav"><span class="spacer"></span><button class="btn btn-primary" id="startBtn">Начать работу →</button></div>`;
  document.getElementById('startBtn').onclick = () => { page = 1; render(); };
}

function renderTask(idx){
  const task = tasks[idx];
  let choiceIndex = 0;
  const sentence = task.parts.map(part => {
    if(typeof part === 'string') return part;
    const ci = choiceIndex++;
    const saved = answers[idx][ci];
    const opts = ['<option value="" disabled ' + (saved === undefined ? 'selected' : '') + '>?</option>']
      .concat(part.options.map(v => `<option value="${escapeAttr(v)}" ${saved === v ? 'selected' : ''}>${optionLabel(v, part.type)}</option>`));
    return `<span class="choice"><select data-choice="${ci}" data-type="${part.type}" aria-label="Выбор ответа">${opts.join('')}</select></span>`;
  }).join('');
  const pct = ((idx + 1) / tasks.length) * 100;
  screen.innerHTML = `
    <div class="progress-wrap">
      <div class="progress-row"><span class="kicker">Орфография + пунктуация</span><span class="progress-label">Предложение ${idx+1} из ${tasks.length}</span></div>
      <div class="progress"><span style="width:${pct}%"></span></div>
    </div>
    <div class="task-card">
      <h1 class="task-title">Восстанови предложение</h1>
      <p class="instruction">Выбери нужные буквы, написания и знаки препинания. Символ ∅ означает «знак не нужен».</p>
      <div class="sentence">${sentence}</div>
      <div id="result" class="result"></div>
    </div>
    <div class="nav">
      <button class="btn btn-secondary" id="prevBtn">← Назад</button>
      <span class="spacer"></span>
      <button class="btn btn-primary" id="checkBtn">Проверить</button>
      <button class="btn btn-secondary" id="nextBtn">${idx === tasks.length-1 ? 'Завершить →' : 'Дальше →'}</button>
    </div>`;

  document.querySelectorAll('select[data-choice]').forEach(sel => {
    sel.addEventListener('change', () => {
      answers[idx][Number(sel.dataset.choice)] = sel.value;
      sel.classList.remove('correct','wrong');
      checked[idx] = false;
      const r = document.getElementById('result');
      r.textContent=''; r.className='result';
    });
  });
  document.getElementById('prevBtn').onclick = () => { page--; render(); };
  document.getElementById('nextBtn').onclick = () => { page++; render(); };
  document.getElementById('checkBtn').onclick = () => checkTask(idx);
  if(checked[idx]) checkTask(idx, true);
}

function checkTask(idx, silent=false){
  const selects = [...document.querySelectorAll('select[data-choice]')];
  const expected = tasks[idx].parts.filter(p => typeof p !== 'string');
  let correct = 0;
  let filled = 0;
  selects.forEach((sel,i) => {
    const val = answers[idx][i];
    sel.classList.remove('correct','wrong');
    if(val !== undefined){
      filled++;
      if(val === expected[i].answer){ sel.classList.add('correct'); correct++; }
      else sel.classList.add('wrong');
    }
  });
  checked[idx] = true;
  const r = document.getElementById('result');
  if(filled < expected.length){
    r.textContent = `Заполнено ${filled} из ${expected.length}. Можно продолжить и вернуться позже.`;
    r.className='result bad';
  } else if(correct === expected.length){
    r.textContent='Всё верно.'; r.className='result good';
  } else {
    r.textContent=`Верно ${correct} из ${expected.length}. Исправь подсвеченные места или переходи дальше.`;
    r.className='result bad';
  }
}

function renderSummary(){
  let spellTotal=0, spellCorrect=0, punctTotal=0, punctCorrect=0;
  const trouble = [];
  tasks.forEach((task,idx) => {
    let localWrong=0;
    let c=0;
    task.parts.forEach(part => {
      if(typeof part === 'string') return;
      const val=answers[idx][c++];
      if(part.type==='spell'){
        spellTotal++; if(val===part.answer) spellCorrect++; else localWrong++;
      }else{
        punctTotal++; if(val===part.answer) punctCorrect++; else localWrong++;
      }
    });
    if(localWrong) trouble.push(idx+1);
  });
  screen.innerHTML = `
    <div class="kicker">Готово</div>
    <h1>Результат работы</h1>
    <p class="lead">Это диагностический итог: он показывает, к каким предложениям стоит вернуться.</p>
    <div class="summary">
      <div class="summary-card"><div class="summary-num">${spellCorrect} / ${spellTotal}</div><div class="summary-label">Орфография</div></div>
      <div class="summary-card"><div class="summary-num">${punctCorrect} / ${punctTotal}</div><div class="summary-label">Пунктуация</div></div>
    </div>
    <div class="mistakes"><b>${trouble.length ? 'Стоит ещё посмотреть предложения:' : 'Все предложения выполнены без ошибок.'}</b>${trouble.length ? `<ul>${trouble.map(n=>`<li>Предложение ${n}</li>`).join('')}</ul>`:''}</div>
    <div class="nav"><button class="btn btn-secondary" id="backBtn">← Назад</button><span class="spacer"></span><button class="btn btn-primary" id="againBtn">Пройти заново</button></div>`;
  document.getElementById('backBtn').onclick=()=>{page=tasks.length;render();};
  document.getElementById('againBtn').onclick=()=>{answers.forEach(a=>a.splice(0));checked.fill(false);page=0;render();};
}

function escapeAttr(v){
  return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

render();
