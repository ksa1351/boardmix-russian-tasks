(()=>{
'use strict';
const root=document.getElementById('phoneticConstructor');if(!root)return;
const V=(sound,kind,other)=>({sound,kind,...other});
const C=(sound,voice,hard)=>V(sound,'согласный',{voice,hard});
const G=(sound,stress)=>V(sound,'гласный',{stress});
const N=()=>V('нет звука','не обозначает звука',{});
const db=[
 {word:'маяк',accent:2,syllables:['ма','як'],units:[['м',[C('м','звонкий непарный','твёрдый парный')]],['а',[G('а','безударный')]],['я',[C('й’','звонкий непарный','мягкий непарный'),G('а','ударный')]],['к',[C('к','глухой парный','твёрдый парный')]]],note:'Я после гласного обозначает два звука.'},
 {word:'вьюга',accent:0,syllables:['вью','га'],units:[['в',[C('в’','звонкий парный','мягкий парный')]],['ь',[N()]],['ю',[C('й’','звонкий непарный','мягкий непарный'),G('у','ударный')]],['г',[C('г','звонкий парный','твёрдый парный')]],['а',[G('а','безударный')]]],note:'Разделительный ь не даёт звука; ю после него обозначает два звука.'},
 {word:'подъём',accent:1,syllables:['под','ъём'],units:[['п',[C('п','глухой парный','твёрдый парный')]],['о',[G('а','безударный')]],['д',[C('д','звонкий парный','твёрдый парный')]],['ъ',[N()]],['ё',[C('й’','звонкий непарный','мягкий непарный'),G('о','ударный')]],['м',[C('м','звонкий непарный','твёрдый парный')]]],note:'Ъ не обозначает звука; ё после него — два звука. Безударное о произносится приближённо как [а].'},
 {word:'просьба',accent:0,syllables:['прось','ба'],units:[['п',[C('п','глухой парный','твёрдый парный')]],['р',[C('р','звонкий непарный','твёрдый парный')]],['о',[G('о','ударный')]],['с',[C('з’','звонкий парный','мягкий парный')]],['ь',[N()]],['б',[C('б','звонкий парный','твёрдый парный')]],['а',[G('а','безударный')]]],note:'В слове про́сьба согласный [с’] озвончается перед [б] и произносится как [з’]. Ь отдельного звука не даёт.'},
 {word:'сердце',accent:0,syllables:['серд','це'],units:[['с',[C('с’','глухой парный','мягкий парный')]],['е',[G('э','ударный')]],['р',[C('р','звонкий непарный','твёрдый парный')]],['д',[N()]],['ц',[C('ц','глухой непарный','твёрдый непарный')]],['е',[G('э','безударный')]]],note:'Буква д не произносится. [ц] всегда твёрдый. Для безударного е используется упрощённая школьная запись [э].'}
];
const SOUND_DISTRACT={
 'м':['м’','н','б','п'],'а':['о','э','ы','у'],'й’':['и','л’','н’','р’'],
 'к':['г','к’','х','т'],'в’':['в','ф’','м’','н’'],'у':['ю','о','а','ы'],
 'г':['к','г’','д','х'],'п':['б','п’','т','к'],'д':['т','д’','г','б'],
 'о':['а','у','э','ё'],'р':['р’','л','н','м'],'з’':['с’','з','с','ж'],
 'б':['п','б’','д','в'],'с’':['с','з’','ш','щ’'],'э':['е','а','о','и'],
 'ц':['ч’','с','т','з'],'нет звука':['д','т','й’','ь']
};
const chars={
 kind:['гласный','согласный','не обозначает звука'],
 stress:['ударный','безударный'],
 voice:['звонкий парный','звонкий непарный','глухой парный','глухой непарный'],
 hard:['твёрдый парный','твёрдый непарный','мягкий парный','мягкий непарный']
};
const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=arr=>{let a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const choose=(expected)=>shuffle([expected,...(SOUND_DISTRACT[expected]||['а','о','к','т']).filter(v=>v!==expected).slice(0,4)]);
const states=db.map(d=>({step:0,accent:'',letters:d.units.map(([letter,sounds])=>({letterIndex:null,phonemes:sounds.map(()=>({sound:'',kind:'',stress:'',voice:'',hard:''}))})),counts:{letters:'',sounds:''},checked:false,bank:shuffle(d.units.map((x,i)=>({id:i,value:x[0]}))),choices:d.units.map(([l,sounds])=>sounds.map(v=>choose(v.sound)))}));
let active=0;
const data=()=>db[active],state=()=>states[active],lastStep=()=>data().units.length+1;
function stepReady(step){
 const s=state(),d=data();
 if(step===0)return s.accent!=='';
 if(step===lastStep())return s.counts.letters!==''&&s.counts.sounds!=='';
 const p=s.letters[step-1];
 return p.letterIndex!==null&&p.phonemes.every(v=>v.sound!==''&&v.kind!==''&&(v.kind==='гласный'?v.stress!=='':v.kind==='согласный'?v.voice!==''&&v.hard!=='':true));
}
function allReady(){return Array.from({length:lastStep()+1},(_,i)=>stepReady(i)).every(Boolean)}
function lettersUsed(step){return state().letters.map((x,i)=>i!==step&&x.letterIndex!==null?x.letterIndex:null).filter(x=>x!==null)}
function countSounds(d){return d.units.reduce((n,u)=>n+u[1].filter(p=>p.kind!=='не обозначает звука').length,0)}
function status(){const count=Array.from({length:lastStep()+1},(_,i)=>stepReady(i)).filter(Boolean).length;return 'Заполнено этапов: '+count+' из '+(lastStep()+1)}
function button(val,current,attr,idx){return '<button type="button" class="ph-option '+(current===val?'selected':'')+'" '+attr+'="'+safe(val)+'" data-idx="'+idx+'">'+safe(val)+'</button>'}
function choices(title,opts,current,attr,idx){return '<div class="ph-field"><span class="ph-label">'+title+'</span><div class="ph-choices">'+opts.map(x=>button(x,current,attr,idx)).join('')+'</div></div>'}
function lineTrans(){return '['+state().letters.flatMap(p=>p.phonemes.map(ph=>ph.sound&&ph.sound!=='нет звука'?ph.sound:ph.sound==='нет звука'?'':'□')).join('')+']'}
function paint(){
 const d=data(),s=state(),last=lastStep(),step=s.step;
 let html='<div class="ph-wrap"><div class="ph-header"><strong>Фонетический конструктор</strong><span>Слово '+(active+1)+' из '+db.length+'</span></div>';
 html+='<div class="ph-steps ph-words">'+db.map((w,i)=>'<button type="button" class="ph-step '+(active===i?'now':'')+'" data-word="'+i+'">'+safe(w.word)+'</button>').join('')+'</div>';
 html+='<div class="ph-steps">'+['Ударение',...d.units.map((_,i)=>'Буква '+(i+1)),'Итог'].map((x,i)=>'<button type="button" class="ph-step '+(step===i?'now':stepReady(i)?'done':'')+'" data-step="'+i+'">'+x+'</button>').join('')+'</div>';
 html+='<div class="ph-trans"><strong>'+safe(d.word)+'</strong> · '+status()+'</div>';
 if(step===0){html+='<h4>1. Поставь ударение</h4>'+choices('Выбери ударный слог',d.syllables,s.accent,'data-accent',0)}
 else if(step===last){
 html+='<h4>3. Подведи итог</h4><div class="ph-trans"><strong>Собранная транскрипция: </strong>'+safe(lineTrans())+'</div>';
 html+='<div class="ph-count"><label>Букв <input type="number" min="1" max="20" inputmode="numeric" id="phLetters" value="'+safe(s.counts.letters)+'"></label><label>Звуков <input type="number" min="1" max="20" inputmode="numeric" id="phSounds" value="'+safe(s.counts.sounds)+'"></label></div>';
 }else{
  const i=step-1,p=s.letters[i],unit=d.units[i],used=lettersUsed(i);
  html+='<h4>2. Буква '+step+' из '+d.units.length+'</h4><p class="ph-help">Выбери следующую букву, а затем разложи её на '+(unit[1].length>1?'отдельные звуки.':'звук или отметь, что звука нет.')+'</p>';
  const unused=s.bank.filter(b=>!used.includes(b.id)||b.id===p.letterIndex);
  html+=choices('Выбери букву',unused.map(x=>x.value),p.letterIndex===null?'':s.bank.find(x=>x.id===p.letterIndex)?.value||'','data-letter',i);
  p.phonemes.forEach((ph,j)=>{
   html+='<div class="ph-sound"><div class="ph-sound-title">'+(unit[1].length>1?'Звук '+(j+1)+' из '+unit[1].length:'Звук этой буквы')+'</div>';
   html+=choices('Какой звук произносится?',s.choices[i][j],ph.sound,'data-sound',j);
   html+=choices('Тип звука',chars.kind,ph.kind,'data-kind',j);
   if(ph.kind==='гласный')html+=choices('Ударность',chars.stress,ph.stress,'data-stress',j);
   if(ph.kind==='согласный'){html+=choices('Звонкость и парность',chars.voice,ph.voice,'data-voice',j);html+=choices('Твёрдость и парность',chars.hard,ph.hard,'data-hard',j)}
   html+='</div>';
  });
  html+='<div class="ph-preview"><strong>Собрано:</strong> '+s.letters.slice(0,i+1).map((v,k)=>v.letterIndex===null?'':safe(d.units[k][0])+' → '+v.phonemes.map(x=>x.sound==='нет звука'?'∅':'['+safe(x.sound||'…')+']').join(' ')).filter(Boolean).join(' · ')+'</div>';
 }
 html+='<div class="ph-controls"><button type="button" class="btn secondary" id="phPrev" '+(step===0?'disabled':'')+'>← Назад</button><button type="button" class="btn" id="phNext" '+(step===last?'disabled':'')+'>Следующий этап →</button><button type="button" class="btn secondary" id="phReset">Начать заново</button></div>';
 if(allReady())html+='<button type="button" class="btn" id="phCheck">Проверить фонетический разбор</button>';
 if(s.checked){
  const problems=[];
  if(s.accent!==d.syllables[d.accent])problems.push('ударение');
  s.letters.forEach((p,i)=>{if(p.letterIndex!==i)problems.push('буква '+(i+1));p.phonemes.forEach((ph,j)=>{const ref=d.units[i][1][j];for(const field of ['sound','kind',...(ref.kind==='гласный'?['stress']:ref.kind==='согласный'?['voice','hard']:[])])if(ph[field]!==ref[field]){problems.push('звук '+(i+1)+'.'+(j+1));break}})});
  if(s.counts.letters!==String(d.units.length))problems.push('количество букв');
  if(s.counts.sounds!==String(countSounds(d)))problems.push('количество звуков');
  html+='<div class="ph-feedback"><strong>'+(problems.length?'Нужно уточнить некоторые элементы.':'Верно! Разбор завершён.')+'</strong><p>'+(problems.length?'Проверь: '+[...new Set(problems)].join(', ')+'.':d.word+': '+d.units.length+' букв, '+countSounds(d)+' звуков. '+d.note)+'</p></div>';
 }
 html+='</div>';root.innerHTML=html;events();
}
function events(){
 $$('[data-word]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.word);paint()});
 $$('[data-step]').forEach(b=>b.onclick=()=>{state().step=Number(b.dataset.step);state().checked=false;paint()});
 $$('[data-accent]').forEach(b=>b.onclick=()=>{state().accent=b.dataset.accent;state().checked=false;paint()});
 $$('[data-letter]').forEach(b=>b.onclick=()=>{
 const s=state(),idx=s.step-1,value=b.dataset.letter,used=lettersUsed(idx),candidate=s.bank.find(x=>x.value===value&&!used.includes(x.id));
 s.letters[idx].letterIndex=candidate?.id??s.letters[idx].letterIndex;s.checked=false;paint()
 });
 const fields=[['data-sound','sound'],['data-kind','kind'],['data-stress','stress'],['data-voice','voice'],['data-hard','hard']];
 for(const [selector,key] of fields)$$('['+selector+']').forEach(b=>b.onclick=()=>{const s=state(),ph=s.letters[s.step-1].phonemes[Number(b.dataset.idx)];ph[key]=b.getAttribute(selector);s.checked=false;paint()});
 $('#phPrev').onclick=()=>{state().step=Math.max(0,state().step-1);paint()};
 $('#phNext').onclick=()=>{state().step=Math.min(lastStep(),state().step+1);paint()};
 $('#phReset').onclick=()=>{const s=state();s.step=0;s.accent='';s.counts={letters:'',sounds:''};s.checked=false;s.letters.forEach(x=>{x.letterIndex=null;x.phonemes.forEach(p=>Object.keys(p).forEach(k=>p[k]=''))});paint()};
 if($('#phLetters'))$('#phLetters').oninput=e=>{state().counts.letters=e.target.value;state().checked=false;footer()};
 if($('#phSounds'))$('#phSounds').oninput=e=>{state().counts.sounds=e.target.value;state().checked=false;footer()};
 if($('#phCheck'))$('#phCheck').onclick=()=>{state().checked=true;paint()};
}
function footer(){
 const old=$('#phCheck'),ready=allReady();
 if(ready&&!old){const b=document.createElement('button');b.className='btn';b.id='phCheck';b.type='button';b.textContent='Проверить фонетический разбор';b.onclick=()=>{state().checked=true;paint()};$('.ph-wrap').appendChild(b)}
 if(!ready&&old)old.remove();
 $('.ph-trans').innerHTML='<strong>'+safe(data().word)+'</strong> · '+status();
}
paint();
})();