import { landmarkData } from "./data.mjs";
import { singerData } from "./data.mjs";
import { programData } from "./data.mjs";
import { actorData } from "./data.mjs";
import { capitalData } from "./data.mjs";

const startBtn = document.querySelector(".start-btn");
const mainPage = document.querySelector(".mainPage");
const quizPage = document.querySelector(".quiz-page");

startBtn.addEventListener("click", () => {
  mainPage.style.display = "none";
  quizPage.style.dispaly = "flex";
});
