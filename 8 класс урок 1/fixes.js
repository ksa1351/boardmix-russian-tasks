// Corrections to the diagnostic slide: neutral wording and no pre-filled spelling answers.
screens[0].instruction = 'Если затрудняешься, воспользуйся подсказкой.';

screens[0].render = function renderDiagCorrected(){
  const q=[
    ['d1','В каком слове на месте пропуска пишется НН?',[['a','ветре..ый день'],['b','решё..ая задача'],['c','ю..ый спортсмен']]],
    ['d2','В каком варианте НЕ со словом пишется раздельно?',[['a','(не)выполненное вовремя задание'],['b','(не)высокий дом'],['c','(не)правда']]],
    ['d3','Как пишется союз ПОТОМУ ЧТО?',[['a','слитно'],['b','раздельно'],['c','через дефис']]],
    ['d4','В каком слове требуется дефис?',[['a','кто(то)'],['b','что(бы)'],['c','то(же)']]]
  ];
  workspace.innerHTML=`<div class="screen-label">Разминка · 7 минут</div><div class="choice-grid">${q.map(([key,text,opts])=>`<div class="task-card"><b>${text}</b>${opts.map(([v,t])=>`<label class="choice"><input type="radio" name="${key}" data-obj="diag" data-key="${key}" value="${v}" ${state.diag[key]===v?'checked':''}><span>${t}</span></label>`).join('')}</div>`).join('')}</div>${state.diag.score!==null?status(`Ранее: ${state.diag.score} из 4. Можно выполнить ещё раз.`,'warn'):''}`;
  q.forEach(x=>wireRadios(x[0]));
};

if(current===0){
  render();
}
