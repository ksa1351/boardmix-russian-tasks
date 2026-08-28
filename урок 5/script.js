const ROLE = {
  subject: { label: 'Подлежащее', question: 'кто? что?' },
  predicate: { label: 'Сказуемое', question: 'что делает? каков?' },
  attribute: { label: 'Определение', question: 'какой? чей?' },
  object: { label: 'Дополнение', question: 'кого? чего? кому?' },
  adverbial: { label: 'Обстоятельство', question: 'где? когда? как?' },
  service: { label: 'Не член предложения', question: 'предлог, союз, частица' }
};

const S = (words, punct = {}) => ({
  words: words.map(([text, role]) => ({ text, role })),
  punct
});

const categories = [
  {
    title: 'Простое распространённое предложение',
    instruction: 'Выберите роль, затем нажмите на каждое слово предложения.',
    note: 'Найдите грамматическую основу, затем задайте вопросы к второстепенным членам.',
    hint: 'Сначала найдите подлежащее и сказуемое. От них задавайте вопросы: определение обозначает признак предмета, дополнение — объект действия, обстоятельство — место, время, причину или образ действия. Предлоги, союзы и частицы не являются членами предложения.',
    items: [
      S([['Раннее','attribute'],['солнце','subject'],['осветило','predicate'],['тихую','attribute'],['улицу','object']]),
      S([['Маленький','attribute'],['щенок','subject'],['весело','adverbial'],['гонял','predicate'],['красный','attribute'],['мяч','object']]),
      S([['Вчера','adverbial'],['сильный','attribute'],['ветер','subject'],['сломал','predicate'],['старую','attribute'],['ветку','object']]),
      S([['Моя','attribute'],['сестра','subject'],['быстро','adverbial'],['решила','predicate'],['трудную','attribute'],['задачу','object']]),
      S([['Утром','adverbial'],['школьники','subject'],['посадили','predicate'],['молодые','attribute'],['деревья','object']]),
      S([['Серый','attribute'],['кот','subject'],['внимательно','adverbial'],['наблюдал','predicate'],['за','service'],['птицами','object']]),
      S([['На','service'],['поляне','adverbial'],['яркие','attribute'],['цветы','subject'],['привлекали','predicate'],['пчёл','object']]),
      S([['Тёплый','attribute'],['дождь','subject'],['освежил','predicate'],['пыльные','attribute'],['дороги','object']]),
      S([['Бабушка','subject'],['вечером','adverbial'],['испекла','predicate'],['яблочный','attribute'],['пирог','object']]),
      S([['Юный','attribute'],['музыкант','subject'],['уверенно','adverbial'],['исполнил','predicate'],['сложную','attribute'],['пьесу','object']]),
      S([['За','service'],['окном','adverbial'],['медленно','adverbial'],['падал','predicate'],['пушистый','attribute'],['снег','subject']]),
      S([['Дети','subject'],['во','service'],['дворе','adverbial'],['построили','predicate'],['снежную','attribute'],['крепость','object']]),
      S([['Опытный','attribute'],['врач','subject'],['внимательно','adverbial'],['осмотрел','predicate'],['пациента','object']]),
      S([['Наша','attribute'],['команда','subject'],['одержала','predicate'],['важную','attribute'],['победу','object']]),
      S([['Старый','attribute'],['фонарь','subject'],['тускло','adverbial'],['освещал','predicate'],['пустой','attribute'],['переулок','object']])
    ]
  },
  {
    title: 'Тире между подлежащим и сказуемым',
    instruction: 'Разберите предложение. Тире уже поставлено — определите роли слов.',
    note: 'В этих примерах главные члены выражены существительными или сочетаниями с ними.',
    hint: 'Если подлежащее и именная часть сказуемого выражены существительными в именительном падеже, между ними обычно ставится тире. Сначала выделите подлежащее, затем сказуемое; слова, зависящие от существительных, чаще всего являются определениями.',
    items: [
      S([['Москва','subject'],['столица','predicate'],['России','attribute']], {0:'—'}),
      S([['Чтение','subject'],['полезная','attribute'],['привычка','predicate']], {0:'—'}),
      S([['Моя','attribute'],['цель','subject'],['успешная','attribute'],['учёба','predicate']], {1:'—'}),
      S([['Сентябрь','subject'],['первый','attribute'],['осенний','attribute'],['месяц','predicate']], {0:'—'}),
      S([['Собака','subject'],['верный','attribute'],['друг','predicate'],['человека','attribute']], {0:'—'}),
      S([['Волга','subject'],['крупнейшая','attribute'],['река','predicate'],['Европы','attribute']], {0:'—'}),
      S([['Знание','subject'],['надёжная','attribute'],['опора','predicate'],['человека','attribute']], {0:'—'}),
      S([['Дружба','subject'],['большая','attribute'],['жизненная','attribute'],['ценность','predicate']], {0:'—'}),
      S([['Байкал','subject'],['глубочайшее','attribute'],['озеро','predicate'],['мира','attribute']], {0:'—'}),
      S([['Математика','subject'],['точная','attribute'],['наука','predicate']], {0:'—'}),
      S([['Спорт','subject'],['источник','predicate'],['силы','attribute'],['и','service'],['здоровья','attribute']], {0:'—'}),
      S([['Книга','subject'],['лучший','attribute'],['подарок','predicate'],['читателю','object']], {0:'—'}),
      S([['Терпение','subject'],['важное','attribute'],['качество','predicate'],['человека','attribute']], {0:'—'}),
      S([['Зима','subject'],['любимое','attribute'],['время','predicate'],['лыжников','attribute']], {0:'—'}),
      S([['Честность','subject'],['основа','predicate'],['доверия','attribute']], {0:'—'})
    ]
  },
  {
    title: 'Сложное предложение',
    instruction: 'Найдите грамматические основы обеих частей и определите роль каждого слова.',
    note: '«Который» — союзное слово: оно является членом придаточного предложения.',
    hint: 'В сложном предложении найдите грамматическую основу каждой части. Союзы и, а, или, что не являются членами предложения. Союзное слово который заменяет существительное и выполняет в придаточной части роль подлежащего или дополнения.',
    items: [
      S([['Солнце','subject'],['поднялось','predicate'],['и','service'],['туман','subject'],['рассеялся','predicate']], {1:','}),
      S([['Ветер','subject'],['стих','predicate'],['а','service'],['море','subject'],['ещё','adverbial'],['волновалось','predicate']], {1:','}),
      S([['Мы','subject'],['останемся','predicate'],['дома','adverbial'],['или','service'],['друзья','subject'],['позовут','predicate'],['нас','object'],['гулять','object']], {2:','}),
      S([['Учитель','subject'],['сказал','predicate'],['что','service'],['урок','subject'],['начнётся','predicate'],['вовремя','adverbial']], {1:','}),
      S([['Мы','subject'],['увидели','predicate'],['дом','object'],['который','subject'],['стоял','predicate'],['у','service'],['реки','adverbial']], {2:','}),
      S([['Дождь','subject'],['закончился','predicate'],['и','service'],['дети','subject'],['выбежали','predicate'],['во','service'],['двор','adverbial']], {1:','}),
      S([['Я','subject'],['торопился','predicate'],['а','service'],['автобус','subject'],['уже','adverbial'],['уехал','predicate']], {1:','}),
      S([['Ты','subject'],['позвонишь','predicate'],['мне','object'],['или','service'],['я','subject'],['напишу','predicate'],['тебе','object']], {2:','}),
      S([['Мама','subject'],['заметила','predicate'],['что','service'],['окно','subject'],['осталось','predicate'],['открытым','predicate']], {1:','}),
      S([['Я','subject'],['прочитал','predicate'],['книгу','object'],['которую','object'],['посоветовал','predicate'],['учитель','subject']], {2:','})
    ]
  },
  {
    title: 'Причастный оборот перед существительным',
    instruction: 'Разберите предложение и обратите внимание на причину обособления определения.',
    note: 'Перед существительным оборот обособлен, потому что имеет добавочное обстоятельственное значение причины.',
    hint: 'Обычный причастный оборот перед определяемым существительным не обособляется. Но запятые нужны, если оборот имеет добавочное значение причины или уступки: путник уснул, потому что был утомлён дорогой. Само причастие — определение, зависимые слова разбираются отдельно.',
    items: [
      S([['Утомлённый','attribute'],['долгой','attribute'],['дорогой','object'],['путник','subject'],['быстро','adverbial'],['уснул','predicate']], {2:','}),
      S([['Ослеплённый','attribute'],['ярким','attribute'],['светом','object'],['водитель','subject'],['резко','adverbial'],['затормозил','predicate']], {2:','}),
      S([['Взволнованная','attribute'],['неожиданной','attribute'],['новостью','object'],['девочка','subject'],['долго','adverbial'],['молчала','predicate']], {2:','}),
      S([['Испуганный','attribute'],['громким','attribute'],['шумом','object'],['ребёнок','subject'],['спрятался','predicate'],['за','service'],['мамой','adverbial']], {2:','}),
      S([['Огорчённый','attribute'],['плохой','attribute'],['оценкой','object'],['ученик','subject'],['медленно','adverbial'],['шёл','predicate'],['домой','adverbial']], {2:','}),
      S([['Измученная','attribute'],['долгим','attribute'],['ожиданием','object'],['женщина','subject'],['устало','adverbial'],['опустилась','predicate'],['на','service'],['скамейку','adverbial']], {2:','}),
      S([['Удивлённые','attribute'],['странным','attribute'],['ответом','object'],['ребята','subject'],['молча','adverbial'],['переглянулись','predicate']], {2:','}),
      S([['Обрадованный','attribute'],['хорошей','attribute'],['новостью','object'],['дедушка','subject'],['широко','adverbial'],['улыбнулся','predicate']], {2:','}),
      S([['Застигнутые','attribute'],['сильным','attribute'],['дождём','object'],['туристы','subject'],['быстро','adverbial'],['вернулись','predicate'],['в','service'],['лагерь','adverbial']], {2:','}),
      S([['Утомлённая','attribute'],['напряжённой','attribute'],['работой','object'],['мама','subject'],['рано','adverbial'],['уснула','predicate']], {2:','})
    ]
  },
  {
    title: 'Причастный оборот после существительного',
    instruction: 'Определите роли всех слов внутри и вне обособленного определения.',
    note: 'Распространённое согласованное определение после существительного обособляется.',
    hint: 'Если причастный оборот стоит после определяемого существительного, он обособляется. Причастие выполняет роль определения; зависимые от него слова могут быть определениями, дополнениями или обстоятельствами.',
    items: [
      S([['Дом','subject'],['построенный','attribute'],['молодыми','attribute'],['мастерами','object'],['украсил','predicate'],['центральную','attribute'],['площадь','object']], {0:',',3:','}),
      S([['Книга','subject'],['подаренная','attribute'],['старшим','attribute'],['братом','object'],['лежала','predicate'],['на','service'],['столе','adverbial']], {0:',',3:','}),
      S([['Река','subject'],['покрытая','attribute'],['тонким','attribute'],['льдом','object'],['медленно','adverbial'],['текла','predicate'],['к','service'],['морю','adverbial']], {0:',',3:','}),
      S([['Деревья','subject'],['посаженные','attribute'],['прошлой','attribute'],['весной','adverbial'],['быстро','adverbial'],['выросли','predicate']], {0:',',3:','}),
      S([['Письмо','subject'],['написанное','attribute'],['простым','attribute'],['карандашом','object'],['сохранилось','predicate'],['в','service'],['архиве','adverbial']], {0:',',3:','}),
      S([['Картина','subject'],['созданная','attribute'],['известным','attribute'],['художником','object'],['привлекла','predicate'],['многих','attribute'],['посетителей','object']], {0:',',3:','}),
      S([['Мост','subject'],['разрушенный','attribute'],['сильным','attribute'],['наводнением','object'],['долго','adverbial'],['пустовал','predicate']], {0:',',3:','}),
      S([['Тропа','subject'],['освещённая','attribute'],['полной','attribute'],['луной','object'],['вела','predicate'],['к','service'],['деревне','adverbial']], {0:',',3:','}),
      S([['Решение','subject'],['найденное','attribute'],['внимательным','attribute'],['учеником','object'],['удивило','predicate'],['учителя','object']], {0:',',3:','}),
      S([['Сад','subject'],['окружённый','attribute'],['высокой','attribute'],['оградой','object'],['скрывался','predicate'],['за','service'],['домом','adverbial']], {0:',',3:','})
    ]
  },
  {
    title: 'Причастный оборот при местоимении',
    instruction: 'Разберите предложение: оборот относится к личному местоимению.',
    note: 'Причастный оборот при личном местоимении обособляется независимо от своего места.',
    hint: 'Определение, относящееся к личному местоимению я, ты, он, она, мы, вы, они, обособляется независимо от того, стоит оно до или после местоимения. Причастие остаётся определением.',
    items: [
      S([['Он','subject'],['утомлённый','attribute'],['долгой','attribute'],['дорогой','object'],['быстро','adverbial'],['уснул','predicate']], {0:',',3:','}),
      S([['Она','subject'],['взволнованная','attribute'],['неожиданной','attribute'],['новостью','object'],['долго','adverbial'],['молчала','predicate']], {0:',',3:','}),
      S([['Мы','subject'],['приглашённые','attribute'],['учителем','object'],['на','service'],['встречу','adverbial'],['пришли','predicate'],['вовремя','adverbial']], {0:',',4:','}),
      S([['Они','subject'],['застигнутые','attribute'],['сильным','attribute'],['дождём','object'],['укрылись','predicate'],['под','service'],['навесом','adverbial']], {0:',',3:','}),
      S([['Ты','subject'],['привыкший','attribute'],['к','service'],['ранним','attribute'],['подъёмам','object'],['легко','adverbial'],['проснулся','predicate']], {0:',',4:','}),
      S([['Я','subject'],['поддержанный','attribute'],['верными','attribute'],['друзьями','object'],['продолжил','predicate'],['трудную','attribute'],['работу','object']], {0:',',3:','}),
      S([['Он','subject'],['увлечённый','attribute'],['интересной','attribute'],['книгой','object'],['не','service'],['заметил','predicate'],['времени','object']], {0:',',3:','}),
      S([['Она','subject'],['окружённая','attribute'],['маленькими','attribute'],['детьми','object'],['читала','predicate'],['весёлую','attribute'],['сказку','object']], {0:',',3:','}),
      S([['Мы','subject'],['обрадованные','attribute'],['победой','object'],['команды','attribute'],['громко','adverbial'],['аплодировали','predicate']], {0:',',3:','}),
      S([['Я','subject'],['заинтересованный','attribute'],['новым','attribute'],['проектом','object'],['внимательно','adverbial'],['изучил','predicate'],['документы','object']], {0:',',3:','})
    ]
  },
  {
    title: 'Одиночное деепричастие',
    instruction: 'Назначьте роль каждому слову. Деепричастие обозначает добавочное действие.',
    note: 'Одиночное деепричастие является обстоятельством и обычно обособляется.',
    hint: 'Деепричастие обозначает добавочное действие того же лица или предмета, который выполняет основное действие. В предложении оно является обстоятельством и обычно выделяется запятыми.',
    items: [
      S([['Улыбаясь','adverbial'],['девочка','subject'],['вошла','predicate'],['в','service'],['класс','adverbial']], {0:','}),
      S([['Мальчик','subject'],['задумался','predicate'],['нахмурившись','adverbial']], {1:','}),
      S([['Оглянувшись','adverbial'],['Матвей','subject'],['увидел','predicate'],['друга','object']], {0:','}),
      S([['Он','subject'],['ответил','predicate'],['подумав','adverbial']], {1:','}),
      S([['Ребята','subject'],['смеясь','adverbial'],['выбежали','predicate'],['во','service'],['двор','adverbial']], {0:',',1:','}),
      S([['Замолчав','adverbial'],['ученик','subject'],['сел','predicate'],['на','service'],['место','adverbial']], {0:','}),
      S([['Птица','subject'],['взлетела','predicate'],['испугавшись','adverbial']], {1:','}),
      S([['Войдя','adverbial'],['гость','subject'],['вежливо','adverbial'],['поздоровался','predicate']], {0:','}),
      S([['Она','subject'],['слушала','predicate'],['не','service'],['перебивая','adverbial']], {1:','}),
      S([['Отдохнув','adverbial'],['путешественники','subject'],['продолжили','predicate'],['путь','object']], {0:','})
    ]
  },
  {
    title: 'Деепричастный оборот',
    instruction: 'Разберите всё предложение, включая слова внутри деепричастного оборота.',
    note: 'Деепричастие с зависимыми словами образует обособленное обстоятельство.',
    hint: 'Деепричастный оборот — это деепричастие с зависимыми словами. Весь оборот является обстоятельством и обособляется, но каждое слово внутри него имеет свою синтаксическую роль: деепричастие — обстоятельство, существительное может быть дополнением или обстоятельством, прилагательное — определением.',
    items: [
      S([['Закончив','adverbial'],['сложную','attribute'],['задачу','object'],['Матвей','subject'],['проверил','predicate'],['решение','object']], {2:','}),
      S([['Подойдя','adverbial'],['к','service'],['открытому','attribute'],['окну','adverbial'],['девочка','subject'],['раздвинула','predicate'],['шторы','object']], {3:','}),
      S([['Мальчик','subject'],['шёл','predicate'],['насвистывая','adverbial'],['знакомую','attribute'],['мелодию','object']], {1:','}),
      S([['Прочитав','adverbial'],['интересную','attribute'],['книгу','object'],['школьники','subject'],['обсудили','predicate'],['сюжет','object']], {2:','}),
      S([['Он','subject'],['закрыл','predicate'],['дверь','object'],['выходя','adverbial'],['из','service'],['комнаты','adverbial']], {2:','}),
      S([['Свернув','adverbial'],['с','service'],['узкой','attribute'],['дороги','adverbial'],['путники','subject'],['вышли','predicate'],['к','service'],['реке','adverbial']], {3:','}),
      S([['Ученики','subject'],['работали','predicate'],['не','service'],['отвлекаясь','adverbial'],['на','service'],['громкий','attribute'],['шум','object']], {1:','}),
      S([['Проверив','adverbial'],['все','attribute'],['ответы','object'],['Матвей','subject'],['сдал','predicate'],['работу','object']], {2:','}),
      S([['Собака','subject'],['лежала','predicate'],['у','service'],['двери','adverbial'],['положив','adverbial'],['голову','object'],['на','service'],['лапы','adverbial']], {3:','}),
      S([['Услышав','adverbial'],['добрую','attribute'],['новость','object'],['мама','subject'],['радостно','adverbial'],['улыбнулась','predicate']], {2:','})
    ]
  }
];

