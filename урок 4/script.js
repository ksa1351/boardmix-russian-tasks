const screens = [
  {
    title: 'Как образуются деепричастия',
    instruction: 'Сначала изучи правило, затем переходи к образованию нормативных форм.',
    type: 'ruleIntro',
    hint: 'Вид и возвратность исходного глагола сохраняются: решать → решая, решить → решив, умыться → умывшись.'
  },
  {
    title: 'Образуем деепричастия несовершенного вида',
    instruction: 'Выбери нормативную форму деепричастия для каждого глагола.',
    type: 'formation',
    rows: [
      ['читать', ['читая', 'читав', 'читающий'], 'читая'],
      ['решать', ['решив', 'решая', 'решающий'], 'решая'],
      ['сидеть', ['сидев', 'сидя', 'сидящий'], 'сидя'],
      ['нести', ['неся', 'нёсши', 'несущий'], 'неся']
    ],
    ruleNote: '<b>НСВ:</b> основа настоящего времени + <b>-а- / -я-</b>: решают → решая, сидят → сидя.',
    hint: 'Деепричастия несовершенного вида обычно образуются от основы настоящего времени с помощью суффиксов -а- / -я-: читают → читая, сидят → сидя.'
  },
  {
    title: 'Закрепляем формы несовершенного вида',
    instruction: 'Выбери ещё четыре нормативные формы деепричастий.',
    type: 'formation',
    rows: [
      ['делать', ['делая', 'делав', 'сделав'], 'делая'],
      ['говорить', ['говорив', 'говоря', 'говорящий'], 'говоря'],
      ['смотреть', ['смотрев', 'смотря', 'посмотрев'], 'смотря'],
      ['возвращаться', ['вернувшись', 'возвращаясь', 'возвращающийся'], 'возвращаясь']
    ],
    ruleNote: '<b>Проверка:</b> форма НСВ отвечает на вопрос <b>«что делая?»</b> и называет одновременное добавочное действие.',
    hint: 'Поставь глагол в настоящее время и найди основу: делают → делая, говорят → говоря, смотрят → смотря, возвращаются → возвращаясь.'
  },
  {
    title: 'Практика НСВ: 15 новых глаголов',
    instruction: 'Выбери нормативное деепричастие для каждого глагола.',
    type: 'formationSet',
    items: [
      ['работать',['работая','работающий','сработав'],'работая'],
      ['гулять',['гуляющий','гуляя','погуляв'],'гуляя'],
      ['думать',['подумав','думая','думающий'],'думая'],
      ['слушать',['слушая','послушав','слушающий'],'слушая'],
      ['рисовать',['нарисовав','рисовая','рисуя'],'рисуя'],
      ['танцевать',['станцевав','танцуя','танцевая'],'танцуя'],
      ['улыбаться',['улыбнувшись','улыбаясь','улыбая'],'улыбаясь'],
      ['смеяться',['засмеявшись','смея','смеясь'],'смеясь'],
      ['разговаривать',['разговаривая','разговорив','поговорив'],'разговаривая'],
      ['помогать',['помогши','помогая','помогающий'],'помогая'],
      ['идти',['шедши','идя','пойдя'],'идя'],
      ['стоять',['постояв','стоя','стоящий'],'стоя'],
      ['играть',['сыграв','играющий','играя'],'играя'],
      ['учиться',['научившись','учась','учащийся'],'учась'],
      ['готовить',['приготовив','готовя','готовящий'],'готовя']
    ],
    ruleNote: '<b>НСВ:</b> добавочное действие происходит одновременно с основным; вопрос — <b>«что делая?»</b>.',
    hint: 'Сначала проверь вид: действие должно быть незавершённым или повторяющимся. Затем ищи форму на -а- / -я- с сохранением -сь.'
  },
  {
    title: 'Образуем деепричастия совершенного вида',
    instruction: 'Подбери форму со значением добавочного завершённого действия.',
    type: 'formation',
    rows: [
      ['прочитать', ['прочитая', 'прочитав', 'прочитанный'], 'прочитав'],
      ['решить', ['решая', 'решив', 'решённый'], 'решив'],
      ['открыть', ['открывая', 'открыв', 'открытый'], 'открыв'],
      ['умыться', ['умываясь', 'умывшись', 'умытый'], 'умывшись']
    ],
    ruleNote: '<b>СВ:</b> основа инфинитива или прошедшего времени + <b>-в-, -вши-, -ши-</b>; постфикс -сь сохраняется.',
    hint: 'Для совершенного вида чаще нужны суффиксы -в-, -вши-, -ши-. У возвратных глаголов сохраняется -сь: умыться → умывшись.'
  },
  {
    title: 'Закрепляем формы совершенного вида',
    instruction: 'Выбери нормативную форму завершённого добавочного действия.',
    type: 'formation',
    rows: [
      ['встретить', ['встречая', 'встретив', 'встреченный'], 'встретив'],
      ['закрыть', ['закрывая', 'закрыв', 'закрытый'], 'закрыв'],
      ['принести', ['принеся', 'принесши', 'принося'], 'принеся'],
      ['вернуться', ['возвращаясь', 'вернувшись', 'вернувшийся'], 'вернувшись']
    ],
    ruleNote: '<b>Проверка:</b> форма СВ отвечает на вопрос <b>«что сделав?»</b>; у отдельных глаголов встречаются особые формы: принести → принеся.',
    hint: 'Сначала проверь значение завершённости. Для большинства форм нужны -в- / -вши-, но у глагола «принести» нормативная форма — «принеся».'
  },
  {
    title: 'Практика СВ: 15 новых глаголов',
    instruction: 'Выбери нормативное деепричастие завершённого действия.',
    type: 'formationSet',
    items: [
      ['сделать',['делая','сделав','сделая'],'сделав'],
      ['написать',['написая','написав','пиша'],'написав'],
      ['увидеть',['видя','увидя','увидев'],'увидев'],
      ['войти',['войдя','вошедший','входя'],'войдя'],
      ['выйти',['выходя','выйдя','вышев'],'выйдя'],
      ['прийти',['приходя','придя','пришев'],'придя'],
      ['уйти',['уходя','ушев','уйдя'],'уйдя'],
      ['сесть',['садясь','сев','севшися'],'сев'],
      ['встать',['вставая','встав','встая'],'встав'],
      ['сказать',['говоря','сказая','сказав'],'сказав'],
      ['подумать',['думая','подумав','подумя'],'подумав'],
      ['засмеяться',['смеясь','засмеяв','засмеявшись'],'засмеявшись'],
      ['закончить',['заканчивая','закончив','закончая'],'закончив'],
      ['проверить',['проверяя','проверя','проверив'],'проверив'],
      ['найти',['находя','найдя','нашев'],'найдя']
    ],
    ruleNote: '<b>СВ:</b> добавочное действие завершено; вопрос — <b>«что сделав?»</b>. У ряда глаголов используются формы на -я: войдя, придя, найдя.',
    hint: 'Проверь завершённость действия. Помимо обычных форм на -в- / -вши-, запомни нормативные формы: войдя, выйдя, придя, уйдя, найдя.'
  },
  {
    title: 'Деепричастие образуется не всегда',
    instruction: 'Определи, можно ли образовать современную нормативную форму.',
    type: 'classify',
    rows: [
      ['читать', 'читая', 'yes'], ['улыбнуться', 'улыбнувшись', 'yes'],
      ['писать', 'нормативной формы нет', 'no'], ['мочь', 'нормативной формы нет', 'no'],
      ['принести', 'принеся', 'yes'], ['шить', 'нормативной формы нет', 'no']
    ],
    hint: 'Если литературной формы нет («пиша», «могши», «шия»), в школьном разборе отмечаем: деепричастие не образуется.'
  },
  {
    title: 'Причастный оборот после определяемого слова',
    instruction: 'Нажми на точки между словами и поставь две нужные запятые.',
    type: 'punct',
    words: ['Дом', 'построенный', 'недавно', 'уже', 'заселили'], expected: [0, 2],
    hint: 'Найди определяемое слово «дом». Причастный оборот «построенный недавно» стоит после него, поэтому обособляется с двух сторон.'
  },
  {
    title: 'Причастный оборот перед определяемым словом',
    instruction: 'Поставь запятые, только если они нужны.',
    type: 'punct',
    words: ['Построенный', 'недавно', 'дом', 'уже', 'заселили'], expected: [],
    hint: 'Оборот «построенный недавно» стоит перед определяемым словом «дом» и не имеет добавочного обстоятельственного значения. Запятые не нужны.'
  },
  {
    title: 'Одиночное деепричастие',
    instruction: 'Отдели добавочное действие от основной части предложения.',
    type: 'punct',
    words: ['Улыбаясь', 'девочка', 'вошла', 'в', 'класс'], expected: [0],
    hint: 'Одиночное деепричастие «улыбаясь» обозначает добавочное действие и обычно обособляется независимо от своего места в предложении.'
  },
  {
    title: 'Деепричастный оборот',
    instruction: 'Поставь все запятые в предложении.',
    type: 'punct',
    words: ['Закончив', 'сложную', 'задачу', 'Матвей', 'проверил', 'решение'], expected: [2],
    hint: 'Деепричастие вместе с зависимыми словами образует оборот: «закончив сложную задачу». В начале предложения оборот отделяется одной запятой.'
  },
  {
    title: 'Причастный оборот при личном местоимении',
    instruction: 'Расставь запятые. Выполни все 8 примеров серии.',
    type: 'punctSet',
    items: [
      {words:['Утомлённый','долгой','дорогой','он','сразу','уснул'],expected:[2]},
      {words:['Она','удивлённая','ответом','замолчала'],expected:[0,2]},
      {words:['Поддержанный','друзьями','я','чувствовал','себя','увереннее'],expected:[1]},
      {words:['Они','застигнутые','дождём','укрылись','под','навесом'],expected:[0,2]},
      {words:['Ты','привыкший','к','ранним','подъёмам','проснулся','первым'],expected:[0,4]},
      {words:['Ошеломлённая','неожиданной','новостью','она','долго','молчала'],expected:[2]},
      {words:['Он','увлечённый','чтением','не','услышал','звонка'],expected:[0,2]},
      {words:['Взволнованный','предстоящим','выступлением','я','повторял','текст'],expected:[2]}
    ],
    hint: 'Если определяемое слово — личное местоимение (я, ты, он, она, мы, вы, они), причастный оборот обособляется независимо от того, стоит он до или после местоимения.'
  },
  {
    title: 'Причастный оборот до определяемого слова',
    instruction: 'Расставь запятые. Выполни все 8 примеров серии.',
    type: 'punctSet',
    items: [
      {words:['Освещённая','утренним','солнцем','поляна','сияла'],expected:[]},
      {words:['Укрытая','густым','туманом','река','едва','виднелась'],expected:[]},
      {words:['Опавшие','ночью','листья','шуршали','под','ногами'],expected:[]},
      {words:['Прочитанная','накануне','книга','изменила','моё','мнение'],expected:[]},
      {words:['Посаженные','весной','деревья','быстро','прижились'],expected:[]},
      {words:['Вымытая','ночным','дождём','дорога','блестела'],expected:[]},
      {words:['Забытый','на','скамейке','рюкзак','нашли','утром'],expected:[]},
      {words:['Выполненная','без','ошибок','работа','получила','высший','балл'],expected:[]}
    ],
    hint: 'Обычный причастный оборот перед определяемым существительным не обособляется: «освещённая солнцем поляна». В этих примерах добавочного причинного или уступительного значения нет.'
  },
  {
    title: 'Причастный оборот после определяемого слова',
    instruction: 'Расставь запятые. Выполни все 8 примеров серии.',
    type: 'punctSet',
    items: [
      {words:['Поляна','освещённая','утренним','солнцем','сияла'],expected:[0,3]},
      {words:['Река','укрытая','густым','туманом','едва','виднелась'],expected:[0,3]},
      {words:['Листья','опавшие','ночью','шуршали','под','ногами'],expected:[0,2]},
      {words:['Книга','прочитанная','накануне','изменила','моё','мнение'],expected:[0,2]},
      {words:['Деревья','посаженные','весной','быстро','прижились'],expected:[0,2]},
      {words:['Дорога','вымытая','ночным','дождём','блестела'],expected:[0,3]},
      {words:['Рюкзак','забытый','на','скамейке','нашли','утром'],expected:[0,3]},
      {words:['Работа','выполненная','без','ошибок','получила','высший','балл'],expected:[0,3]}
    ],
    hint: 'Причастный оборот после определяемого существительного обособляется. Если предложение продолжается, нужны две запятые: одна открывает, другая закрывает оборот.'
  },
  {
    title: 'Одиночное деепричастие: 8 примеров',
    instruction: 'Расставь запятые. Выполни все 8 примеров серии.',
    type: 'punctSet',
    items: [
      {words:['Улыбаясь','девочка','вошла','в','класс'],expected:[0]},
      {words:['Мальчик','задумался','нахмурившись'],expected:[1]},
      {words:['Он','ответил','подумав'],expected:[1]},
      {words:['Ребята','смеясь','выбежали','во','двор'],expected:[0,1]},
      {words:['Замолчав','ученик','сел','на','место'],expected:[0]},
      {words:['Птица','взлетела','испугавшись'],expected:[1]},
      {words:['Оглянувшись','Матвей','увидел','друга'],expected:[0]},
      {words:['Отдохнув','путешественники','продолжили','путь'],expected:[0]}
    ],
    hint: 'Если одиночное деепричастие называет отдельное добавочное действие, оно обособляется: «Он ответил, подумав» — сначала подумал, затем ответил.'
  },
  {
    title: 'Когда бывшее деепричастие стало наречием',
    instruction: 'Изучи алгоритм и ответь на контрольный вопрос.',
    type: 'algorithm',
    hint: 'Главный смысловой тест: отдельное действие требует запятой, образ действия — нет. Сравни: «Он шёл, оглядываясь» (шёл и оглядывался) — «Он читал лёжа» (читал как? лёжа).'
  },
  {
    title: 'Наречное значение: 5 примеров',
    instruction: 'Поставь запятые, только если они нужны.',
    type: 'punctSet',
    items: [
      {words:['Он','отвечал','нехотя'],expected:[],note:'Верно: «нехотя» означает «неохотно» и называет образ действия.'},
      {words:['Дети','читали','лёжа'],expected:[],note:'Верно: «лёжа» отвечает на вопрос «как читали?» и не называет отдельного действия.'},
      {words:['Мы','разговаривали','стоя'],expected:[],note:'Верно: «стоя» здесь характеризует способ разговора, запятая не нужна.'},
      {words:['Он','решил','задачу','шутя'],expected:[],note:'Верно: «шутя» близко по смыслу к наречию «легко», запятая не нужна.'},
      {words:['Она','слушала','молча'],expected:[],note:'Верно: «молча» — наречие со значением образа действия.'}
    ],
    hint: 'Спроси «как совершается основное действие?», попробуй заменить слово наречием и проверь, нет ли отдельного добавочного действия. Если это характеристика способа действия, запятая не ставится.'
  },
  {
    title: 'Деепричастный оборот: 8 примеров',
    instruction: 'Расставь запятые. Выполни все 8 примеров серии.',
    type: 'punctSet',
    items: [
      {words:['Закончив','сложную','задачу','Матвей','проверил','решение'],expected:[2]},
      {words:['Подойдя','к','окну','девочка','раздвинула','шторы'],expected:[2]},
      {words:['Мальчик','шёл','насвистывая','знакомую','мелодию'],expected:[1]},
      {words:['Он','закрыл','дверь','выходя','из','комнаты'],expected:[2]},
      {words:['Свернув','с','дороги','путники','вышли','к','реке'],expected:[2]},
      {words:['Ученики','работали','не','отвлекаясь','на','шум'],expected:[1]},
      {words:['Проверив','все','ответы','Матвей','сдал','работу'],expected:[2]},
      {words:['Собака','лежала','у','двери','положив','голову','на','лапы'],expected:[3]}
    ],
    hint: 'Найди деепричастие и все зависимые от него слова. Весь оборот отделяется от основной части предложения одной или двумя запятыми — в зависимости от места.'
  },
  {
    title: 'Проверочная работа: смешанные случаи',
    instruction: 'Поставь знаки, определи конструкцию, а без запятых — выдели её границы.',
    type: 'mixedSet',
    items: [
      {words:['Утомлённый','долгой','дорогой','он','сразу','уснул'],expected:[2],kind:'participle',note:'Причастный оборот относится к личному местоимению «он» и обособляется.'},
      {words:['Освещённая','солнцем','поляна','сияла'],expected:[],kind:'participle',boundary:[0,1],note:'Причастный оборот стоит перед существительным «поляна»: запятых нет, границы — «освещённая солнцем».'},
      {words:['Поляна','освещённая','солнцем','сияла'],expected:[0,2],kind:'participle',note:'Причастный оборот после существительного «поляна» обособляется с двух сторон.'},
      {words:['Улыбаясь','девочка','вошла','в','класс'],expected:[0],kind:'singleGerund',note:'Одиночное деепричастие «улыбаясь» называет добавочное действие и обособляется.'},
      {words:['Дети','читали','лёжа'],expected:[],kind:'adverb',boundary:[2],note:'«Лёжа» обозначает образ действия, близко к наречию; запятая не нужна.'},
      {words:['Закончив','сложную','задачу','Матвей','проверил','решение'],expected:[2],kind:'gerund',note:'Деепричастный оборот в начале предложения отделяется одной запятой.'},
      {words:['Матвей','сдал','работу','проверив','все','ответы'],expected:[2],kind:'gerund',note:'Деепричастный оборот после основной части отделяется одной запятой.'},
      {words:['Посаженные','весной','деревья','быстро','прижились'],expected:[],kind:'participle',boundary:[0,1],note:'Оборот перед существительным не обособляется; границы — «посаженные весной».'},
      {words:['Он','увлечённый','чтением','не','услышал','звонка'],expected:[0,2],kind:'participle',note:'Оборот относится к личному местоимению «он», поэтому обособляется.'},
      {words:['Ребята','смеясь','выбежали','во','двор'],expected:[0,1],kind:'singleGerund',note:'Одиночное деепричастие внутри предложения обособляется с двух сторон.'}
    ],
    hint: 'Работай по шагам: 1) найди конструкцию и её границы; 2) определи её вид; 3) примени правило обособления; 4) если запятых нет, выдели слова конструкции.'
  },
  {
    title: 'Выделяем причастие и причастный оборот',
    instruction: 'Выбери режим, затем нажми на все слова нужной конструкции.',
    type: 'select',
    modes: [['turnover','Причастный оборот'],['head','Только причастие']],
    items: [
      {label:'Предложение 1', words:['На','столе','лежала','книга','забытая','рассеянным','учеником'], punctuation:{3:',',6:'.'}, answers:{turnover:[4,5,6],head:[4]}},
      {label:'Предложение 2', words:['Мы','увидели','освещённую','солнцем','поляну'], punctuation:{4:'.'}, answers:{turnover:[2,3],head:[2]}}
    ],
    hint: 'Сначала найди причастие — слово с признаком по действию. Затем добавь зависимые от него слова. Определяемое существительное в оборот не входит.'
  },
  {
    title: 'Выделяем деепричастные конструкции',
    instruction: 'Отметь оборот целиком, а затем — одиночное деепричастие.',
    type: 'select',
    modes: [['gerundTurnover','Деепричастный оборот'],['singleGerund','Одиночное деепричастие']],
    items: [
      {label:'Предложение 1', words:['Закончив','сложную','задачу','Матвей','проверил','решение'], punctuation:{2:',',5:'.'}, answers:{gerundTurnover:[0,1,2],singleGerund:[]}},
      {label:'Предложение 2', words:['Матвей','ответил','улыбаясь'], punctuation:{1:',',2:'.'}, answers:{gerundTurnover:[],singleGerund:[2]}}
    ],
    hint: 'У деепричастного оборота есть зависимые слова: «закончив (что?) задачу», «задачу (какую?) сложную». В слове «улыбаясь» зависимых слов нет — это одиночное деепричастие.'
  },
  {
    title: 'Финиш: собираем правила вместе',
    instruction: 'Выбери верный разбор предложения.',
    type: 'summary',
    hint: 'Проверь три шага: кто выполняет оба действия; где границы оборотов; стоит ли причастный оборот после определяемого слова.'
  }
];

