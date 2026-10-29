(()=>{
'use strict';
const mount=document.getElementById('phoneticConstructor');
if(!mount)return;
const word='маяк';
const letters=['м','а','я','к'];
const reference=[
  {letter:'м',sounds:[{sound:'м',kind:'согласный',voice:'звонкий непарный',hard:'твёрдый парный'}]},
  {letter:'а',sounds:[{sound:'а',kind:'гласный',stress:'безударный'}]},
  {letter:'я',sounds:[{sound:'й’',kind:'согласный',voice:'звонкий непарный',hard:'мягкий непарный'},{sound:'а',kind:'гласный',stress:'ударный'}]},
  {letter:'к',sounds:[{sound:'к',kind:'согласный',voice:'глухой парный',hard:'твёрдый парный'}]}
];
const options={
 sound:[
 ['м','м’','н','б','п'],['а','о','э','ы','у'],
 ['й’','и','н’','л’','р’'],['а','о','я','э','у'],
 ['к','г','к’','х','т']
 ],
 kind:['гласный','согласный'],
 stress:['ударный','безударный'],
 voice:['звонкий парный','звонкий непарный','глухой парный','глухой непарный'],
 hard:['твёрдый парный','твёрдый непарный','мягкий парный','мягкий непарный']
};
let stage=0,stressed='',letterBank=['я','м','к','а'],checked=false;
const picks=reference.map(r=>({letter:'',sounds:r.sounds.map(()=>({sound:'',kind:'',stress:'',voice:'',hard:''}))}));
let counts={letters:'',sounds:''};
const $=q=>mount.querySelector(q);
const safe=x=>String(x).replace(/[&<>"']/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[t]));
const shuffle=a=>{const z=[...a];for(let i=z.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[z[i],z[j]]=[z[j],z[i]]}return z};
const soundOptions=options.sound.map(shuffle);
function buttonChoice(value,active,attr,id){
return '<button type="button" class="ph-option '+(active===value?'selected':'')+'" '+attr+'="'+safe(value)+'" data-idx="'+id+'">'+safe(value)+'</button>';
}
function groupChoices(label,values,current,attr,idx){return '<div class="ph-field"><span class="ph-label">'+label+'</span><div class="ph-choices">'+values.map(v=>buttonChoice(v,current,attr,idx)).join('')+'</div></div>'}
function readyStep(i){
 if(i===0)return !!stressed;
 if(i===5)return counts.letters!==''&&counts.sounds!=='';
 const p=picks[i-1];return !!p.letter&&p.sounds.every(s=>s.sound&&s.kind&&(s.kind==='гласный'?s.stress:s.voice&&s.hard));
}
function fullyReady(){return [0,1,2,3,4,5].every(readyStep)}
function transcribed(){return '['+picks.flatMap(p=>p.sounds.map(s=>s.sound||'□')).join('')+']'}
function statusLine(){const ready=[0,1,2,3,4,5].filter(readyStep).length;return 'Заполнено этапов: '+ready+' из 6.'}
function make(){
 let html='<div class="ph-wrap"><div class="ph-header"><strong>Фонетический конструктор</strong><span>Этап '+(stage+1)+' из 6</span></div>';
 html+='<div class="ph-steps">'+['Ударение','Буква 1','Буква 2','Буква 3','Буква 4','Итог'].map((v,i)=>'<button type="button" class="ph-step '+(stage===i?'now':readyStep(i)?'done':'')+'" data-goto="'+i+'">'+v+'</button>').join('')+'</div>';
 if(stage===0){html+='<h4>1. Поставь ударение</h4><p class="ph-help">Нажми на ударный слог.</p>'+groupChoices('На какой слог падает ударение?',['ма','як'],stressed,'data-stress',0)}
 if(stage>=1&&stage<=4){
  const i=stage-1,p=picks[i],r=reference[i];
  const used=picks.flatMap((x,j)=>j!==i&&x.letter?[x.letter]:[]);
  const possible=letterBank.filter(l=>!used.includes(l)||p.letter===l);
  html+='<h4>2. Буква '+stage+' из 4</h4>';
  html+='<p class="ph-help">Выбери следующую букву слова. Затем укажи '+(r.sounds.length===2?'два звука по отдельности и охарактеризуй каждый.':'звук и его признаки.')+'</p>';
  html+=groupChoices('Буквы',possible,p.letter,'data-letter',i);
  p.sounds.forEach((snd,j)=>{
    const n=reference.slice(0,i).reduce((sum,x)=>sum+x.sounds.length,0)+j;
    html+='<div class="ph-sound"><div class="ph-sound-title">Звук '+(j+1)+(r.sounds.length>1?' из '+r.sounds.length:'')+'</div>';
    html+=groupChoices('Выбери звук',soundOptions[n],snd.sound,'data-sound',j);
    html+=groupChoices('Гласный или согласный?',options.kind,snd.kind,'data-kind',j);
    if(snd.kind==='гласный')html+=groupChoices('Ударный или безударный?',options.stress,snd.stress,'data-stress-kind',j);
    if(snd.kind==='согласный'){
      html+=groupChoices('По звонкости/глухости',options.voice,snd.voice,'data-voice',j);
      html+=groupChoices('По твёрдости/мягкости',options.hard,snd.hard,'data-hard',j);
    }
    html+='</div>';
  });
  html+='<div class="ph-preview"><strong>Уже заполнено:</strong> '+picks.slice(0,i+1).filter(q=>q.letter).map(q=>safe(q.letter)+' → '+q.sounds.map(x=>'['+safe(x.sound||'…')+']').join(' ')).join(' · ')+'</div>';
 }
 if(stage===5){html+='<h4>3. Подведи итог</h4><p class="ph-help">Сверь количество букв и звуков. Скобки транскрипции добавляются автоматически.</p><div class="ph-trans"><strong>Транскрипция:</strong> '+safe(transcribed())+'</div><div class="ph-count"><label>Количество букв <input id="phLetters" inputmode="numeric" type="number" min="1" max="20" value="'+safe(counts.letters)+'"></label><label>Количество звуков <input id="phSounds" inputmode="numeric" type="number" min="1" max="20" value="'+safe(counts.sounds)+'"></label></div>'}
 html+='<div class="ph-controls"><button type="button" class="btn secondary" id="phPrev" '+(stage===0?'disabled':'')+'>← Назад</button><button type="button" class="btn" id="phNext" '+(stage===5?'disabled':'')+'>Следующий этап →</button><button type="button" class="btn secondary" id="phReset">Начать заново</button></div>';
 html+='<p class="ph-status">'+statusLine()+'</p>';
 if(fullyReady())html+='<button type="button" class="btn" id="phCheck">Проверить фонетический разбор</button>';
 if(checked){const details=[];if(stressed!=='як')details.push('ударение');picks.forEach((p,i)=>{if(p.letter!==letters[i])details.push('буква '+(i+1));p.sounds.forEach((n,j)=>{const expected=reference[i].sounds[j];for(const k of ['sound','kind',...(expected.kind==='гласный'?['stress']:['voice','hard'])])if(n[k]!==expected[k]){details.push('характеристика звука '+(i+1)+'.'+(j+1));break}})});if(counts.letters!=='4')details.push('число букв');if(counts.sounds!=='5')details.push('число звуков');html+='<div class="ph-feedback"><strong>'+(details.length?'Есть неточности — проверь разбор.':'Отлично! Разбор выполнен правильно.')+'</strong><p>'+(details.length?'Проверь: '+[...new Set(details)].join(', ')+'.':'4 буквы, 5 звуков. Буква я обозначает два звука.')+'</p></div>';}
 html+='</div>';mount.innerHTML=html;wire();
}
function wire(){
 mount.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{stage=Number(b.dataset.goto);checked=false;make()});
 mount.querySelectorAll('[data-stress]').forEach(b=>b.onclick=()=>{stressed=b.dataset.stress;checked=false;make()});
 mount.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{picks[stage-1].letter=b.dataset.letter;checked=false;make()});
 for(const [attr,key] of [['data-sound','sound'],['data-kind','kind'],['data-stress-kind','stress'],['data-voice','voice'],['data-hard','hard']]){
  mount.querySelectorAll('['+attr+']').forEach(b=>b.onclick=()=>{const p=picks[stage-1].sounds[+b.dataset.idx];p[key]=b.getAttribute(attr);checked=false;make()});
 }
 if($('#phLetters'))$('#phLetters').oninput=e=>{counts.letters=e.target.value;checked=false;updateFooter()};
 if($('#phSounds'))$('#phSounds').oninput=e=>{counts.sounds=e.target.value;checked=false;updateFooter()};
 $('#phPrev').onclick=()=>{stage=Math.max(0,stage-1);checked=false;make()};
 $('#phNext').onclick=()=>{stage=Math.min(5,stage+1);checked=false;make()};
 $('#phReset').onclick=()=>{stage=0;stressed='';counts={letters:'',sounds:''};picks.forEach(p=>{p.letter='';p.sounds.forEach(x=>Object.keys(x).forEach(k=>x[k]=''))});checked=false;letterBank=shuffle(letters);soundOptions.forEach((z,i)=>soundOptions[i]=shuffle(z));make()};
 if($('#phCheck'))$('#phCheck').onclick=()=>{checked=true;make()};
}
function updateFooter(){const v=$('.ph-status');if(v)v.textContent=statusLine();const btn=$('#phCheck');if(fullyReady()&&!btn){const b=document.createElement('button');b.type='button';b.className='btn';b.id='phCheck';b.textContent='Проверить фонетический разбор';b.onclick=()=>{checked=true;make()};$('.ph-wrap').append(b)}else if(!fullyReady()&&btn)btn.remove();}
letterBank=shuffle(letters);make();
})();