const screenTitle = document.getElementById('screenTitle');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const instruction = document.getElementById('instruction');
const workspace = document.getElementById('workspace');
const backBtn = document.getElementById('backBtn');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const hintBtn = document.getElementById('hintBtn');
const hintOverlay = document.getElementById('hintOverlay');
const hintText = document.getElementById('hintText');
const closeHint = document.getElementById('closeHint');

let screen = 0;
const lessonState = categories.map(category => ({
  index: 0,
  activeRole: 'subject',
  attempts: category.items.map(() => ({ assigned: {}, checked: false, passed: false }))
}));

const totalSentences = categories.reduce((sum, category) => sum + category.items.length, 0);
const totalWords = categories.reduce((sum, category) => sum + category.items.reduce((n, item) => n + item.words.length, 0), 0);

function fitApp() {
  const wrap = document.getElementById('scaled-wrap');
  const app = document.getElementById('app');
  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  wrap.style.width = `${1280 * scale}px`;
  wrap.style.height = `${720 * scale}px`;
  app.style.transform = `scale(${scale})`;
}

function statusMarkup(attempt, assignedCount, wordCount) {
  if (attempt.passed) return '<div class="status good">Верно! Все слова разобраны. Можно переходить дальше.</div>';
  if (!attempt.checked) return '<div class="status hidden"></div>';
  if (assignedCount < wordCount) return `<div class="status bad">Назначьте роль каждому слову. Осталось: ${wordCount - assignedCount}.</div>`;
  return '<div class="status bad">Есть неточности. Красным отмечены слова, роль которых нужно пересмотреть.</div>';
}

