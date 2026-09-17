(()=>{
  const center=document.querySelector('.center-actions');
  const app=document.getElementById('app');
  if(!center||!app||document.getElementById('referenceBtn'))return;

  const btn=document.createElement('button');
  btn.id='referenceBtn';
  btn.type='button';
  btn.className='hint-btn reference-btn';
  btn.textContent='Справочник 5–7';
  center.insertBefore(btn,center.firstChild);

  const overlay=document.createElement('div');
  overlay.id='referenceOverlay';
  overlay.className='reference-overlay reference-hidden';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-labelledby','referenceTitle');
  overlay.innerHTML=`
    <div class="reference-panel">
      <div class="reference-head">
        <div><h2 id="referenceTitle">Справочник 5–7 классы</h2><p>Краткое повторение базовых правил. Открывай только тогда, когда нужно восстановить правило.</p></div>
        <button type="button" class="reference-close" id="referenceClose" aria-label="Закрыть">×</button>
      </div>
      <div class="reference-tabs">
        <button type="button" class="reference-tab active" data-tab="ortho">Орфография</button>
        <button type="button" class="reference-tab" data-tab="punct">Пунктуация</button>
      </div>
      <div class="reference-body">
        <div id="referenceOrtho" class="reference-grid">
          <article class="reference-card"><h3>Гласные в корне</h3><ul>
            <li><span class="mark">Проверяемая:</span> измени слово или подбери однокоренное, чтобы гласная стала ударной.</li>
            <li><span class="mark">Непроверяемая:</span> написание проверяется по словарю и запоминается.</li>
            <li><span class="mark">Чередующаяся:</span> выбор буквы зависит от суффикса, ударения, согласной или значения корня — сначала определи тип корня.</li>
          </ul></article>
          <article class="reference-card"><h3>Приставки</h3><ul>
            <li>Приставки на <b>-з/-с</b>: перед звонкой согласной пишется <b>з</b>, перед глухой — <b>с</b>.</li>
            <li><b>ПРЕ-/ПРИ-</b>: проверяй значение приставки.</li>
            <li>После русской приставки на согласную перед е, ё, ю, я пишется разделительный <b>ъ</b>.</li>
            <li>После приставок на согласную начальное <b>и</b> корня часто меняется на <b>ы</b> (кроме ряда иноязычных и меж-/сверх-).</li>
          </ul></article>
          <article class="reference-card"><h3>Ь и Ъ</h3><ul>
            <li><b>Ь</b> обозначает мягкость или выполняет грамматическую функцию.</li>
            <li>Разделительный <b>ь</b> пишется внутри слова перед е, ё, ю, я, и.</li>
            <li>Разделительный <b>ъ</b> — после приставки на согласную перед е, ё, ю, я.</li>
          </ul></article>
          <article class="reference-card"><h3>Окончания существительных и прилагательных</h3><ul>
            <li>У существительных определи склонение и падеж.</li>
            <li>У прилагательных задай вопрос от существительного: окончание вопроса помогает проверить окончание прилагательного.</li>
            <li>Безударные окончания нельзя определять только «на слух».</li>
          </ul></article>
          <article class="reference-card"><h3>Глагол</h3><ul>
            <li>Безударное личное окончание: сначала определи спряжение.</li>
            <li><b>-тся / -ться</b>: задай вопрос. Есть ь в вопросе — пишется <b>-ться</b>; нет ь — <b>-тся</b>.</li>
            <li>В форме прошедшего времени перед <b>-л-</b> обычно сохраняется гласная инфинитива.</li>
          </ul></article>
          <article class="reference-card"><h3>НЕ с разными частями речи</h3><ul>
            <li>С глаголами и деепричастиями <b>не</b> обычно пишется раздельно (кроме слов без не не употребляющихся).</li>
            <li>С существительными и прилагательными возможно слитное написание, если слово можно заменить синонимом без не.</li>
            <li>Раздельно — при противопоставлении с <b>а</b> и в ряде конструкций усиленного отрицания.</li>
          </ul></article>
          <article class="reference-card"><h3>Н и НН</h3><ul>
            <li>В прилагательных проверяй словообразовательный суффикс и исключения.</li>
            <li>В причастиях и отглагольных прилагательных учитывай приставку, зависимые слова, вид глагола и суффикс.</li>
            <li>Краткие страдательные причастия пишутся с одной <b>н</b>.</li>
          </ul></article>
          <article class="reference-card"><h3>Причастия и деепричастия</h3><ul>
            <li>В суффиксах причастий учитывай спряжение исходного глагола и время причастия.</li>
            <li>Перед <b>-вш-</b> и <b>-нн-</b> сохраняй гласную основы инфинитива.</li>
            <li>НЕ с причастием зависит от полной/краткой формы, зависимых слов и противопоставления.</li>
          </ul></article>
          <article class="reference-card"><h3>Наречия и служебные слова</h3><ul>
            <li>Часть наречий пишется слитно, часть раздельно или через дефис — проверяй способ образования и словарь.</li>
            <li>Через дефис: формы на <b>по-...-ому/-ему, -ски/-цки/-ьи</b>, а также некоторые наречия с кое-, -то, -либо, -нибудь.</li>
            <li>Отличай союзы и наречия от сочетаний самостоятельных слов: смысл и возможность задать вопрос помогают определить написание.</li>
          </ul></article>
        </div>

        <div id="referencePunct" class="reference-grid reference-hidden">
          <article class="reference-card"><h3>Конец предложения</h3><ul>
            <li>Точка — спокойное сообщение.</li>
            <li>Вопросительный знак — вопрос.</li>
            <li>Восклицательный знак — сильное чувство, побуждение, эмоциональная оценка.</li>
          </ul></article>
          <article class="reference-card"><h3>Однородные члены</h3><ul>
            <li>Без союза однородные члены обычно разделяются запятыми.</li>
            <li>При одиночных <b>и, или, либо</b> запятая обычно не ставится.</li>
            <li>Перед <b>а, но, зато, однако</b> запятая ставится.</li>
            <li>При повторяющихся союзах запятые обычно ставятся между однородными членами.</li>
          </ul></article>
          <article class="reference-card"><h3>Обобщающее слово</h3><ul>
            <li>Если после обобщающего слова идёт перечисление — возможно двоеточие.</li>
            <li>Если перечисление стоит перед обобщающим словом — возможно тире.</li>
            <li>Сначала найди обобщающее слово и границы перечисления.</li>
          </ul></article>
          <article class="reference-card"><h3>Обращение</h3><ul>
            <li>Обращение не является членом предложения.</li>
            <li>Внутри предложения обращение выделяется запятыми.</li>
            <li>Интонация обращения помогает определить его границы.</li>
          </ul></article>
          <article class="reference-card"><h3>Сложное предложение</h3><ul>
            <li>Сначала найди все грамматические основы.</li>
            <li>Если частей две и более, определи, чем они связаны.</li>
            <li>Между частями сложного предложения часто ставится запятая; союз <b>и</b> сам по себе не отменяет её.</li>
          </ul></article>
          <article class="reference-card"><h3>Прямая речь и диалог</h3><ul>
            <li>Прямая речь оформляется кавычками и знаками при словах автора.</li>
            <li>Реплики диалога обычно начинаются с тире и новой строки.</li>
            <li>Знак между словами автора и прямой речью зависит от их расположения.</li>
          </ul></article>
          <article class="reference-card"><h3>Причастный оборот</h3><ul>
            <li>Найди определяемое существительное и зависимые слова причастия.</li>
            <li>Распространённое определение после определяемого слова обычно обособляется.</li>
            <li>Перед определяемым словом оборот чаще не обособляется, если нет дополнительных условий.</li>
          </ul></article>
          <article class="reference-card"><h3>Деепричастный оборот</h3><ul>
            <li>Деепричастие обозначает добавочное действие того же действующего лица.</li>
            <li>Одиночное деепричастие и деепричастный оборот обычно обособляются запятыми.</li>
            <li>Сначала проверь, относится ли добавочное действие к подлежащему.</li>
          </ul></article>
          <article class="reference-card"><h3>Междометия и слова-предложения</h3><ul>
            <li>Междометия могут отделяться запятой или восклицательным знаком в зависимости от интонации.</li>
            <li>Да и нет могут быть отдельными словами-предложениями и отделяться от основной части знаками препинания.</li>
          </ul></article>
        </div>
      </div>
      <div class="reference-foot">Совет: сначала попробуй выполнить задание сам. Справочник используй для восстановления правила, а не для угадывания ответа.</div>
    </div>`;
  app.appendChild(overlay);

  const close=()=>overlay.classList.add('reference-hidden');
  const open=()=>overlay.classList.remove('reference-hidden');
  btn.addEventListener('click',open);
  overlay.querySelector('#referenceClose').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  overlay.querySelectorAll('.reference-tab').forEach(t=>t.addEventListener('click',()=>{
    overlay.querySelectorAll('.reference-tab').forEach(x=>x.classList.toggle('active',x===t));
    const ortho=t.dataset.tab==='ortho';
    overlay.querySelector('#referenceOrtho').classList.toggle('reference-hidden',!ortho);
    overlay.querySelector('#referencePunct').classList.toggle('reference-hidden',ortho);
  }));
})();