const state = screens.map(() => ({checked:false, passed:false, selections:{}, gaps:new Set(), activeMode:null, drillIndex:0, drillStates:[]}));
let current = 0;

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function fitApp(){
  const scale = Math.min(window.innerWidth/1280, window.innerHeight/720);
  const wrap = $('#scaled-wrap');
  wrap.style.width = `${1280*scale}px`;
  wrap.style.height = `${720*scale}px`;
  $('#app').style.transform = `scale(${scale})`;
}

function render(){
  const s = screens[current], st = state[current];
  const isSeries = s.type === 'punctSet' || s.type === 'mixedSet' || s.type === 'formationSet';
  const ds = isSeries ? getDrillState(st,st.drillIndex) : null;
  $('#screenTitle').textContent = s.title;
  $('#instruction').textContent = s.instruction;
  $('#progressText').textContent = isSeries ? `${current+1} / ${screens.length} · ${st.drillIndex+1} / ${s.items.length}` : `${current+1} / ${screens.length}`;
  $('#progressFill').style.width = `${(current+1)/screens.length*100}%`;
  $('#checkBtn').textContent = s.type === 'ruleIntro' ? 'Правило понятно' : 'Проверить';
  $('#backBtn').disabled = current === 0 && st.drillIndex === 0;
  $('#nextBtn').disabled = isSeries ? !ds.passed : !st.passed;
  $('#nextBtn').textContent = current === screens.length-1 ? 'Сначала ↻' : isSeries && st.drillIndex < s.items.length-1 ? 'Следующий →' : 'Дальше →';
  const ws = $('#workspace');
  ws.className = 'workspace fadein';
  ws.innerHTML = '';
  if(s.type === 'ruleIntro') renderRuleIntro(ws);
  if(s.type === 'formation') renderFormation(ws,s,st);
  if(s.type === 'formationSet') renderFormationSet(ws,s.items[st.drillIndex],ds,{index:st.drillIndex,total:s.items.length},s);
  if(s.type === 'classify') renderClassify(ws,s,st);
  if(s.type === 'punct') renderPunct(ws,s,st);
  if(s.type === 'punctSet') renderPunct(ws,s.items[st.drillIndex],ds,{index:st.drillIndex,total:s.items.length});
  if(s.type === 'mixedSet') renderMixed(ws,s.items[st.drillIndex],ds,{index:st.drillIndex,total:s.items.length});
  if(s.type === 'algorithm') renderAlgorithm(ws,s,st);
  if(s.type === 'select') renderSelect(ws,s,st);
  if(s.type === 'summary') renderSummary(ws,s,st);
  const goodMessage = isSeries
    ? (s.items[st.drillIndex].note || (st.drillIndex === s.items.length-1 ? 'Верно! Серия завершена.' : 'Верно! Переходи к следующему примеру.'))
    : null;
  addStatus(ws, isSeries ? ds : st, goodMessage);
}