function renderIntro() {
  screenTitle.textContent = 'Как работать с тренажёром';
  instruction.textContent = 'Для каждого слова выберите его синтаксическую роль.';
  progressText.textContent = `Правило · 1 / ${categories.length + 2}`;
  progressFill.style.width = `${100 / (categories.length + 2)}%`;
  workspace.innerHTML = `
    <div class="intro fadein">
      <h2>Алгоритм синтаксического разбора</h2>
      <div class="intro-grid">
        ${Object.entries(ROLE).map(([key, role]) => `
          <div class="intro-role"><b>${role.label}</b><span>${role.question}</span></div>
        `).join('')}
      </div>
      <div class="intro-rule"><b>1.</b> Найдите грамматическую основу. <b>2.</b> Задайте вопросы к второстепенным членам. <b>3.</b> Предлоги, союзы и частицы отметьте как «не член предложения». <b>4.</b> Выберите роль и нажимайте на слова. Роль можно заменить или снять.</div>
    </div>`;
  backBtn.disabled = true;
  checkBtn.textContent = 'Начать разбор';
  checkBtn.disabled = false;
  nextBtn.disabled = true;
  hintBtn.disabled = false;
}

function renderCategory(categoryIndex) {
  const category = categories[categoryIndex];
  const state = lessonState[categoryIndex];
  const item = category.items[state.index];
  const attempt = state.attempts[state.index];
  const assignedCount = Object.keys(attempt.assigned).length;

  screenTitle.textContent = category.title;
  instruction.textContent = category.instruction;
  progressText.textContent = `Серия ${categoryIndex + 1} / ${categories.length} · ${state.index + 1} / ${category.items.length}`;
  progressFill.style.width = `${((screen + (state.index + 1) / category.items.length) / (categories.length + 2)) * 100}%`;

  const roleButtons = Object.entries(ROLE).map(([key, role]) => `
    <button class="role-btn ${state.activeRole === key ? 'active' : ''}" data-pick-role="${key}" type="button">${role.label}<small>${role.question}</small></button>
  `).join('');

  const words = item.words.map((word, index) => {
    const selected = attempt.assigned[index] || '';
    const resultClass = attempt.checked && selected ? (selected === word.role ? 'correct' : 'incorrect') : '';
    const punctuation = item.punct[index] ? `<span class="punct ${item.punct[index] === '—' ? 'dash' : ''}">${item.punct[index]}</span>` : '';
    return `<button class="syntax-word ${selected ? 'assigned' : ''} ${resultClass}" data-word="${index}" data-role="${selected}" type="button" aria-label="${word.text}${selected ? `: ${ROLE[selected].label}` : ': роль не выбрана'}">${word.text}</button>${punctuation}`;
  }).join('');

  const activeLabel = state.activeRole === 'clear' ? 'Снять роль' : ROLE[state.activeRole].label;
  workspace.innerHTML = `
    <div class="fadein">
      <div class="role-toolbar">${roleButtons}<button class="role-btn clear ${state.activeRole === 'clear' ? 'active' : ''}" data-pick-role="clear" type="button">Снять роль<small>исправить выбор</small></button></div>
      <div class="sentence-card"><div class="sentence-line">${words}<span class="punct">.</span></div></div>
      <div class="assignment-info"><span>Сейчас выбрано: <b>${activeLabel}</b></span><span class="count-badge">Разобрано ${assignedCount} из ${item.words.length}</span></div>
      <div class="category-note">${category.note}</div>
      ${statusMarkup(attempt, assignedCount, item.words.length)}
    </div>`;

  workspace.querySelectorAll('[data-pick-role]').forEach(button => {
    button.addEventListener('click', () => {
      state.activeRole = button.dataset.pickRole;
      render();
    });
  });
  workspace.querySelectorAll('[data-word]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.word);
      if (state.activeRole === 'clear') delete attempt.assigned[index];
      else attempt.assigned[index] = state.activeRole;
      attempt.checked = false;
      attempt.passed = false;
      render();
    });
  });

  backBtn.disabled = false;
  checkBtn.textContent = 'Проверить';
  checkBtn.disabled = attempt.passed;
  nextBtn.disabled = !attempt.passed;
  nextBtn.textContent = state.index === category.items.length - 1 ? 'Следующая серия →' : 'Дальше →';
  hintBtn.disabled = false;
}

