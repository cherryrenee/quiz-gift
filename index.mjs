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
});


const applyBtn = document.querySelector(".submit-btn");
const complete = document.querySelector(".complete");

applyBtn.addEventListener("click",()=>{
  modalApply.style.display="none";
  complete.style.display="block";
})
