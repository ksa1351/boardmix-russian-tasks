// Исправление выбора плашек на этапе «Диалог».
screens[4].render=function renderDialogClickable(){
  const qs=[
    ['q1','Ты пропустил урок. Какая реплика точнее поможет начать разговор?',[['a','Привет! Что сегодня было на русском?'],['b','Привет! Подскажи, пожалуйста, какую тему проходили и что нужно сделать дома?'],['c','Привет! Можешь прислать фото тетради?']]],
    ['q2','Тебе ответили: «Разбирали словосочетания». Какое уточнение будет полезнее?',[['a','А какое упражнение вы успели сделать?'],['b','А что именно нужно уметь делать со словосочетаниями?'],['c','А тема была сложная?']]],
    ['q3','Ты получил ответ. Какая реплика лучше завершает учебный разговор?',[['a','Спасибо, теперь понятно, что нужно повторить.'],['b','Спасибо, тогда посмотрю тему позже.'],['c','Спасибо, пришли ещё фото учебника, если сможешь.']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Диалог · 8 минут</div><div class="dialogue">${qs.map(([k,q,opts],i)=>`<div class="task-card"><b>${i+1}. ${q}</b><div class="dialog-options">${opts.map(([v,t])=>`<button type="button" class="dialog-option ${state.dialog[k]===v?'active selected':''}" data-key="${k}" data-value="${v}" aria-pressed="${state.dialog[k]===v?'true':'false'}">${t}</button>`).join('')}</div></div>`).join('')}</div>${state.dialog.score!==null?status(`Ранее: ${state.dialog.score} из 3.`,'warn'):''}`;

  workspace.querySelectorAll('.dialog-option').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const key=btn.dataset.key;
      const value=btn.dataset.value;
      state.dialog[key]=value;
      save();
      screens[4].render();
    });
  });
};

if(current===4){screens[4].render();}