function renderFinal() {
  screenTitle.textContent = 'Тренажёр завершён';
  instruction.textContent = 'Все типы предложений разобраны.';
  progressText.textContent = `${categories.length + 2} / ${categories.length + 2}`;
  progressFill.style.width = '100%';
  workspace.innerHTML = `
    <div class="final-screen fadein">
      <h2>Отличная работа!</h2>
      <p>Вы нашли грамматические основы, разобрали второстепенные члены и слова внутри обособленных конструкций.</p>
      <div class="final-stats">
        <div class="stat"><b>${totalSentences}</b><span>предложений</span></div>
        <div class="stat"><b>${categories.length}</b><span>тематических серий</span></div>
        <div class="stat"><b>${totalWords}</b><span>слов с назначенной ролью</span></div>
      </div>
    </div>`;
  backBtn.disabled = false;
  checkBtn.textContent = 'Пройдено';
  checkBtn.disabled = true;
  nextBtn.textContent = 'Сначала ↻';
  nextBtn.disabled = false;
  hintBtn.disabled = true;
}

function render() {
  if (screen === 0) renderIntro();
  else if (screen <= categories.length) renderCategory(screen - 1);
  else renderFinal();
}

function checkCurrent() {
  if (screen === 0) {
    screen = 1;
    render();
    return;
  }
  if (screen > categories.length) return;
  const categoryIndex = screen - 1;
  const state = lessonState[categoryIndex];
  const item = categories[categoryIndex].items[state.index];
  const attempt = state.attempts[state.index];
  attempt.checked = true;
  attempt.passed = item.words.every((word, index) => attempt.assigned[index] === word.role);
  render();
}