function renderRuleIntro(ws){
  const wrap=document.createElement('div');wrap.className='rule-intro';
  wrap.innerHTML=`
    <div class="rule-path">
      <div class="rule-path-head"><span class="rule-number">1</span><div><b>Определи вид глагола</b><small>Что делая? — НСВ · Что сделав? — СВ</small></div></div>
      <div class="rule-columns">
        <div class="rule-kind nsv"><strong>Несовершенный вид</strong><span>Основа настоящего времени</span><div class="formula">основа + <b>-а- / -я-</b></div><em>решают → решая<br>сидят → сидя</em></div>
        <div class="rule-kind sv"><strong>Совершенный вид</strong><span>Основа инфинитива или прошедшего времени</span><div class="formula">основа + <b>-в- / -вши- / -ши-</b></div><em>решить → решив<br>умыться → умывшись</em></div>
      </div>
    </div>
    <div class="rule-footer"><span class="rule-number">2</span><p><b>Сохрани вид и возвратность.</b> Постфикс <b>-сь</b> не исчезает. Некоторые глаголы нормативного деепричастия не образуют — это проверим отдельно.</p></div>`;
  ws.append(wrap);
}

function getDrillState(st,index){
  if(!st.drillStates[index])st.drillStates[index]={checked:false,passed:false,gaps:new Set(),selectedType:null,tokens:new Set(),choice:null};
  const ds=st.drillStates[index];
  if(!ds.tokens)ds.tokens=new Set();
  return ds;
}

