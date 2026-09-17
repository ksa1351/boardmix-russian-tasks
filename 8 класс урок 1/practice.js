(()=>{
  const overlay=document.getElementById('referenceOverlay');
  if(!overlay||document.getElementById('referencePractice')) return;

  const tabs=overlay.querySelector('.reference-tabs');
  const body=overlay.querySelector('.reference-body');
  const ortho=overlay.querySelector('#referenceOrtho');
  const punct=overlay.querySelector('#referencePunct');

  const tab=document.createElement('button');
  tab.type='button';
  tab.className='reference-tab';
  tab.dataset.tab='practice';
  tab.textContent='Тренировка';
  tabs.appendChild(tab);

  const practice=document.createElement('div');
  practice.id='referencePractice';
  practice.className='reference-practice reference-hidden';
  body.appendChild(practice);

  const topics={
    ne:{
      title:'НЕ с разными частями речи',
      instruction:'Для каждого примера выбери: слитно или раздельно.',
      questions:[
        {text:'Это был (не)вежливый, а грубый ответ.',options:['слитно','раздельно'],answer:1,why:'Есть противопоставление с союзом «а»: не вежливый, а грубый.'},
        {text:'Ученик (не)навидел опаздывать.',options:['слитно','раздельно'],answer:0,why:'Глагол «ненавидеть» без НЕ не употребляется.'},
        {text:'На столе лежала (не)прочитанная мною книга.',options:['слитно','раздельно'],answer:1,why:'У полного причастия есть зависимое слово «мною».'},
        {text:'Книга была (не)прочитана.',options:['слитно','раздельно'],answer:1,why:'Краткое страдательное причастие с НЕ пишется раздельно.'},
        {text:'Это оказался (не)друг, а случайный попутчик.',options:['слитно','раздельно'],answer:1,why:'Есть противопоставление с союзом «а».'},
        {text:'Он говорил (не)громко, но отчётливо.',options:['слитно','раздельно'],answer:0,why:'«Негромко» можно заменить словом «тихо»; союз «но» здесь не создаёт противопоставления признаков.'},
        {text:'Мы увидели (не)высокий дом у дороги.',options:['слитно','раздельно'],answer:0,why:'Нет противопоставления; слово можно заменить близким по смыслу «низкий».'},
        {text:'Это вовсе (не)лёгкое решение.',options:['слитно','раздельно'],answer:1,why:'Сочетание «вовсе не» усиливает отрицание.'}
      ]
    },
    nn:{
      title:'Н и НН',
      instruction:'Выбери, сколько букв Н нужно написать на месте пропуска.',
      questions:[
        {text:'кожа..ый ремень',options:['Н','НН'],answer:0,why:'В прилагательном с суффиксом -ан- пишется одна Н: кожаный.'},
        {text:'стекля..ая ваза',options:['Н','НН'],answer:1,why:'«Стеклянный» — одно из слов-исключений с НН.'},
        {text:'жаре..ая картошка',options:['Н','НН'],answer:0,why:'Отглагольное прилагательное без приставки и зависимых слов: жареная.'},
        {text:'жаре..ая на масле картошка',options:['Н','НН'],answer:1,why:'Есть зависимое слово «на масле»: это причастие, пишется НН.'},
        {text:'решё..ая задача',options:['Н','НН'],answer:1,why:'Полное страдательное причастие совершенного вида: решённая.'},
        {text:'задача реше..а',options:['Н','НН'],answer:0,why:'В кратком страдательном причастии пишется одна Н: решена.'},
        {text:'безветре..ый день',options:['Н','НН'],answer:1,why:'Слово «безветренный» пишется с НН.'},
        {text:'организова..ая встреча',options:['Н','НН'],answer:1,why:'В словах на -ованный/-ёванный пишется НН: организованная.'}
      ]
    },
    commas:{
      title:'Причастные и деепричастные обороты',
      instruction:'Выбери вариант с правильной расстановкой знаков препинания.',
      questions:[
        {text:'1. Выбери правильный вариант.',options:['Листья опавшие за ночь, покрыли дорожку.','Листья, опавшие за ночь, покрыли дорожку.','Листья опавшие за ночь покрыли дорожку.'],answer:1,why:'Причастный оборот стоит после определяемого слова «листья» и обособляется с двух сторон.'},
        {text:'2. Выбери правильный вариант.',options:['Опавшие за ночь листья покрыли дорожку.','Опавшие за ночь, листья покрыли дорожку.','Опавшие, за ночь листья покрыли дорожку.'],answer:0,why:'Причастный оборот стоит перед определяемым словом и в этом случае не обособляется.'},
        {text:'3. Выбери правильный вариант.',options:['Улыбаясь, он вошёл в класс.','Улыбаясь он, вошёл в класс.','Улыбаясь он вошёл в класс.'],answer:0,why:'Одиночное деепричастие обычно обособляется.'},
        {text:'4. Выбери правильный вариант.',options:['Ребята закончив работу, вышли из кабинета.','Ребята, закончив работу, вышли из кабинета.','Ребята, закончив работу вышли из кабинета.'],answer:1,why:'Деепричастный оборот находится внутри предложения и выделяется с двух сторон.'},
        {text:'5. Выбери правильный вариант.',options:['Свернувшаяся клубком кошка спала на кресле.','Свернувшаяся, клубком кошка спала на кресле.','Свернувшаяся клубком, кошка спала на кресле.'],answer:0,why:'Причастный оборот стоит перед определяемым словом «кошка» и не обособляется.'},
        {text:'6. Выбери правильный вариант.',options:['Кошка свернувшаяся клубком, спала на кресле.','Кошка, свернувшаяся клубком, спала на кресле.','Кошка свернувшаяся клубком спала на кресле.'],answer:1,why:'Причастный оборот стоит после определяемого слова и выделяется запятыми.'}
      ]
    }
  };

  let activeTopic=null;
  let answers=[];

  function topicMenu(){
    activeTopic=null;
    answers=[];
    practice.innerHTML=`
      <div class="practice-intro">
        <h3>Тренировка</h3>
        <p>Выбери тему. Ответы и объяснения появятся только после проверки.</p>
      </div>
      <div class="practice-topic-grid">
        <button type="button" class="practice-topic" data-topic="ne"><b>НЕ</b><span>с разными частями речи</span></button>
        <button type="button" class="practice-topic" data-topic="nn"><b>Н / НН</b><span>прилагательные и причастия</span></button>
        <button type="button" class="practice-topic" data-topic="commas"><b>Запятые</b><span>причастные и деепричастные обороты</span></button>
      </div>`;
    practice.querySelectorAll('.practice-topic').forEach(b=>b.addEventListener('click',()=>startTopic(b.dataset.topic)));
  }

  function startTopic(key){
    activeTopic=key;
    const data=topics[key];
    answers=new Array(data.questions.length).fill(null);
    practice.innerHTML=`
      <div class="practice-toolbar">
        <button type="button" class="practice-back">← Темы</button>
        <div><h3>${data.title}</h3><p>${data.instruction}</p></div>
      </div>
      <div class="practice-list">
        ${data.questions.map((q,i)=>`
          <article class="practice-q" data-i="${i}">
            <div class="practice-qtext">${q.text}</div>
            <div class="practice-options">
              ${q.options.map((o,j)=>`<button type="button" class="practice-option" data-i="${i}" data-j="${j}">${o}</button>`).join('')}
            </div>
            <div class="practice-feedback reference-hidden"></div>
          </article>`).join('')}
      </div>
      <div class="practice-actions">
        <button type="button" class="practice-check">Проверить</button>
        <div class="practice-score"></div>
      </div>`;

    practice.querySelector('.practice-back').addEventListener('click',topicMenu);
    practice.querySelectorAll('.practice-option').forEach(b=>b.addEventListener('click',()=>{
      const i=Number(b.dataset.i),j=Number(b.dataset.j);
      answers[i]=j;
      const card=b.closest('.practice-q');
      card.querySelectorAll('.practice-option').forEach(x=>x.classList.toggle('selected',x===b));
      card.querySelector('.practice-feedback').classList.add('reference-hidden');
      card.querySelectorAll('.practice-option').forEach(x=>x.classList.remove('correct','wrong'));
    }));
    practice.querySelector('.practice-check').addEventListener('click',checkTopic);
  }

  function checkTopic(){
    const data=topics[activeTopic];
    const missing=answers.filter(x=>x===null).length;
    const scoreBox=practice.querySelector('.practice-score');
    if(missing){
      scoreBox.textContent=`Осталось выполнить: ${missing}`;
      scoreBox.className='practice-score warn';
      return;
    }
    let score=0;
    data.questions.forEach((q,i)=>{
      const card=practice.querySelector(`.practice-q[data-i="${i}"]`);
      const buttons=[...card.querySelectorAll('.practice-option')];
      if(answers[i]===q.answer) score++;
      buttons.forEach((b,j)=>{
        b.classList.toggle('correct',j===q.answer);
        b.classList.toggle('wrong',j===answers[i]&&j!==q.answer);
      });
      const feedback=card.querySelector('.practice-feedback');
      feedback.textContent=q.why;
      feedback.classList.remove('reference-hidden');
    });
    scoreBox.textContent=`Результат: ${score} из ${data.questions.length}`;
    scoreBox.className='practice-score '+(score===data.questions.length?'good':'');
  }

  // Existing tab handler knows only two tabs, so this listener normalizes all three states after it runs.
  overlay.querySelectorAll('.reference-tab').forEach(t=>t.addEventListener('click',()=>{
    const type=t.dataset.tab;
    ortho.classList.toggle('reference-hidden',type!=='ortho');
    punct.classList.toggle('reference-hidden',type!=='punct');
    practice.classList.toggle('reference-hidden',type!=='practice');
    overlay.querySelectorAll('.reference-tab').forEach(x=>x.classList.toggle('active',x===t));
    if(type==='practice') topicMenu();
  }));

  topicMenu();
})();