function goNext() {
  if (screen === 0) return;
  if (screen > categories.length) {
    screen = 0;
    lessonState.forEach((state, categoryIndex) => {
      state.index = 0;
      state.activeRole = 'subject';
      state.attempts = categories[categoryIndex].items.map(() => ({ assigned: {}, checked: false, passed: false }));
    });
    render();
    return;
  }
  const state = lessonState[screen - 1];
  const attempt = state.attempts[state.index];
  if (!attempt.passed) return;
  if (state.index < categories[screen - 1].items.length - 1) state.index += 1;
  else screen += 1;
  render();
}

function goBack() {
  if (screen === 0) return;
  if (screen > categories.length) {
    screen = categories.length;
    render();
    return;
  }
  const state = lessonState[screen - 1];
  if (state.index > 0) state.index -= 1;
  else screen -= 1;
  render();
}

function openHint() {
  if (screen === 0) hintText.textContent = 'Подлежащее и сказуемое образуют грамматическую основу. Все служебные слова тоже нужно отметить: для них есть отдельная кнопка «Не член предложения».';
  else if (screen <= categories.length) hintText.textContent = categories[screen - 1].hint;
  else return;
  hintOverlay.classList.remove('hidden');
}

backBtn.addEventListener('click', goBack);
checkBtn.addEventListener('click', checkCurrent);
nextBtn.addEventListener('click', goNext);
hintBtn.addEventListener('click', openHint);
closeHint.addEventListener('click', () => hintOverlay.classList.add('hidden'));
hintOverlay.addEventListener('click', event => {
  if (event.target === hintOverlay) hintOverlay.classList.add('hidden');
});
window.addEventListener('resize', fitApp);
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') hintOverlay.classList.add('hidden');
});

fitApp();
render();

