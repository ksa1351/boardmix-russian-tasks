(() => {
  const base = document.createElement('script');
  base.src = 'script-base.js?v=20260814f';
  base.onload = () => {
    const classify = document.getElementById('voiceClassify');
    const form = document.getElementById('voiceForm');
    const final = document.getElementById('voiceFinal');
    const rule = document.getElementById('voiceRule');
    if (!classify || !form || !final || !rule) return;

    classify.innerHTML = `
      <b>1. Определи переходность исходных глаголов.</b>
      <div class="voice-row" data-answer="tr"><span>читать / прочитать книгу</span><button class="choice" data-value="tr">переходный</button><button class="choice" data-value="intr">непереходный</button></div>
      <div class="voice-row" data-answer="tr"><span>решать / решить задачу</span><button class="choice" data-value="tr">переходный</button><button class="choice" data-value="intr">непереходный</button></div>
      <div class="voice-row" data-answer="intr"><span>лететь</span><button class="choice" data-value="tr">переходный</button><button class="choice" data-value="intr">непереходный</button></div>
      <div class="voice-row" data-answer="intr"><span>улыбаться</span><button class="choice" data-value="tr">переходный</button><button class="choice" data-value="intr">непереходный</button></div>`;

    form.innerHTML = `
      <b>2. Образуй возможные страдательные причастия. Запиши обе формы через точку с запятой и пробел.</b>
      <div class="voice-form-row"><span>читать / прочитать книгу →</span><input id="voiceInput1" placeholder="форма 1; форма 2"><span>книга</span></div>
      <div class="voice-form-row"><span>решать / решить задачу →</span><input id="voiceInput2" placeholder="форма 1; форма 2"><span>задача</span></div>
      <div class="voice-form-row"><span>лететь →</span><span></span><button class="no-form" data-noform="fly">Не образуется</button></div>
      <div class="voice-form-row"><span>улыбаться →</span><span></span><button class="no-form" data-noform="smile">Не образуется</button></div>
      <div class="actions"><button class="secondary" id="checkVoiceForms">Проверить</button><div class="status" id="voiceFormStatus"></div></div>`;

    form.classList.add('hidden');
    final.classList.add('hidden');
    rule.classList.add('hidden');

    const rows = [...classify.querySelectorAll('.voice-row')];
    rows.forEach(row => row.querySelectorAll('.choice').forEach(btn => {
      btn.onclick = () => {
        row.querySelectorAll('.choice').forEach(x => x.classList.remove('good','bad'));
        const ok = btn.dataset.value === row.dataset.answer;
        btn.classList.add(ok ? 'good' : 'bad');
        row.dataset.done = ok ? '1' : '0';
        if (rows.every(r => r.dataset.done === '1')) form.classList.remove('hidden');
      };
    }));

    let noFly = false, noSmile = false;
    form.querySelectorAll('.no-form').forEach(btn => {
      btn.onclick = () => {
        btn.classList.toggle('active');
        if (btn.dataset.noform === 'fly') noFly = btn.classList.contains('active');
        if (btn.dataset.noform === 'smile') noSmile = btn.classList.contains('active');
      };
    });

    const normalizePart = (text, noun) => norm(text)
      .replace(new RegExp(`\\b${noun}\\b`, 'g'), '')
      .trim();

    const formSetMatches = (value, expected, noun) => {
      const actual = value.split(';').map(x => normalizePart(x, noun)).filter(Boolean).sort();
      const target = expected.map(x => norm(x)).sort();
      return actual.length === target.length && actual.every((x, i) => x === target[i]);
    };

    document.getElementById('checkVoiceForms').onclick = () => {
      const raw1 = document.getElementById('voiceInput1').value;
      const raw2 = document.getElementById('voiceInput2').value;
      const ok1 = formSetMatches(raw1, ['читаемая', 'прочитанная'], 'книга');
      const ok2 = formSetMatches(raw2, ['решаемая', 'решённая'], 'задача');
      const status = document.getElementById('voiceFormStatus');
      const i1 = document.getElementById('voiceInput1');
      const i2 = document.getElementById('voiceInput2');

      i1.style.borderColor = ok1 ? '#2c9d62' : '#d96767';
      i2.style.borderColor = ok2 ? '#2c9d62' : '#d96767';
      form.querySelector('[data-noform="fly"]').classList.toggle('good', noFly);
      form.querySelector('[data-noform="smile"]').classList.toggle('good', noSmile);

      if (ok1 && ok2 && noFly && noSmile) {
        status.textContent = 'Верно. Теперь сравни глаголы, от которых образовались формы.';
        status.className = 'status good';
        final.classList.remove('hidden');
      } else {
        status.textContent = 'Проверь формы. Порядок форм может быть любым; разделяй их точкой с запятой.';
        status.className = 'status bad';
        final.classList.add('hidden');
        rule.classList.add('hidden');
      }
    };

    final.querySelectorAll('.choice').forEach(btn => {
      btn.onclick = () => {
        const row = btn.closest('.voice-final');
        row.querySelectorAll('.choice').forEach(x => x.classList.remove('good','bad'));
        const ok = btn.dataset.correct === '1';
        btn.classList.add(ok ? 'good' : 'bad');
        if (ok) rule.classList.remove('hidden');
      };
    });
  };
  document.head.appendChild(base);
})();