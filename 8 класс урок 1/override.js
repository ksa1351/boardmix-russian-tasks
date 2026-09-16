// Методическая корректировка: на экране нет готовых речевых клише и ответов.
// Подсказки открываются только по кнопке и задают направление поиска, не сообщая решение.

screens[0].instruction='Если затрудняешься, воспользуйся подсказкой.';
screens[0].hint1='Определи, какое правило проверяется в каждом примере. Обрати внимание на часть речи и строение слова.';
screens[0].hint2='Для каждого примера сначала назови орфограмму, затем вспомни условие выбора написания. Не ориентируйся только на звучание.';

screens[1].hint1='Спроси себя, что является главным в каждом тексте: ход событий, признаки предмета или развитие мысли.';
screens[1].hint2='Посмотри, какие слова преобладают и как связаны предложения. Это поможет определить задачу текста.';

screens[2].instruction='Составь связный рассказ по ситуации. Не используй готовые речевые шаблоны — выстрой последовательность самостоятельно.';
screens[2].hint1='Проверь, понятно ли читателю, что произошло и в каком порядке.';
screens[2].hint2='Задай себе три вопроса: с чего начинается история, что меняет ситуацию, чем она завершается.';

screens[3].instruction='Ответь на вопрос: почему важно уметь доводить начатое дело до конца? Построй ответ самостоятельно.';
screens[3].hint1='Проверь, есть ли в ответе не только мнение, но и его объяснение.';
screens[3].hint2='После написания спроси себя: чем я обосновал свою мысль и достаточно ли этого для читателя?';

screens[4].hint1='Выбирай реплику не по длине, а по тому, помогает ли она получить нужную информацию.';
screens[4].hint2='Представь реальный разговор: какая реплика даст собеседнику понять, что именно тебе нужно узнать?';

screens[5].hint1='Оцени текст как редактор: понятна ли мысль, нет ли речевых сбоев и достаточно ли доказательств.';
screens[5].hint2='Прочитай ответ вслух. Отметь места, где мысль повторяется, обрывается или остаётся без пояснения.';

screens[6].hint1='Вспомни, чем различались задания урока. Не ищи знакомые слова — выбирай по смыслу.';
screens[6].hint2='Сопоставь каждый вопрос с тем действием, которое ты выполнял на соответствующем этапе урока.';

