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
const wordStates=words.map(w=>({marks:w.parts.map(()=>''),base:'',checked:false}));
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

function renderMorphemic(){
 const w=words[currentWord],state=wordStates[currentWord],ready=state.marks.every(Boolean)&&!!state.base;
 const nav=words.map((item,i)=>'<button type="button" class="mc-wordtab '+(i===currentWord?'active':'')+'" data-mc-word="'+i+'">'+escapeHTML(item.word)+'</button>').join('');
 const bar=markers.map(([key,sym,label])=>'<span class="mc-legend-item"><b class="mc-symbol '+key+'">'+sym+'</b> '+label+'</span>').join('');
 const parts=w.parts.map(([segment],i)=>'<div class="mc-segment"><span class="mc-selected-mark '+state.marks[i]+'">'+(state.marks[i]?' '+({'корень':'⌒','суффикс':'∧','окончание':'□'}[state.marks[i]]):'···')+'</span><button type="button" class="mc-piece" data-mc-part="'+i+'">'+escapeHTML(segment)+'</button><div class="mc-piece-choices">'+markers.map(([key,sym,label])=>'<button type="button" class="mc-mini '+(state.marks[i]===key?'active':'')+'" data-mc-mark="'+key+'" data-mc-at="'+i+'" title="'+label+'">'+sym+'</button>').join('')+'</div></div>').join('');
 morMount.innerHTML='<div class="mc-shell"><div class="mc-top"><strong>Собери слово по составу</strong><span>'+nav+'</span></div><p class="mc-muted">Выбери обозначение для каждой части слова. Затем составь основу без окончания.</p><div class="mc-legend">'+bar+'</div><div class="mc-word">'+parts+'</div><div class="mc-base"><label>Основа слова <input id="mcBase" type="text" placeholder="Запиши основу" value="'+escapeHTML(state.base)+'" autocomplete="off" spellcheck="false"></label><span class="mc-muted">Без окончания</span></div><div class="mc-actions">'+(ready?'<button class="btn" id="mcCheck">Проверить разбор</button>':'<span id="mcProgress" class="mc-muted">Отметь все части и запиши основу.</span>')+'<button type="button" class="btn secondary" id="mcReset">Начать заново</button></div>'+(state.checked?renderMorphemicFeedback(w,state):'')+'</div>';
 morMount.querySelectorAll('[data-mc-word]').forEach(b=>b.onclick=()=>{currentWord=Number(b.dataset.mcWord);renderMorphemic()});
 morMount.querySelectorAll('[data-mc-mark]').forEach(b=>b.onclick=()=>{const k=+b.dataset.mcAt;state.marks[k]=b.dataset.mcMark;state.checked=false;renderMorphemic()});
 morMount.querySelector('#mcBase').oninput=e=>{state.base=e.target.value;state.checked=false;const readyNow=state.marks.every(Boolean)&&!!state.base.trim();if(readyNow&&!morMount.querySelector('#mcCheck'))renderMorphemic();else if(!readyNow&&morMount.querySelector('#mcCheck'))renderMorphemic()};
 morMount.querySelector('#mcReset').onclick=()=>{state.marks=state.marks.map(()=>'');state.base='';state.checked=false;renderMorphemic()};
 const check=morMount.querySelector('#mcCheck');if(check)check.onclick=()=>{state.checked=true;renderMorphemic()};
}
function renderMorphemicFeedback(w,s){
 const errors=w.parts.map((part,i)=>s.marks[i]===part[1]?null:'часть '+(i+1)).filter(Boolean);
 if(s.base.replace(/\s/g,'').toLowerCase()!==w.base)errors.push('основа');
 return '<div class="mc-feedback"><strong>'+(errors.length?'Есть неточности.':'Верно!')+'</strong><span>'+(errors.length?'Проверь: '+errors.join(', ')+'.':'Основа: '+w.base+'. Все части слова определены правильно.')+'</span></div>';
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