function renderFormation(ws,s,st){
  const list = document.createElement('div'); list.className='formation-list';
  s.rows.forEach((row,i)=>{
    const el=document.createElement('div'); el.className='formation-row';
    el.innerHTML=`<div class="source-word">${row[0]}</div><div class="arrow">→</div><div class="option-set"></div>`;
    row[1].forEach(value=>{
      const b=document.createElement('button'); b.type='button'; b.className='option'; b.textContent=value;
      if(st.selections[i]===value) b.classList.add('selected');
      if(st.checked){ b.classList.toggle('correct',value===row[2]); b.classList.toggle('incorrect',st.selections[i]===value&&value!==row[2]); }
      b.onclick=()=>{st.checked=false;st.selections[i]=value;render();};
      $('.option-set',el).append(b);
    }); list.append(el);
  }); ws.append(list);
  if(s.ruleNote){const note=document.createElement('div');note.className='formation-rule-note';note.innerHTML=s.ruleNote;ws.append(note);}
}

function renderFormationSet(ws,item,st,meta,s){
  const wrap=document.createElement('div');wrap.className='formation-drill';
  wrap.innerHTML=`<div class="punct-label">Глагол ${meta.index+1} из ${meta.total}</div><div class="formation-focus"><div class="formation-verb">${item[0]}</div><div class="formation-arrow">→</div><div class="formation-options"></div></div>`;
  item[1].forEach(value=>{const b=document.createElement('button');b.type='button';b.className='option';b.textContent=value;if(st.choice===value)b.classList.add('selected');if(st.checked){b.classList.toggle('correct',value===item[2]);b.classList.toggle('incorrect',st.choice===value&&value!==item[2]);}b.onclick=()=>{st.checked=false;st.passed=false;st.choice=value;render();};$('.formation-options',wrap).append(b);});
  const note=document.createElement('div');note.className='formation-series-rule';note.innerHTML=s.ruleNote;wrap.append(note);ws.append(wrap);
}

