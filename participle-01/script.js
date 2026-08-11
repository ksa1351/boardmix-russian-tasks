const items = [
  { text: "самодвижущиеся", answer: "act-pres" },
  { text: "воплотивший", answer: "act-past" },
  { text: "приводимые", answer: "pass-pres" },
  { text: "разработанные", answer: "pass-past" }
];

const bank = document.getElementById("bank");
const zones = [...document.querySelectorAll(".zone")];
const result = document.getElementById("result");
let selectedCard = null;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function clearResult() {
  document.querySelectorAll(".word").forEach(card => card.classList.remove("correct", "wrong"));
  result.textContent = "";
  result.className = "result";
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "word";
  card.textContent = item.text;
  card.draggable = true;
  card.dataset.answer = item.answer;

  card.addEventListener("dragstart", event => {
    selectedCard = card;
    event.dataTransfer.effectAllowed = "move";
  });

  card.addEventListener("click", event => {
    event.stopPropagation();
    clearResult();

    if (selectedCard === card) {
      card.classList.remove("selected");
      selectedCard = null;
      return;
    }

    document.querySelectorAll(".word").forEach(item => item.classList.remove("selected"));
    selectedCard = card;
    card.classList.add("selected");
  });

  return card;
}

function moveSelectedCard(zone) {
  if (!selectedCard) return;
  zone.querySelector(".drop").appendChild(selectedCard);
  selectedCard.classList.remove("selected");
  selectedCard = null;
  clearResult();
}

zones.forEach(zone => {
  zone.addEventListener("dragover", event => {
    event.preventDefault();
    zone.classList.add("dragover");
  });

  zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));

  zone.addEventListener("drop", event => {
    event.preventDefault();
    zone.classList.remove("dragover");
    if (selectedCard) moveSelectedCard(zone);
  });

  zone.addEventListener("click", event => {
    if (event.target.closest(".word")) return;
    moveSelectedCard(zone);
  });
});

bank.addEventListener("dragover", event => event.preventDefault());

bank.addEventListener("drop", event => {
  event.preventDefault();
  if (selectedCard) {
    bank.appendChild(selectedCard);
    selectedCard.classList.remove("selected");
    selectedCard = null;
    clearResult();
  }
});

bank.addEventListener("click", event => {
  if (event.target.closest(".word")) return;
  if (selectedCard) {
    bank.appendChild(selectedCard);
    selectedCard.classList.remove("selected");
    selectedCard = null;
    clearResult();
  }
});

function checkAnswers() {
  const cards = [...document.querySelectorAll(".word")];
  let correct = 0;
  let placed = 0;

  cards.forEach(card => {
    card.classList.remove("correct", "wrong");
    const zone = card.closest(".zone");
    if (!zone) return;

    placed++;
    if (zone.dataset.zone === card.dataset.answer) {
      card.classList.add("correct");
      correct++;
    } else {
      card.classList.add("wrong");
    }
  });

  if (placed < items.length) {
    result.textContent = `Сначала распредели все карточки. Размещено: ${placed} из ${items.length}.`;
    result.className = "result bad";
  } else if (correct === items.length) {
    result.textContent = "✓ Всё верно! Задание выполнено.";
    result.className = "result good";
  } else {
    const mistakes = items.length - correct;
    result.textContent = `Верно: ${correct} из ${items.length}. Ошибок: ${mistakes}. Попробуй исправить.`;
    result.className = "result bad";
  }
}

function resetExercise() {
  bank.innerHTML = "";
  zones.forEach(zone => { zone.querySelector(".drop").innerHTML = ""; });
  shuffle(items).forEach(item => bank.appendChild(createCard(item)));
  selectedCard = null;
  result.textContent = "";
  result.className = "result";
}

document.getElementById("checkBtn").addEventListener("click", checkAnswers);
document.getElementById("resetBtn").addEventListener("click", resetExercise);

resetExercise();
