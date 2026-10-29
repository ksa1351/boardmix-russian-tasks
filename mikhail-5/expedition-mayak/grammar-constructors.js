(()=>{
'use strict';
const escapeHTML=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const morMount=document.getElementById('morphemicConstructor');
const nounMount=document.getElementById('nounConstructor');
if(!morMount||!nounMount)return;
const words=[
 {word:'лесной',parts:[['лес','корень'],['н','суффикс'],['ой','окончание']],base:'лесн'},
 {word:'тропинка',parts:[['троп','корень'],['инк','суффикс'],['а','окончание']],base:'тропинк'}
];
const markers=[['корень','⌒','Корень'],['суффикс','∧','Суффикс'],['окончание','□','Окончание']];
let currentWord=0;
const wordStates=words.map(w=>({marks:w.parts.map(()=>''),base:'',checked:false}));
const nounFields=[
 {id:'part',name:'Часть речи',options:['имя существительное','имя прилагательное','глагол','наречие'],answer:'имя существительное'},
 {id:'meaning',name:'Что обозначает?',options:['предмет','признак предмета','действие предмета'],answer:'предмет'},
 {id:'question',name:'Вопрос к форме «в долине»',options:['в чём?','где?','какая?','чем?'],answer:'в чём?',note:'Это падежный вопрос. Вопрос «где?» помогает определить роль сочетания в предложении.'},
 {id:'initial',name:'Начальная форма',options:['долина','долине','долину','долины'],answer:'долина'},
 {id:'proper',name:'Собственное или нарицательное?',options:['собственное','нарицательное'],answer:'нарицательное'},
 {id:'animate',name:'Одушевлённость',options:['одушевлённое','неодушевлённое'],answer:'неодушевлённое'},
 {id:'gender',name:'Род',options:['мужской','женский','средний'],answer:'женский'},
 {id:'decl',name:'Склонение',options:['1-е','2-е','3-е'],answer:'1-е'},
 {id:'number',name:'Число',options:['единственное','множественное'],answer:'единственное'},
 {id:'case',name:'Падеж',options:['именительный','родительный','дательный','винительный','творительный','предложный'],answer:'предложный'},
 {id:'member',name:'Член предложения',options:['подлежащее','сказуемое','дополнение','определение','обстоятельство'],answer:'обстоятельство'}
];
const nounState={values:{},checked:false};
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
 const values=nounState.values,complete=nounFields.every(f=>!!values[f.id]);
 const fields=nounFields.map((f,i)=>{
  const choices='<option value="">— выбери —</option>'+f.options.map(opt=>'<option value="'+escapeHTML(opt)+'" '+(values[f.id]===opt?'selected':'')+'>'+escapeHTML(opt)+'</option>').join('');
  return '<label class="nc-field"><span class="nc-num">'+(i+1)+'.</span><span class="nc-name">'+f.name+'</span><select data-nc-field="'+f.id+'">'+choices+'</select>'+(f.note?'<small>'+f.note+'</small>':'')+'</label>';
 }).join('');
 nounMount.innerHTML='<div class="nc-shell"><div class="nc-head"><strong>В долине</strong><span>Имя существительное · разбор по плану</span></div><div class="nc-block"><h4>Часть речи и начальная форма</h4><div class="nc-fields">'+fields.slice(0,fields.indexOf('</label>',fields.indexOf('data-nc-field="initial"'))+8)+'</div></div><div class="nc-fields" id="ncFields"></div><div class="mc-actions">'+(complete?'<button type="button" class="btn" id="ncCheck">Проверить морфологический разбор</button>':'<span class="mc-muted" id="ncProgress">Заполнено '+Object.values(values).filter(Boolean).length+' из '+nounFields.length+' признаков.</span>')+'<button type="button" class="btn secondary" id="ncReset">Начать заново</button></div>'+(nounState.checked?renderNounFeedback():'')+'</div>';
 // Rebuild grouped fields as structured DOM for reliable editing.
 const groupDefs=[['Часть речи и начальная форма',nounFields.slice(0,4)],['Постоянные признаки',nounFields.slice(4,8)],['Непостоянные признаки и роль в предложении',nounFields.slice(8)]];
 const sections=groupDefs.map(([title,group])=>'<div class="nc-block"><h4>'+title+'</h4><div class="nc-fields">'+group.map(f=>'<label class="nc-field"><span class="nc-name">'+f.name+'</span><select data-nc-field="'+f.id+'"><option value="">— выбери —</option>'+f.options.map(opt=>'<option value="'+escapeHTML(opt)+'" '+(values[f.id]===opt?'selected':'')+'>'+escapeHTML(opt)+'</option>').join('')+'</select>'+(f.note?'<small>'+f.note+'</small>':'')+'</label>').join('')+'</div></div>').join('');
 const shell=nounMount.querySelector('.nc-shell');const first=shell.querySelector('.nc-block');first.remove();shell.querySelector('#ncFields').outerHTML=sections;
 nounMount.querySelectorAll('[data-nc-field]').forEach(e=>e.onchange=()=>{nounState.values[e.dataset.ncField]=e.value;nounState.checked=false;renderNoun()});
 nounMount.querySelector('#ncReset').onclick=()=>{nounState.values={};nounState.checked=false;renderNoun()};
 const check=nounMount.querySelector('#ncCheck');if(check)check.onclick=()=>{nounState.checked=true;renderNoun()};
}
function renderNounFeedback(){
 const wrong=nounFields.filter(f=>nounState.values[f.id]!==f.answer).map(f=>f.name);
 return '<div class="mc-feedback"><strong>'+(wrong.length?'Проверь некоторые признаки.':'Все признаки указаны верно!')+'</strong><span>'+(wrong.length?'Проверь: '+wrong.join(', ')+'.':'«В долине»: существительное, нарицательное, неодушевлённое, ж. р., 1-е скл., ед. ч., П. п.; в предложении — обстоятельство места.')+'</span></div>';
}
renderMorphemic();renderNoun();
})();