function renderClassify(ws,s,st){
  const grid=document.createElement('div'); grid.className='class-grid';
  s.rows.forEach((row,i)=>{
    const card=document.createElement('div'); card.className='class-card';
    card.innerHTML=`<div class="class-word"><b>${row[0]}</b><span>${row[1]}</span></div>`;
    [['yes','Образуется'],['no','Не образуется']].forEach(([value,label])=>{
      const b=document.createElement('button'); b.type='button'; b.className='small-option'; b.textContent=label;
      if(st.selections[i]===value)b.classList.add('selected');
      if(st.checked){b.classList.toggle('correct',value===row[2]);b.classList.toggle('incorrect',st.selections[i]===value&&value!==row[2]);}
      b.onclick=()=>{st.checked=false;st.selections[i]=value;render();};card.append(b);
    }); grid.append(card);
  });ws.append(grid);
}

function renderPunct(ws,s,st,meta=null){
  const wrap=document.createElement('div');wrap.className='punct-wrap';
  wrap.innerHTML=`<div class="punct-label">${meta?`Пример ${meta.index+1} из ${meta.total}`:'Предложение'}</div>`;
  const line=document.createElement('div');line.className='sentence-line';
  s.words.forEach((word,i)=>{
    const w=document.createElement('span');w.className='word';w.textContent=word;line.append(w);
    if(i<s.words.length-1){
      const g=document.createElement('button');g.type='button';g.className='gap';g.setAttribute('aria-label',`Запятая после слова «${word}»`);
      if(st.gaps.has(i))g.classList.add('active');
      if(st.checked){const expected=s.expected.includes(i);if(expected&&st.gaps.has(i))g.classList.add('correct');if(expected!==st.gaps.has(i))g.classList.add('incorrect');}
      g.onclick=()=>{st.checked=false;st.passed=false;st.gaps.has(i)?st.gaps.delete(i):st.gaps.add(i);render();};line.append(g);
    }
  });const p=document.createElement('span');p.className='period';p.textContent='.';line.append(p);wrap.append(line);
  const tip=document.createElement('div');tip.className='punct-tip';tip.innerHTML='<span class="legend-dot"></span>Точка между словами — место, где можно поставить запятую.';wrap.append(tip);ws.append(wrap);
}

