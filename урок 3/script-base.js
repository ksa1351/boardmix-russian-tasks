(() => {
  const BASE_W=1280, BASE_H=720;
  const app=document.getElementById('app');
  const wrap=document.getElementById('scaled-wrap');
  function fit(){
    const s=Math.min(window.innerWidth/BASE_W,window.innerHeight/BASE_H,1);
    wrap.style.width=(BASE_W*s)+'px'; wrap.style.height=(BASE_H*s)+'px';
    app.style.transform=`scale(${s})`;
  }
  window.addEventListener('resize',fit); fit();

  const screens=[...document.querySelectorAll('.screen')];
  const titles=screens.map(s=>s.dataset.title);
  const completed=Array(screens.length).fill(false);
  let current=0, selectedToken=null;
  const backBtn=document.getElementById('backBtn');
  const nextBtn=document.getElementById('nextBtn');
  const checkBtn=document.getElementById('checkBtn');
  const title=document.getElementById('screenTitle');
  const progressText=document.getElementById('progressText');
  const progressFill=document.getElementById('progressFill');

  const steps={3:1,4:1,5:1,6:1,7:1,9:1};

  function showStatus(ws,msg,type='info'){
    const st=ws.querySelector('[data-status]');
    st.textContent=msg; st.className='status '+type; st.classList.remove('hidden');
  }
  function clearStatus(ws){const st=ws.querySelector('[data-status]'); if(st) st.classList.add('hidden')}

  function gotoScreen(i){
    current=Math.max(0,Math.min(screens.length-1,i));
    screens.forEach((s,idx)=>s.classList.toggle('active',idx===current));
    title.textContent=titles[current];
    progressText.textContent=`${current+1} / ${screens.length}`;
    progressFill.style.width=`${(current+1)/screens.length*100}%`;
    backBtn.disabled=current===0;
    nextBtn.disabled=!completed[current];
    checkBtn.textContent=(current===9 && completed[9])?'Открыть памятку':'Проверить';
    selectedToken?.classList.remove('selected'); selectedToken=null;
  }

  backBtn.addEventListener('click',()=>gotoScreen(current-1));
  nextBtn.addEventListener('click',()=>gotoScreen(current+1));

  function choose(container,button){
    [...container.querySelectorAll('button')].forEach(b=>b.classList.remove('selected','correct','incorrect'));
    button.classList.add('selected'); container.dataset.selected=button.dataset.value ?? button.textContent.trim();
  }
  document.addEventListener('click',e=>{
    if(e.target.matches('.choice')) choose(e.target.closest('.choice-group'),e.target);
    if(e.target.closest('.mini-choice') && e.target.tagName==='BUTTON') choose(e.target.closest('.mini-choice'),e.target);
    if(e.target.closest('.class-card') && e.target.tagName==='BUTTON') choose(e.target.closest('.class-card'),e.target);
    if(e.target.closest('.word-option') && e.target.tagName==='BUTTON') choose(e.target.closest('.word-option'),e.target);
  });
  document.querySelectorAll('#selfEval button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#selfEval button').forEach(x=>x.classList.remove('selected')); b.classList.add('selected');
  }));

  function clearTokenSelection(){if(selectedToken) selectedToken.classList.remove('selected'); selectedToken=null}
  function restoreEmptySlot(slot){
    if(!slot || !slot.classList || !slot.classList.contains('slot')) return;
    if(slot.querySelector('.token')) return;
    slot.classList.remove('filled','correct','incorrect');
    slot.textContent=slot.classList.contains('suffix-slot')?'?':'Перетащи сюда';
  }
  document.addEventListener('click',e=>{
    const t=e.target.closest('.token');
    if(t){
      if(selectedToken===t){clearTokenSelection();return}
      clearTokenSelection(); selectedToken=t; t.classList.add('selected'); return;
    }
    const dest=e.target.closest('.slot,.drop-zone');
    if(dest && selectedToken){
      const oldParent=selectedToken.parentElement;
      if(dest.classList.contains('slot')){
        const existing=dest.querySelector('.token');
        if(existing){ const bank=dest.closest('.workspace').querySelector('.token-bank'); bank.appendChild(existing); }
        dest.textContent=''; dest.appendChild(selectedToken); dest.classList.add('filled');
      }else{ dest.appendChild(selectedToken); }
      restoreEmptySlot(oldParent);
      clearTokenSelection();
    }
  });

  document.addEventListener('dragstart',e=>{
    const t=e.target.closest('.token'); if(!t)return;
    t.classList.add('dragging'); e.dataTransfer.setData('text/plain','token');
    window.__dragToken=t;
  });
  document.addEventListener('dragend',e=>{const t=e.target.closest('.token'); if(t)t.classList.remove('dragging'); document.querySelectorAll('.over').forEach(x=>x.classList.remove('over')); window.__dragToken=null;});
  document.querySelectorAll('.slot,.drop-zone').forEach(d=>{
    d.addEventListener('dragover',e=>{e.preventDefault();d.classList.add('over')});
    d.addEventListener('dragleave',()=>d.classList.remove('over'));
    d.addEventListener('drop',e=>{
      e.preventDefault(); d.classList.remove('over'); const t=window.__dragToken; if(!t)return;
      const oldParent=t.parentElement;
      if(d.classList.contains('slot')){
        const existing=d.querySelector('.token'); if(existing){d.closest('.workspace').querySelector('.token-bank').appendChild(existing)}
        d.textContent=''; d.appendChild(t); d.classList.add('filled');
      } else d.appendChild(t);
      restoreEmptySlot(oldParent);
    });
  });

  function checkChoiceContainers(root,selector){
    const groups=[...root.querySelectorAll(selector)]; let all=true, filled=true;
    groups.forEach(g=>{
      const sel=g.dataset.selected; if(!sel){filled=false;all=false;return}
      const ok=sel===g.dataset.answer; all=all&&ok;
      [...g.querySelectorAll('button')].forEach(b=>{b.classList.remove('correct','incorrect'); if(b.classList.contains('selected')) b.classList.add(ok?'correct':'incorrect')});
    });
    return {all,filled};
  }
  function checkSlots(root,bankSelector){
    const slots=[...root.querySelectorAll('.slot')]; let all=true,filled=true;
    slots.forEach(s=>{
      s.classList.remove('correct','incorrect'); const t=s.querySelector('.token');
      if(!t){filled=false;all=false;return}
      const ok=s.dataset.accept ? t.dataset.value===s.dataset.accept : t.dataset.answer===s.dataset.key; all=all&&ok; s.classList.add(ok?'correct':'incorrect');
      if(!ok){ const bank=root.querySelector(bankSelector||'.token-bank'); setTimeout(()=>{bank.appendChild(t);s.classList.remove('filled','incorrect');s.textContent=s.classList.contains('suffix-slot')?'?':'Перетащи сюда'},350); }
    });
    return {all,filled};
  }
  function checkZones(root,bankSelector){
    const zones=[...root.querySelectorAll('.drop-zone')]; let all=true; const tokens=[...root.querySelectorAll('.drop-zone .token')];
    const total=[...root.querySelectorAll('.token')].length; if(tokens.length<total) all=false;
    tokens.forEach(t=>{const z=t.closest('.drop-zone'); const ok=t.dataset.answer===z.dataset.zone; t.style.borderColor=ok?'#83c99f':'#e49b96'; if(!ok){all=false; const bank=root.querySelector(bankSelector||'.token-bank'); setTimeout(()=>{t.style.borderColor='';bank.appendChild(t)},350)}});
    return {all,filled:tokens.length===total};
  }
  function setComplete(i,msg){completed[i]=true; nextBtn.disabled=false; showStatus(screens[i].querySelector('.workspace'),msg,'good'); if(i===9) checkBtn.textContent='Открыть памятку'}

  function screen1(){const ws=document.getElementById('ws1'); const r=checkSlots(ws,'.token-bank'); if(r.all){document.getElementById('s1Question').classList.remove('hidden');setComplete(0,'Верно. Все причастия вернулись к своим исходным глаголам.')} else showStatus(ws,r.filled?'Есть ошибка: неверная карточка вернулась вниз.':'Заполни все четыре пары.','bad')}
  function screen2(){const ws=document.getElementById('ws2'); const r=checkChoiceContainers(ws,'.choice-group'); if(r.all){document.getElementById('s2Conclusion').classList.remove('hidden');setComplete(1,'Паспорт заполнен. Теперь проверим, какие признаки действительно управляют образованием причастий.')} else showStatus(ws,r.filled?'Есть ошибки. Исправь подсвеченные ячейки.':'Выбери вариант в каждой ячейке.','bad')}
  function screen3(){const ws=document.getElementById('ws3'); if(steps[3]===1){const r=checkZones(document.getElementById('s3Step1')); if(r.all){steps[3]=2;document.getElementById('s3Step1').classList.add('hidden');document.getElementById('s3Step2').classList.remove('hidden');showStatus(ws,'Теперь объясни, что именно мешает образовать две формы.','info')} else showStatus(ws,'Проверь распределение: неверные карточки вернулись вниз.','bad')} else {const r=checkChoiceContainers(document.getElementById('s3Step2'),'.mini-choice'); if(r.all){document.getElementById('s3Rules').classList.remove('hidden');setComplete(2,'Верно: вид ограничивает настоящее время, переходность — страдательные причастия.')} else showStatus(ws,'Выбери причину для каждой невозможной формы.','bad')}}
  function screen4(){const ws=document.getElementById('ws4'); if(steps[4]===1){const r=checkSlots(document.getElementById('s4Step1')); if(r.all){steps[4]=2;document.getElementById('s4Step1').classList.add('hidden');document.getElementById('s4Step2').classList.remove('hidden');showStatus(ws,'Суффиксы собраны. Теперь свяжи их с окончаниями формы 3-го лица множественного числа.','info')} else showStatus(ws,'Есть ошибка в суффиксе. Неверная плашка вернулась в банк.','bad')} else {const r=checkChoiceContainers(document.getElementById('s4Step2'),'.mini-choice'); if(r.all){document.getElementById('s4Rules').classList.remove('hidden');setComplete(3,'Закономерность найдена: I спряжение → -ущ-/-ющ-, II → -ащ-/-ящ-.')} else showStatus(ws,'Сопоставь -ут/-ют и -ат/-ят с нужными суффиксами.','bad')}}
  function screen5(){const ws=document.getElementById('ws5'); if(steps[5]===1){const r=checkSlots(document.getElementById('s5Step1')); if(r.all){steps[5]=2;document.getElementById('s5Step1').classList.add('hidden');document.getElementById('s5Step2').classList.remove('hidden');showStatus(ws,'Теперь определи, какое спряжение стоит за каждой парой форм.','info')} else showStatus(ws,'Проверь суффиксы -ем- и -им-.','bad')} else {const r=checkChoiceContainers(document.getElementById('s5Step2'),'.mini-choice'); if(r.all){document.getElementById('s5Rules').classList.remove('hidden');setComplete(4,'Верно: I спряжение → -ем-, II → -им-.')} else showStatus(ws,'Определи спряжение обеих групп.','bad')}}
  function screen6(){const ws=document.getElementById('ws6'); if(steps[6]===1){const r=checkSlots(document.getElementById('s6Step1')); if(r.all){steps[6]=2;document.getElementById('s6Step1').classList.add('hidden');document.getElementById('s6Step2').classList.remove('hidden');showStatus(ws,'Суффиксы собраны. Теперь посмотри на последний звук основы.','info')} else showStatus(ws,'Есть ошибка: проверь, где нужен -вш-, а где -ш-.','bad')} else {const r=checkChoiceContainers(document.getElementById('s6Step2'),'.class-card'); if(r.all){document.getElementById('s6Rules').classList.remove('hidden');setComplete(5,'Верно: в прошедшем времени ориентируемся на основу, а не на спряжение.')} else showStatus(ws,'Для каждой основы выбери: она заканчивается гласным или согласным.','bad')}}
  function screen7(){const ws=document.getElementById('ws7'); if(steps[7]===1){const r=checkZones(document.getElementById('s7Step1')); if(r.all){steps[7]=2;document.getElementById('s7Step1').classList.add('hidden');document.getElementById('s7Step2').classList.remove('hidden');showStatus(ws,'Мастерские выбраны. Теперь собери каждую форму.','info')} else showStatus(ws,'Есть неверные распределения: карточки вернулись в общий банк.','bad')} else {const r=checkChoiceContainers(document.getElementById('s7Step2'),'.word-option'); if(r.all){document.getElementById('s7Observation').classList.remove('hidden');setComplete(6,'Все формы собраны. Обрати внимание: в -ать/-ять гласные А/Я сохраняются перед НН.')} else showStatus(ws,'Исправь подсвеченные суффиксы.','bad')}}
  function screen8(){const ws=document.getElementById('ws8'); const r=checkSlots(ws,'.token-bank'); if(r.all){document.getElementById('s8Note').classList.remove('hidden');setComplete(7,'Верно: в кратком страдательном причастии прошедшего времени пишется одна Н.')} else showStatus(ws,'Проверь, к какому сочетанию относится каждая краткая форма.','bad')}
  function screen9(){const ws=document.getElementById('ws9'); if(steps[9]===1){const r=checkZones(document.getElementById('s9Step1')); if(r.all){steps[9]=2;document.getElementById('s9Step1').classList.add('hidden');document.getElementById('s9Step2').classList.remove('hidden');showStatus(ws,'Теперь исправь только проблемную часть в пяти формах.','info')} else showStatus(ws,'Не всё распределено верно. Неверные карточки вернулись вниз.','bad')} else {const r=checkChoiceContainers(document.getElementById('s9Step2'),'.repair-fix'); if(r.all){document.getElementById('s9Reasons').classList.remove('hidden');setComplete(8,'Мастерская закрыта: ты отличил орфографическую ошибку от невозможной формы.')} else showStatus(ws,'Исправь подсвеченные части слов.','bad')}}
  function screen10(){const ws=document.getElementById('ws10'); const r=checkChoiceContainers(ws,'.word-option'); if(r.all){const cards=[...ws.querySelectorAll('.ticket')]; cards[0].querySelector('.ticket-result').textContent='клеящий'; cards[1].querySelector('.ticket-result').textContent='проверяемый'; cards[2].querySelector('.ticket-result').textContent='решённый → решён'; setComplete(9,'Маршрут пройден. Можно открыть итоговую памятку.')} else showStatus(ws,'Проверь все три карточки. В карточке В нужно выбрать и суффикс, и краткую форму.','bad')}

  const checkers=[screen1,screen2,screen3,screen4,screen5,screen6,screen7,screen8,screen9,screen10];
  checkBtn.addEventListener('click',()=>{
    if(current===9 && completed[9]){document.getElementById('memoOverlay').classList.remove('hidden');return}
    clearStatus(screens[current].querySelector('.workspace')); checkers[current]();
  });
  document.getElementById('closeMemo').addEventListener('click',()=>document.getElementById('memoOverlay').classList.add('hidden'));
  document.getElementById('memoOverlay').addEventListener('click',e=>{if(e.target.id==='memoOverlay')e.currentTarget.classList.add('hidden')});

  gotoScreen(0);
})();