import { landmarkData } from "./data.mjs";
import { singerData } from "./data.mjs";
import { programData } from "./data.mjs";
import { actorData } from "./data.mjs";
import { capitalData } from "./data.mjs";

const startBtn = document.querySelector(".start-btn");
const mainPage = document.querySelector(".main-page");
const quizPage = document.querySelector(".quiz-page");
const answers = document.querySelectorAll(".answers");
const scoreBtn = document.querySelector(".score-btn");
const modal = document.querySelector(".modal");
const circles = document.querySelector(".circles");

const land = answers[0];
const singer = answers[1];
const program = answers[2];
const actor = answers[3];
const capital = answers[4];

let cir = [];

for (let i = 0; i < 50; i++) {
  cir.push(`<div class="cir"></div>`);
}

circles.innerHTML = cir.join("");

startBtn.addEventListener("click", () => {
  mainPage.style.display = "none";
  quizPage.style.display = "flex";
});

landmarkData.forEach((landmark) => {
  land.innerHTML += `<div class="ops">
                     <input type="radio" name="landmark" value="${landmark}" class="radio-el">
                     <label for="landmark">${landmark}</label>
                     </div>`;
});

singerData.forEach((singerEl) => {
  singer.innerHTML += `<div class="ops">
                     <input type="radio" name="singer" value="${singerEl}" class="radio-el">
                     <label for="singer">${singerEl}</label>
                     </div>`;
});
programData.forEach((programEl) => {
  program.innerHTML += `<div class="ops">
                     <input type="radio" name="program" value="${programEl}" class="radio-el">
                     <label for="program">${programEl}</label>
                     </div>`;
});
actorData.forEach((actorEl) => {
  actor.innerHTML += `<div class="ops">
                     <input type="radio" name="actor" value="${actorEl}" class="radio-el">
                     <label for="actor">${actorEl}</label>
                     </div>`;
});
capitalData.forEach((capitalEl) => {
  capital.innerHTML += `<div class="ops">
                     <input type="radio" name="capital" value="${capitalEl}" class="radio-el">
                     <label for="capital">${capitalEl}</label>
                     </div>`;
});

let selectedEl = {
  landmark: null,
  singer: null,
  program: null,
  actor: null,
  capital: null,
};

let correct = {
  landmark: "에버랜드",
  singer: "태연",
  program: "나왔다! 장보리",
  actor: "진성",
  capital: "시드니",
};

const myKeys = Object.keys(selectedEl);
let score = 0;
const radioEl = document.querySelectorAll(".radio-el");

radioEl.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const name = e.target.name;
    const value = e.target.value;
    selectedEl[name] = value;
  });
});

const span1 = document.querySelector(".span1");
const span2 = document.querySelector(".span2");
const modalScore = document.querySelector(".modal-score");
const modalApply = document.querySelector(".modal-apply");

scoreBtn.addEventListener("click", () => {
  for (let key in selectedEl) {
    if (selectedEl[key] == correct[key]) {
      score += 1;
    }
  }
  modal.style.display = "flex";
  let count = 0;
  let counting = setInterval(() => {
    if (count == score) {
      clearInterval(counting);
      return false;
    }
    count += 1;
    span1.textContent = new Intl.NumberFormat().format(count);
  }, 100);
  let sec = 5;
  const counter = setInterval(() => {
    sec -= 1;
    span2.textContent = sec;
  }, 1000);
  setTimeout(() => {
    clearInterval(counter);
  }, 5000);
  setTimeout(() => {
    modalScore.style.display = "none";
    modalApply.style.display = "flex";
  }, 5000);
  radioEl.forEach((radio) => {
    const parent = radio.closest(".ops");
    if (radio.checked) {
      const radioName = radio.name;
      const radioValue = radio.value;

      if (radioValue == correct[radioName]) {
        parent.classList.add("correct");
        parent.classList.remove("incorrect");
      } else {
        parent.classList.add("incorrect");
        parent.classList.remove("correct");
      }
    } else {
      parent.classList.remove("correct", "incorrect");
    }
  });
});

const applyBtn = document.querySelector(".submit-btn");
const complete = document.querySelector(".complete");
const cancelBtn = document.querySelector(".cancel");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const koreanPattern = "^([\u3130-\u318F\uAC00-\uD7AF]+)$";
const koreanRegexp = new RegExp(koreanPattern);

let myName;
nameInput.pattern = "^([\u3130-\u318F\uAC00-\uD7AF]+)$";
nameInput.addEventListener("input", (e) => {
  if (isKorean(e.target.value)) {
    return (myName = true);
  } else {
    return (myName = false);
  }
});

function isKorean(text) {
  return koreanRegexp.test(text);
}

let myNumber;
phoneInput.addEventListener("input", (e) => {
  if (isNumber(e.target.value)) {
    return (myNumber = true);
  } else {
    return (myNumber = false);
  }
});

function isNumber(text) {
  const numberPattern = /^010-[0-9]{4}-[0-9]{4}$/;
  return numberPattern.test(text);
}

let emailForm;

emailInput.addEventListener("input", (e) => {
  if (isEmail(e.target.value)) {
    return (emailForm = true);
  } else if (e.target.value == "") {
    return (emailForm = true);
  } else {
    return (emailForm = false);
  }
});

function isEmail(text) {
  return /^[a-z0-9._%+-]{1,}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(text);
}

applyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(myName);
  console.log(myNumber);
  console.log(emailForm);
  if (myName === true && myNumber === true && emailForm === true) {
    modalApply.style.display = "none";
    complete.style.display = "flex";
    cancelBtn.style.display = "flex";
  } else {
    if (nameInput.value == "" || phoneInput.value == "") {
      alert("제대로 입력되지 않은 란이 있습니다. 입력해주시길 바랍니다.");
      e.preventDefault();
      nameInput.value = null;
      phoneInput.value = null;
    } else if (emailInput.value !== "") {
      alert("이메일형식이 잘못되었습니다. 다시 입력해주세요!");
      e.preventDefault();
      emailInput.value = null;
    } else if (myName === false) {
      alert("이름이 잘못 입력되었습니다. 다시 입력해주세요!");
      e.preventDefault();
      nameInput.value = null;
    } else if (myNumber === false) {
      alert("전화번호가 잘못 입력되었습니다. 다시 입력해주세요!");
      e.preventDefault();
      phoneInput.value = null;
    }
  }

  if (nameInput.value == "" || phoneInput.value == "") {
    alert("제대로 입력되지 않은 란이 있습니다. 입력해주시길 바랍니다.");
    return;
  }

  if (emailForm === true) {
    modalApply.style.display = "none";
    complete.style.display = "block";
    modal.style.justifyContent = "start";
    cancelBtn.style.display = "flex";
  } else {
    if (emailInput.value !== "") {
      alert("이메일형식이 잘못되었습니다. 다시 입력해주세요!");
      e.preventDefault();
      emailInput.value = null;
    } else {
      modalApply.style.display = "none";
      complete.style.display = "block";
      modal.style.justifyContent = "start";
      cancelBtn.style.display = "flex";
    }
  }
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  scoreBtn.disabled = true;
});