function renderMixed(ws,item,st,meta){
  const kinds=[['participle','Причастный оборот'],['gerund','Деепричастный оборот'],['singleGerund','Одиночное деепричастие'],['adverb','Наречное значение']];
  const wrap=document.createElement('div');wrap.className='mixed-wrap';
  wrap.innerHTML=`<div class="punct-label">Проверка · ${meta.index+1} из ${meta.total}</div>`;
  const line=document.createElement('div');line.className='mixed-sentence';
  item.words.forEach((word,i)=>{
    const w=document.createElement('button');w.type='button';w.className='mixed-word';w.textContent=word;
    const needsBoundary=item.expected.length===0;
    w.disabled=!needsBoundary;
    if(st.tokens.has(i))w.classList.add('selected');
    if(st.checked&&needsBoundary){const expected=item.boundary.includes(i),selected=st.tokens.has(i);if(expected&&selected)w.classList.add('correct');if(expected!==selected&&(expected||selected))w.classList.add('incorrect');}
    w.onclick=()=>{st.checked=false;st.passed=false;st.tokens.has(i)?st.tokens.delete(i):st.tokens.add(i);render();};line.append(w);
    if(i<item.words.length-1){
      const g=document.createElement('button');g.type='button';g.className='gap';g.setAttribute('aria-label',`Запятая после слова «${word}»`);
      if(st.gaps.has(i))g.classList.add('active');
      if(st.checked){const expected=item.expected.includes(i);if(expected&&st.gaps.has(i))g.classList.add('correct');if(expected!==st.gaps.has(i))g.classList.add('incorrect');}
      g.onclick=()=>{st.checked=false;st.passed=false;st.gaps.has(i)?st.gaps.delete(i):st.gaps.add(i);render();};line.append(g);
    }
  });const period=document.createElement('span');period.className='period';period.textContent='.';line.append(period);wrap.append(line);
  const task=document.createElement('div');task.className='mixed-task';
  task.innerHTML='<b>Что перед тобой?</b><div class="mixed-kinds"></div>';
  kinds.forEach(([value,label])=>{const b=document.createElement('button');b.type='button';b.className='mixed-kind';b.textContent=label;if(st.selectedType===value)b.classList.add('selected');if(st.checked){b.classList.toggle('correct',value===item.kind);b.classList.toggle('incorrect',st.selectedType===value&&value!==item.kind);}b.onclick=()=>{st.checked=false;st.passed=false;st.selectedType=value;render();};$('.mixed-kinds',task).append(b);});wrap.append(task);
  const note=document.createElement('div');note.className='mixed-boundary';
  note.innerHTML=item.expected.length===0?'<b>Запятые не нужны.</b> Нажми на слова конструкции, чтобы показать её границы.':'Сначала расставь запятые, затем выбери вид обособляемой конструкции.';
  wrap.append(note);ws.append(wrap);
}

