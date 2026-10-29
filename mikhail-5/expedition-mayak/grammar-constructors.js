(()=>{
'use strict';
const escapeHTML=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const morMount=document.getElementById('morphemicConstructor');
const nounMount=document.getElementById('nounConstructor');
if(!morMount||!nounMount)return;
const words=[
 {word:'лесной',parts:[['лес','корень'],['н','суффикс'],['ой','окончание']],base:'лесн'},
 {word:'тропинка',parts:[['троп','корень'],['инк','суффикс'],['а','окончание']],base:'тропинк'},
 {word:'берёзы',parts:[['берёз','корень'],['ы','окончание']],base:'берёз'},
 {word:'высокими',parts:[['высок','корень'],['ими','окончание']],base:'высок'},
 {word:'маяка',parts:[['маяк','корень'],['а','окончание']],base:'маяк'}
];
const markers=[['корень','⌒','Корень'],['суффикс','∧','Суффикс'],['окончание','□','Окончание']];
let currentWord=0;
const wordStates=words.map(()=>({ranges:[],start:null,end:null,base:'',checked:false,message:''}));
const nounTemplates=[
 {title:'в долине',context:'В долине блестела река.',answer:{part:'имя существительное',meaning:'предмет',question:'в чём?',initial:'долина',proper:'нарицательное',animate:'неодушевлённое',gender:'женский',decl:'1-е',number:'единственное',case:'предложный',member:'обстоятельство'},choices:{question:['в чём?','где?','какая?','чем?'],initial:['долина','долине','долину','долины']}},
 {title:'капли',context:'Между высокими соснами поблёскивали капли росы.',answer:{part:'имя существительное',meaning:'предмет',question:'что?',initial:'капля',proper:'нарицательное',animate:'неодушевлённое',gender:'женский',decl:'1-е',number:'множественное',case:'именительный',member:'подлежащее'},choices:{question:['что?','чего?','чему?','чем?'],initial:['капля','капли','каплю','капель']}}
];
let nounIndex=0;
const nounStates=nounTemplates.map(()=>({values:{},checked:false}));
function nounFields(){
 const spec=nounTemplates[nounIndex];
 const list=[
 ['part','Часть речи',['имя существительное','имя прилагательное','глагол','наречие']],
 ['meaning','Что обозначает?',['предмет','признак предмета','действие предмета']],
 ['question','Падежный вопрос',spec.choices.question],
 ['initial','Начальная форма',spec.choices.initial],
 ['proper','Собственное / нарицательное',['собственное','нарицательное']],
 ['animate','Одушевлённость',['одушевлённое','неодушевлённое']],
 ['gender','Род',['мужской','женский','средний']],
 ['decl','Склонение',['1-е','2-е','3-е']],
 ['number','Число',['единственное','множественное']],
 ['case','Падеж',['именительный','родительный','дательный','винительный','творительный','предложный']],
 ['member','Член предложения',['подлежащее','сказуемое','дополнение','определение','обстоятельство']]
 ];
 return list.map(([id,name,options])=>({id,name,options,answer:spec.answer[id]}));
}

const symbolFor={'корень':'⌒','суффикс':'∧','окончание':'□'};
function expectedRanges(word){
 let n=0;return word.parts.map(([part,kind])=>{const item={start:n,end:n+part.length-1,kind};n+=part.length;return item});
}
function coverage(state,length){
 const cover=Array(length).fill(0);
 state.ranges.forEach(r=>{for(let i=r.start;i<=r.end;i++)if(i>=0&&i<length)cover[i]++});
 return cover;
}
function allMarked(word,state){
 return state.ranges.length>0&&coverage(state,word.word.length).every(v=>v===1);
}
function selectionView(state){
 if(state.start===null)return 'Нажми на первую букву морфемы.';
 if(state.end===null)return 'Теперь нажми на последнюю букву морфемы (или повторно на эту же букву).';
 return 'Теперь выбери обозначение морфемы.';
}
function renderMorphemic(){
 const w=words[currentWord],state=wordStates[currentWord],ready=allMarked(w,state)&&!!state.base.trim();
 const nav=words.map((item,i)=>'<button type="button" class="mc-wordtab '+(i===currentWord?'active':'')+'" data-mc-word="'+i+'">'+escapeHTML(item.word)+'</button>').join('');
 const activeRanges=state.ranges;
 const selectedEnd=state.end===null?state.start:state.end;
 const selectedStart=state.start===null?null:Math.min(state.start,selectedEnd);
 const selectedLast=state.start===null?null:Math.max(state.start,selectedEnd);
 const letters=[...w.word].map((letter,i)=>{
  const mark=activeRanges.find(r=>i>=r.start&&i<=r.end);
  const isSelected=state.start!==null&&i>=selectedStart&&i<=selectedLast;
  const first=mark&&i===mark.start;
  const last=mark&&i===mark.end;
  const marker=mark&&first?'<span class="mc-glyph '+mark.kind+'">'+symbolFor[mark.kind]+'</span>':'<span class="mc-glyph">&nbsp;</span>';
  return '<button type="button" class="mc-letter '+(mark?'mc-in-'+mark.kind:'')+' '+(first?'mc-first ':'')+(last?'mc-last ':'')+(isSelected?'mc-pending ':'')+'" data-mc-letter="'+i+'" aria-label="Буква '+escapeHTML(letter)+', позиция '+(i+1)+'">'+marker+'<span>'+escapeHTML(letter)+'</span></button>';
 }).join('');
 const existing=activeRanges.map((r,i)=>'<div class="mc-range-line"><span>'+escapeHTML([...w.word].slice(r.start,r.end+1).join(''))+'</span><strong>'+escapeHTML(r.kind)+'</strong><button type="button" class="btn secondary" data-remove-range="'+i+'" aria-label="Удалить выделение">Удалить</button></div>').join('');
 const choices=state.start!==null&&state.end!==null?'<div class="mc-choice-panel"><strong>Выбери знак для выделенного участка</strong><div class="mc-mark-actions">'+markers.map(([key,sym,label])=>'<button type="button" class="mc-mark-btn" data-assign-mark="'+key+'"><span class="mc-symbol">'+sym+'</span>'+label+'</button>').join('')+'</div></div>':'';
 morMount.innerHTML='<div class="mc-shell"><div class="mc-top"><strong>Разбор слова по составу</strong><span>'+nav+'</span></div><p class="mc-muted">Нажми на начало морфемы, затем на её конец и выбери знак. Если морфема состоит из одной буквы, нажми на неё два раза.</p><div class="mc-word mc-unsegmented" aria-label="Слово '+escapeHTML(w.word)+'">'+letters+'</div><p class="mc-muted" role="status">'+selectionView(state)+'</p>'+choices+(state.message?'<p class="mc-muted" role="alert">'+escapeHTML(state.message)+'</p>':'')+'<div class="mc-ranges">'+(existing||'<span class="mc-muted">Обозначения пока не добавлены.</span>')+'</div><div class="mc-base"><label>Основа слова <input id="mcBase" type="text" placeholder="Запиши основу" value="'+escapeHTML(state.base)+'" autocomplete="off" spellcheck="false"></label><span class="mc-muted">Основа — всё слово без окончания.</span></div><div class="mc-actions">'+(ready?'<button type="button" class="btn" id="mcCheck">Проверить разбор</button>':'<span class="mc-muted" id="mcProgress">Отметь все буквы и запиши основу.</span>')+'<button type="button" class="btn secondary" id="mcUndo">Отменить выбор</button><button type="button" class="btn secondary" id="mcReset">Начать заново</button></div>'+(state.checked?renderMorphemicFeedback(w,state):'')+'</div>';
 morMount.querySelectorAll('[data-mc-word]').forEach(b=>b.onclick=()=>{currentWord=+b.dataset.mcWord;renderMorphemic()});
 morMount.querySelectorAll('[data-mc-letter]').forEach(b=>b.onclick=()=>{
  const index=+b.dataset.mcLetter;
  state.checked=false;
  if(state.start===null){state.start=index;state.end=null}
  else if(state.end===null){state.end=index}
  else{state.start=index;state.end=null}
  renderMorphemic();
 });
 morMount.querySelectorAll('[data-assign-mark]').forEach(b=>b.onclick=()=>{
  const start=Math.min(state.start,state.end),end=Math.max(state.start,state.end);
  const overlaps=state.ranges.some(r=>!(end<r.start||start>r.end));
  if(overlaps){state.message='Этот участок уже занят. Удали прежнее выделение и попробуй снова.';renderMorphemic();return}
  state.ranges.push({start,end,kind:b.dataset.assignMark});
  state.ranges.sort((a,b)=>a.start-b.start);
  state.start=null;state.end=null;state.message='';state.checked=false;renderMorphemic();
 });
 morMount.querySelectorAll('[data-remove-range]').forEach(b=>b.onclick=()=>{state.ranges.splice(+b.dataset.removeRange,1);state.checked=false;renderMorphemic()});
 morMount.querySelector('#mcBase').oninput=e=>{
  state.base=e.target.value;state.checked=false;
  const nowReady=allMarked(w,state)&&!!state.base.trim();
  const button=morMount.querySelector('#mcCheck');
  if(nowReady!==!!button)renderMorphemic();
 };
 morMount.querySelector('#mcUndo').onclick=()=>{state.start=null;state.end=null;state.checked=false;renderMorphemic()};
 morMount.querySelector('#mcReset').onclick=()=>{wordStates[currentWord]={ranges:[],start:null,end:null,base:'',checked:false,message:''};renderMorphemic()};
 const check=morMount.querySelector('#mcCheck');if(check)check.onclick=()=>{state.checked=true;renderMorphemic()};
}
function renderMorphemicFeedback(word,state){
 const expected=expectedRanges(word);
 const errors=[];
 for(const r of expected){
  if(!state.ranges.some(actual=>actual.start===r.start&&actual.end===r.end&&actual.kind===r.kind))errors.push('границы или обозначение морфемы');
 }
 if(state.ranges.length!==expected.length)errors.push('количество выделенных морфем');
 if(state.base.replace(/\s/g,'').toLowerCase()!==word.base)errors.push('основа слова');
 return '<div class="mc-feedback"><strong>'+(errors.length?'Проверь разбор.':'Верно!')+'</strong><span>'+(errors.length?'Есть неточности: '+[...new Set(errors)].join(', ')+'.':'Все морфемы и основа выделены правильно.')+'</span></div>';
}
function renderNoun(){
 const spec=nounTemplates[nounIndex],s=nounStates[nounIndex],values=s.values,fields=nounFields(),complete=fields.every(f=>!!values[f.id]);
 const groups=[['Часть речи и начальная форма',fields.slice(0,4)],['Постоянные признаки',fields.slice(4,8)],['Непостоянные признаки и роль в предложении',fields.slice(8)]];
 const nav=nounTemplates.map((n,i)=>'<button type="button" class="mc-wordtab '+(nounIndex===i?'active':'')+'" data-noun="'+i+'">'+escapeHTML(n.title)+'</button>').join('');
 const sections=groups.map(([title,list])=>'<div class="nc-block"><h4>'+title+'</h4><div class="nc-fields">'+list.map(f=>'<label class="nc-field"><span class="nc-name">'+f.name+'</span><select data-nc-field="'+f.id+'"><option value="">— выбери —</option>'+f.options.map(opt=>'<option value="'+escapeHTML(opt)+'" '+(values[f.id]===opt?'selected':'')+'>'+escapeHTML(opt)+'</option>').join('')+'</select></label>').join('')+'</div></div>').join('');
 nounMount.innerHTML='<div class="nc-shell"><div class="nc-head"><strong>Морфологический разбор</strong><span>'+nav+'</span></div><p class="mc-muted">Предложение: '+escapeHTML(spec.context)+'</p><p class="mc-muted">Разбери существительное «'+escapeHTML(spec.title)+'» по плану 5 класса.</p>'+sections+'<div class="mc-actions">'+(complete?'<button type="button" class="btn" id="ncCheck">Проверить морфологический разбор</button>':'<span class="mc-muted" id="ncProgress">Заполнено '+Object.values(values).filter(Boolean).length+' из '+fields.length+' признаков.</span>')+'<button type="button" class="btn secondary" id="ncReset">Начать заново</button></div>'+(s.checked?renderNounFeedback():'')+'</div>';
 nounMount.querySelectorAll('[data-noun]').forEach(e=>e.onclick=()=>{nounIndex=Number(e.dataset.noun);renderNoun()});
 nounMount.querySelectorAll('[data-nc-field]').forEach(e=>e.onchange=()=>{s.values[e.dataset.ncField]=e.value;s.checked=false;renderNoun()});
 nounMount.querySelector('#ncReset').onclick=()=>{s.values={};s.checked=false;renderNoun()};
 const check=nounMount.querySelector('#ncCheck');if(check)check.onclick=()=>{s.checked=true;renderNoun()};
}
function renderNounFeedback(){
 const s=nounStates[nounIndex],spec=nounTemplates[nounIndex];
 const wrong=nounFields().filter(f=>s.values[f.id]!==f.answer).map(f=>f.name);
 return '<div class="mc-feedback"><strong>'+(wrong.length?'Проверь некоторые признаки.':'Все признаки указаны верно!')+'</strong><span>'+(wrong.length?'Проверь: '+wrong.join(', ')+'.':'Все признаки существительного «'+escapeHTML(spec.title)+'» определены правильно.')+'</span></div>';
}
renderMorphemic();renderNoun();
})();