screens[0].render=function renderDiagCorrected(){
  const q=[
    ['d1','В каком слове на месте пропуска пишется НН?',[['a','ветре..ый день'],['b','решё..ая задача'],['c','ю..ый спортсмен']]],
    ['d2','В каком варианте НЕ со словом пишется раздельно?',[['a','(не)выполненное учеником задание'],['b','(не)высокий дом'],['c','(не)правда']]],
    ['d3','Как пишется выделенный союз: «Он остался дома, ПОТОМУ ЧТО заболел»?',[['a','слитно'],['b','раздельно'],['c','через дефис']]],
    ['d4','В каком слове требуется дефис?',[['a','кто(то)'],['b','что(бы)'],['c','то(же)']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Разминка · 7 минут</div><div class="choice-grid">${q.map(([key,text,opts])=>`<div class="task-card"><b>${text}</b>${opts.map(([v,t])=>`<label class="choice"><input type="radio" name="${key}" data-obj="diag" data-key="${key}" value="${v}" ${state.diag[key]===v?'checked':''}><span>${t}</span></label>`).join('')}</div>`).join('')}</div>${state.diag.score!==null?status(`Ранее: ${state.diag.score} из 4. Можно выполнить ещё раз.`,'warn'):''}`;
  q.forEach(x=>wireRadios(x[0]));
};

screens[2].render=function renderStoryLessLeading(){
  workspace.innerHTML=`<div class="screen-label">Повествование · 12 минут</div>
  <p class="lead">Ситуация: команда готовилась к школьному турниру, но перед игрой возникла неожиданная проблема. Напиши связный рассказ из 5–8 предложений.</p>
  <div class="field-card" style="max-width:1080px;margin:0 auto"><label for="storyAll">Твой рассказ</label><textarea id="storyAll" style="height:250px" placeholder="Напиши рассказ самостоятельно">${esc(state.story.start)}</textarea></div>
  ${state.story.ok?status('Рассказ уже проверен. При желании можно улучшить его и проверить ещё раз.','warn'):''}`;
  wireText('storyAll','story','start');
};
screens[2].check=function checkStoryLessLeading(){
  const text=state.story.start.trim();
  const sentences=countSentences(text);
  if(text.length<80||sentences<5){appendStatus('Текст пока слишком короткий. Нужен связный рассказ не менее чем из 5 законченных предложений.','bad');return;}
  state.story.ok=true;save();
  appendStatus(`Получилось примерно ${sentences} предложений. Перечитай текст и проверь, легко ли восстановить последовательность событий.`,'good');
  nextBtn.disabled=false;checkBtn.textContent='Проверить ещё раз';
};

screens[3].render=function renderReasonLessLeading(){
  workspace.innerHTML=`<div class="screen-label">Рассуждение · 12 минут</div>
  <p class="lead"><b>Вопрос:</b> почему важно уметь доводить начатое дело до конца? Напиши связный ответ из 5–8 предложений.</p>
  <div class="field-card" style="max-width:1080px;margin:0 auto"><label for="reasonAll">Твой ответ</label><textarea id="reasonAll" style="height:250px" placeholder="Сформулируй ответ самостоятельно">${esc(state.reason.thesis)}</textarea></div>
  ${state.reason.ok?status('Ответ уже проверен. Можно уточнить формулировки и проверить снова.','warn'):''}`;
  wireText('reasonAll','reason','thesis');
};
screens[3].check=function checkReasonLessLeading(){
  const text=state.reason.thesis.trim();
  const sentences=countSentences(text);
  if(text.length<90||sentences<5){appendStatus('Ответ пока слишком короткий. Раскрой мысль не менее чем в 5 законченных предложениях.','bad');return;}
  state.reason.ok=true;save();
  appendStatus(`Получилось примерно ${sentences} предложений. Теперь проверь: мысль объяснена или только названа? Есть ли в тексте убедительное обоснование?`,'good');
  nextBtn.disabled=false;checkBtn.textContent='Проверить ещё раз';
};

screens[4].render=function renderDialogLessObvious(){
  const qs=[
    ['q1','Ты пропустил урок. Какая реплика точнее поможет начать разговор?',[['a','Привет! Что сегодня было на русском?'],['b','Привет! Подскажи, пожалуйста, какую тему проходили и что нужно сделать дома?'],['c','Привет! Можешь прислать фото тетради?']]],
    ['q2','Тебе ответили: «Разбирали словосочетания». Какое уточнение будет полезнее?',[['a','А какое упражнение вы успели сделать?'],['b','А что именно нужно уметь делать со словосочетаниями?'],['c','А тема была сложная?']]],
    ['q3','Ты получил ответ. Какая реплика лучше завершает учебный разговор?',[['a','Спасибо, теперь понятно, что нужно повторить.'],['b','Спасибо, тогда посмотрю тему позже.'],['c','Спасибо, пришли ещё фото учебника, если сможешь.']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Диалог · 8 минут</div><div class="dialogue">${qs.map(([k,q,opts],i)=>`<div class="task-card"><b>${i+1}. ${q}</b><div class="dialog-options">${opts.map(([v,t])=>`<label class="dialog-option ${state.dialog[k]===v?'active selected':''}"><input class="hidden" type="radio" name="${k}" data-obj="dialog" data-key="${k}" value="${v}" ${state.dialog[k]===v?'checked':''}><span>${t}</span></label>`).join('')}</div></div>`).join('')}</div>${state.dialog.score!==null?status(`Ранее: ${state.dialog.score} из 3.`,'warn'):''}`;
  qs.forEach(x=>wireRadios(x[0]));
};
screens[4].check=function checkDialogLessObvious(){
  const a={q1:'b',q2:'b',q3:'a'};let score=0,blank=0;
  Object.keys(a).forEach(k=>{if(!state.dialog[k])blank++;else if(state.dialog[k]===a[k])score++;});
  if(blank){appendStatus('Выбери по одной реплике в каждой ситуации.','bad');return;}
  state.dialog.score=score;save();
  appendStatus(score===3?'3 из 3. Ты выбираешь реплики, которые помогают получить и уточнить нужную информацию.':`${score} из 3. Подумай, какая реплика в каждой ситуации лучше решает учебную задачу.`,score===3?'good':'warn');
  nextBtn.disabled=false;checkBtn.textContent='Проверить ещё раз';
};

screens[5].render=function renderEditorLessLeading(){
  const issues=[['comma','Есть пунктуационная ошибка'],['repeat','Есть неоправданные повторы'],['example','Мысль недостаточно подтверждена'],['conclusion','Концовка не завершает рассуждение'],['long','Ответ перегружен подробностями']];
  workspace.innerHTML=`<div class="screen-label">Редактирование · 8 минут</div><div class="editor-layout"><div><div class="weak-text">«Я считаю что планировать время полезно. Потому что это полезно. Когда человек планирует время, он всё планирует. Вот.»</div><p class="small-note">Отметь проблемы, которые действительно есть в тексте.</p><div class="issue-list">${issues.map(([v,t])=>`<div class="issue"><label><input type="checkbox" value="${v}" ${state.editor.issues.includes(v)?'checked':''}><span>${t}</span></label></div>`).join('')}</div></div><div><label><b>Перепиши ответ так, чтобы он стал точнее и убедительнее</b></label><textarea id="rewrite" class="rewrite" placeholder="Напиши свой вариант">${esc(state.editor.rewrite)}</textarea></div></div>${state.editor.ok?status('Редактирование выполнено. Можно улучшить формулировки ещё раз.','warn'):''}`;
  workspace.querySelectorAll('.issue input').forEach(ch=>ch.addEventListener('change',()=>{state.editor.issues=[...workspace.querySelectorAll('.issue input:checked')].map(x=>x.value);save();}));
  wireText('rewrite','editor','rewrite');
};

screens[6].render=function renderFinalLessObvious(){
  const q=[
    ['f1','Что прежде всего делает рассуждение убедительным?',[['a','Последовательное перечисление действий'],['b','Объяснение мысли и её обоснование']]],
    ['f2','Что важно сохранить в повествовании?',[['a','Логическую последовательность событий'],['b','Максимально подробное описание каждого предмета']]],
    ['f3','Какой ответ можно считать развёрнутым?',[['a','Тот, в котором мысль не только названа, но и пояснена'],['b','Тот, в котором дан правильный краткий ответ без пояснения']]],
    ['f4','Какая реплика полезнее в учебном диалоге?',[['a','Та, которая помогает уточнить нужную информацию'],['b','Та, которая быстрее завершает разговор']]]
  ];
  const hard=[['rules','Орфография'],['types','Типы речи'],['story','Повествование'],['reason','Рассуждение'],['dialog','Диалог'],['edit','Редактирование']];
  workspace.innerHTML=`<div class="screen-label">Итог · 7 минут</div><div class="final-wrap"><div class="choice-grid">${q.map(([k,text,opts])=>`<div class="task-card"><b>${text}</b>${opts.map(([v,t])=>`<label class="choice"><input type="radio" name="${k}" data-obj="final" data-key="${k}" value="${v}" ${state.final[k]===v?'checked':''}><span>${t}</span></label>`).join('')}</div>`).join('')}</div><p class="small-note"><b>Что сегодня было труднее всего?</b></p><div class="self-select">${hard.map(([v,t])=>`<button type="button" class="self-btn ${state.final.hard===v?'active':''}" data-v="${v}">${t}</button>`).join('')}</div></div>${state.final.score!==null?finalSummary():''}`;
  q.forEach(x=>wireRadios(x[0]));
  workspace.querySelectorAll('.self-btn').forEach(b=>b.addEventListener('click',()=>{state.final.hard=b.dataset.v;save();renderFinalLessObvious();}));
};
screens[6].check=function checkFinalLessObvious(){
  const a={f1:'b',f2:'a',f3:'a',f4:'a'};let score=0,blank=0;
  Object.keys(a).forEach(k=>{if(!state.final[k])blank++;else if(state.final[k]===a[k])score++;});
  if(blank||!state.final.hard){appendStatus('Ответь на 4 вопроса и выбери самый трудный этап.','bad');return;}
  state.final.score=score;save();screens[6].render();
  appendStatus(score>=3?'Итог готов. Ниже — результат и рекомендация для следующего занятия.':'Итог готов. Есть навыки, которые стоит повторить на следующем занятии.',score>=3?'good':'warn');
  checkBtn.textContent='Пересчитать итог';nextBtn.disabled=true;
};

// Перерисовать текущий экран после загрузки корректировок.
render();
