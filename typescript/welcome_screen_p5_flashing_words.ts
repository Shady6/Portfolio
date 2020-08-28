/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Font, Color } from "p5";

let cnvWidth: number = 0;
let cnvHeight: number = 0;

let font: Font;
let fontSize = 24;

let textColor: Color;

let textRestrictedAreaH1: Rectangle;
let textRestrictedAreaBtn: Rectangle;
const yPaddingToRestrictedArea = 50;
const xPaddingToRestrictedArea = 35;

let canFlashNewWord = [false, false, false];
let indexOfWordToFlash = [0, 0, 0];
let textOpacity = [0, 0, 0];
let textOpacityIsGoingUp = [true, true, true];
let opacityChangeSpeed = 3;
const wordsToFlash = [
  [
    "Java",
    "Javascript",
    "C#",
    "Python",
    "PHP",
    "TypeScript",
    "SQL",
    "Assembly",
    "C++",
    "GLSL",
    "Groovy",
  ],
  [
    "REST",
    "Ajax",
    "DRY",
    "Postman",
    "API",
    "Git",
    "HTTP",
    "SSL",
    "UI",
    "UX",
    "npm",
  ],
  [
    "Express",
    "React",
    "Bootstrap",
    "JQuery",
    "Redux",
    "MongoDB",
    "P5",
    "EF",
    "Spring",
    "Hibernate",
  ],
];
const wordsetsCount = 3;
const longestWord = "TypeScript";
let wordCoords: Point[] = new Array<Point>(3);

const timeToStartFlashingWordset = [3850, 4350, 4850];

function preload() {
  font = loadFont("assets/arial.ttf");
}

function windowResized() {
  setCanvasWidthAndHeight();
  resizeCanvas(cnvWidth, cnvHeight);
  setBoundingBoxOfWelcomeText();
  setBoundingBoxOfGetToKnowMeBtn();
  setFontSize();
}

function setup() {
  setCanvasWidthAndHeight();
  setTextCharacteristics();
  const canvas = createCanvas(cnvWidth, cnvHeight);
  canvas.parent("welcome-screen");

  setBoundingBoxOfWelcomeText();
  setBoundingBoxOfGetToKnowMeBtn();
  for (let i = 0; i < wordsetsCount; i++)
    setWordCoordsOutsideRestrictedAreas(i);

  textColor = color(255, 255, 255);
  textColor.setAlpha(0);
  background(34, 34, 34);
  fill(textColor);
}

function draw() {
  clear();
  if (cnvHeight > 400) {
    flashWords();
  }
}

const flashWords = () => {
  for (
    let i = 0;
    i < wordsToFlash.length && millis() > timeToStartFlashingWordset[i];
    i++
  ) {
    oscilateOpacity(i);

    flashWord(
      wordsToFlash[i][indexOfWordToFlash[i]],
      textOpacity[i],
      i,
      wordCoords[i]
    );

    if (textOpacity[i] <= 1 && canFlashNewWord[i]) {
      setWordCoordsOutsideRestrictedAreas(i);
      canFlashNewWord[i] = false;
      indexOfWordToFlash[i] = generateRandomIndex(
        0,
        wordsToFlash[i].length,
        indexOfWordToFlash[i]
      );
    }
  }
};

const flashWord = (
  word: string,
  opacity: number,
  wordSetIndex: number,
  coords: Point
): void => {
  textColor.setAlpha(opacity);
  fill(textColor);
  text(word, coords.x, coords.y);

  if (alpha(textColor) >= 250) canFlashNewWord[wordSetIndex] = true;
};

const oscilateOpacity = (wordsetIndex: number): void => {
  if (textOpacity[wordsetIndex] >= 255)
    textOpacityIsGoingUp[wordsetIndex] = false;

  if (textOpacity[wordsetIndex] <= 0) textOpacityIsGoingUp[wordsetIndex] = true;

  if (textOpacityIsGoingUp[wordsetIndex])
    textOpacity[wordsetIndex] += opacityChangeSpeed;
  else textOpacity[wordsetIndex] -= opacityChangeSpeed;
};

const setTextCharacteristics = (): void => {
  textFont(font);
  setFontSize();
};

const setCanvasWidthAndHeight = (): void => {
  cnvWidth = $("#welcome-screen").outerWidth();
  cnvHeight = $("#welcome-screen").outerHeight();
};

const setWordCoordsOutsideRestrictedAreas = (indexOfWordSet: number): void => {
  do {
    wordCoords[indexOfWordSet] = generateRandomPoint();
  } while (
    isPointInBox(textRestrictedAreaH1, wordCoords[indexOfWordSet]) ||
    isPointInBox(textRestrictedAreaBtn, wordCoords[indexOfWordSet])
  );
};

const generateRandomIndex = (
  min: number,
  max: number,
  exclude: number
): number => {
  let randomIndex = 0;

  do {
    randomIndex = Math.floor(random(min, max));
  } while (randomIndex == exclude);

  return randomIndex;
};

const generateRandomPoint = (): Point => {
  let x = random(textWidth(longestWord), cnvWidth - textWidth(longestWord) * 2);
  let y = random(textSize(), cnvHeight - textSize() * 2);

  return { x: x, y: y };
};

const setFontSize = () => {
  const welcomeTextFontSize = Number(
    $("#welcome-screen h1").css("font-size").slice(0, -2)
  );

  if (cnvWidth < 600) fontSize = welcomeTextFontSize / 1.3;
  else fontSize = welcomeTextFontSize / 2;

  textSize(fontSize);
};

const setBoundingBoxOfWelcomeText = (): void => {
  let y = $("#welcome-screen h1").position().top;
  let navHeight = $("nav").outerHeight();

  textRestrictedAreaH1 = {
    coords: {
      x: 0,
      y: y - navHeight - yPaddingToRestrictedArea,
    },
    width: cnvWidth,
    height: $("#welcome-screen h1").height() + 2 * yPaddingToRestrictedArea,
  };
};

const setBoundingBoxOfGetToKnowMeBtn = (): void => {
  let y = $("#welcome-screen button").position().top;
  let x = $("#welcome-screen button").position().left;
  let btnWidth = $("#welcome-screen button").outerWidth();
  let navHeight = $("nav").outerHeight();

  textRestrictedAreaBtn = {
    coords: {
      x: x - xPaddingToRestrictedArea - textWidth(longestWord),
      y: y - navHeight - yPaddingToRestrictedArea,
    },
    width: btnWidth + 2 * (xPaddingToRestrictedArea + textWidth(longestWord)),
    height: $("#welcome-screen button").height() + 2 * yPaddingToRestrictedArea,
  };
};

const isPointInBox = (box: Rectangle, point: Point): boolean => {
  return (
    point.x >= box.coords.x &&
    point.x <= box.coords.x + box.width &&
    point.y >= box.coords.y &&
    point.y <= box.coords.y + box.height
  );
};

interface Rectangle {
  coords: Point;

  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}