function renderAlgorithm(ws,s,st){
  const wrap=document.createElement('div');wrap.className='algorithm-wrap';
  wrap.innerHTML=`
    <div class="algorithm-grid">
      <div class="algorithm-step"><b>1. Ищи отдельное действие</b><span>Можно сказать: «он делал одно и одновременно делал другое»?</span></div>
      <div class="algorithm-step"><b>2. Проверь зависимые слова</b><span>Зависимые слова и сохранённое управление — сильные признаки деепричастия.</span></div>
      <div class="algorithm-step"><b>3. Задай вопрос «как?»</b><span>Если слово называет только способ действия и заменяется наречием, оно получило наречное значение.</span></div>
      <div class="algorithm-step"><b>4. Выбери знак</b><span>Добавочное действие — обособляем. Только образ действия — запятую не ставим.</span></div>
    </div>
    <div class="algorithm-test"><div><b>Он решил задачу шутя.</b><span>«Шутя» близко по смыслу к слову «легко». Нужна ли запятая?</span></div><div class="algorithm-options"></div></div>`;
  [['comma','Нужна'],['none','Не нужна']].forEach(([value,label])=>{
    const b=document.createElement('button');b.type='button';b.className='small-option';b.textContent=label;
    if(st.selections.algorithm===value)b.classList.add('selected');
    if(st.checked){b.classList.toggle('correct',value==='none');b.classList.toggle('incorrect',st.selections.algorithm===value&&value!=='none');}
    b.onclick=()=>{st.checked=false;st.passed=false;st.selections.algorithm=value;render();};$('.algorithm-options',wrap).append(b);
  });ws.append(wrap);
}

function renderSelect(ws,s,st){
  if(!st.activeMode)st.activeMode=s.modes[0][0];
  s.items.forEach((_,itemIndex)=>s.modes.forEach(([mode])=>{
    const key=`${itemIndex}:${mode}`;
    if(st.selections[key]===undefined)st.selections[key]=[];
  }));
  const bar=document.createElement('div');bar.className='mode-bar';
  s.modes.forEach(([value,label])=>{const b=document.createElement('button');b.type='button';b.className='mode-btn';b.dataset.mode=value;b.textContent=label;if(st.activeMode===value)b.classList.add('active');b.onclick=()=>{st.activeMode=value;render();};bar.append(b);});ws.append(bar);
  s.items.forEach((item,itemIndex)=>{
    const card=document.createElement('div');card.className='selection-card';card.innerHTML=`<div class="selection-label">${item.label}</div>`;
    const line=document.createElement('div');line.className='token-line';
    item.words.forEach((word,wordIndex)=>{
      const key=`${itemIndex}:${st.activeMode}`;const picked=st.selections[key]||[];
      const b=document.createElement('button');b.type='button';b.className='select-token';b.textContent=word;
      if(picked.includes(wordIndex))b.classList.add(`sel-${st.activeMode}`);
      if(st.checked){const allModes=s.modes.map(m=>m[0]);const isWrong=allModes.some(mode=>(st.selections[`${itemIndex}:${mode}`]||[]).includes(wordIndex)!==item.answers[mode].includes(wordIndex));const isAnswered=allModes.some(mode=>(st.selections[`${itemIndex}:${mode}`]||[]).includes(wordIndex)||item.answers[mode].includes(wordIndex));if(isWrong)b.classList.add('incorrect');else if(isAnswered)b.classList.add('correct');}
      b.onclick=()=>{st.checked=false;const arr=st.selections[key]||[];st.selections[key]=arr.includes(wordIndex)?arr.filter(x=>x!==wordIndex):[...arr,wordIndex];render();};line.append(b);
      if(item.punctuation[wordIndex]){const q=document.createElement('span');q.className='token-punct';q.textContent=item.punctuation[wordIndex];line.append(q);}
    });card.append(line);ws.append(card);
  });
}

function renderSummary(ws,s,st){
  const wrap=document.createElement('div');wrap.className='summary';
  wrap.innerHTML=`
    <div class="summary-card"><h3>Как образовать</h3><p><b>НСВ:</b> чаще -а- / -я-: читая, сидя.</p><p><b>СВ:</b> чаще -в-, -вши-, -ши-: решив, умывшись.</p></div>
    <div class="summary-card"><h3>Как обособить</h3><p>Деепричастия и деепричастные обороты обычно обособляются.</p><p>Причастный оборот после определяемого слова — тоже.</p></div>
    <div class="summary-card final-task"><p>«Ребята, вернувшиеся из похода, улыбаясь, вошли в дом».<br><span style="font-size:16px;color:var(--muted)">Сколько конструкций выделено запятыми?</span></p><div class="final-options"></div></div>`;
  const answers=[['Одна','1'],['Две','2'],['Три','3']];
  answers.forEach(([label,value])=>{const b=document.createElement('button');b.type='button';b.className='option';b.textContent=label;if(st.selections.final===value)b.classList.add('selected');if(st.checked){b.classList.toggle('correct',value==='2');b.classList.toggle('incorrect',st.selections.final===value&&value!=='2');}b.onclick=()=>{st.checked=false;st.selections.final=value;render();};$('.final-options',wrap).append(b);});ws.append(wrap);
}

function arraysEqual(a,b){return a.length===b.length&&[...a].sort((x,y)=>x-y).every((v,i)=>v===[...b].sort((x,y)=>x-y)[i]);}
function isComplete(s,st){
  if(s.type==='formation'||s.type==='classify')return s.rows.every((_,i)=>st.selections[i]!==undefined);
  if(s.type==='algorithm')return st.selections.algorithm!==undefined;
  if(s.type==='select')return s.items.every((_,i)=>s.modes.every(([m])=>st.selections[`${i}:${m}`]!==undefined));
  if(s.type==='summary')return st.selections.final!==undefined;
  return true;
}
function isCorrect(s,st){
  if(s.type==='ruleIntro')return true;
  if(s.type==='formation')return s.rows.every((r,i)=>st.selections[i]===r[2]);
  if(s.type==='classify')return s.rows.every((r,i)=>st.selections[i]===r[2]);
  if(s.type==='punct')return arraysEqual([...st.gaps],s.expected);
  if(s.type==='algorithm')return st.selections.algorithm==='none';
  if(s.type==='select')return s.items.every((item,i)=>s.modes.every(([m])=>arraysEqual(st.selections[`${i}:${m}`]||[],item.answers[m])));
  if(s.type==='summary')return st.selections.final==='2';
}
function addStatus(ws,st,goodMessage=null){
  if(!st.checked)return;
  const box=document.createElement('div');box.className=`status ${st.passed?'good':'bad'}`;
  box.textContent=st.passed?(goodMessage||(current===screens.length-1?'Отлично! Причастный оборот и одиночное деепричастие выделены отдельно. Тренажёр пройден.':'Верно! Можно переходить дальше.')):'Пока есть неточность. Исправь отмеченные места или открой подсказку.';ws.append(box);
}
function check(){
  const s=screens[current],st=state[current];
  if(s.type==='formationSet'){
    const ds=getDrillState(st,st.drillIndex),item=s.items[st.drillIndex];
    ds.checked=true;ds.passed=ds.choice===item[2];render();return;
  }
  if(s.type==='punctSet'){
    const ds=getDrillState(st,st.drillIndex),item=s.items[st.drillIndex];
    ds.checked=true;ds.passed=arraysEqual([...ds.gaps],item.expected);render();return;
  }
  if(s.type==='mixedSet'){
    const ds=getDrillState(st,st.drillIndex),item=s.items[st.drillIndex];
    const boundaryOk=item.expected.length>0||arraysEqual([...ds.tokens],item.boundary);
    ds.checked=true;ds.passed=arraysEqual([...ds.gaps],item.expected)&&ds.selectedType===item.kind&&boundaryOk;render();return;
  }
  st.checked=true;
  if(!isComplete(s,st)){st.passed=false;render();const box=$('.status');if(box)box.textContent='Сначала выполни все части задания.';return;}
  st.passed=isCorrect(s,st);render();
}

$('#checkBtn').onclick=check;
$('#backBtn').onclick=()=>{const s=screens[current],st=state[current],isSeries=s.type==='punctSet'||s.type==='mixedSet'||s.type==='formationSet';if(isSeries&&st.drillIndex>0)st.drillIndex--;else if(current>0)current--;render();};
$('#nextBtn').onclick=()=>{
  const s=screens[current],st=state[current];
  if(s.type==='punctSet'||s.type==='mixedSet'||s.type==='formationSet'){
    const ds=getDrillState(st,st.drillIndex);if(!ds.passed)return;
    if(st.drillIndex<s.items.length-1){st.drillIndex++;render();return;}
    st.passed=true;
  }else if(!st.passed)return;
  if(current===screens.length-1){state.forEach(x=>{x.checked=false;x.passed=false;x.selections={};x.gaps=new Set();x.activeMode=null;x.drillIndex=0;x.drillStates=[];});current=0;}else current++;render();
};
$('#hintBtn').onclick=()=>{$('#hintText').textContent=screens[current].hint;$('#hintOverlay').classList.remove('hidden');$('#closeHint').focus();};
$('#closeHint').onclick=()=>{$('#hintOverlay').classList.add('hidden');$('#hintBtn').focus();};
$('#hintOverlay').onclick=e=>{if(e.target.id==='hintOverlay')$('#closeHint').click();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#hintOverlay').classList.contains('hidden'))$('#closeHint').click();});
window.addEventListener('resize',fitApp);
fitApp();render();
