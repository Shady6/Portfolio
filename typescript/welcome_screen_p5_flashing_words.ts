/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Font, Color } from "p5";

let cnvWidth: number = 0;
let cnvHeight: number = 0;

let font: Font;
let fontSize = 24;

let textColor: Color;

let textRestrictedArea: Rectangle;
const yPaddingToRestrictedArea = 50;

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
    "Groovy"
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
    "npm"
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
    "Hibernate"
  ],
];
const wordsetsCount = 3;
const longestWord = "kurczak";
let wordCoords: Point[] = new Array<Point>(3);

const timeToStartFlashingWordset = [3850, 4350, 4850];

function preload() {
  font = loadFont("../assets/Arial.ttf");
}

function windowResized() {
  setCanvasWidthAndHeight();
  resizeCanvas(cnvWidth, cnvHeight);
  setBoundingBoxOfWelcomeText();
  setFontSize();
}

function setup() {
  setCanvasWidthAndHeight();
  setTextCharacteristics();
  const canvas = createCanvas(cnvWidth, cnvHeight);
  canvas.parent("welcome-screen");

  setBoundingBoxOfWelcomeText();
  for (let i = 0; i < wordsetsCount; i++)
    setWordCoordsOutsideRestrictedAreas(i);

  textColor = color(255, 255, 255);
  textColor.setAlpha(0);
  background(34, 34, 34);
  fill(textColor);
}

function draw() {
  clear();

  flashWords();
}

const flashWords = () => {
  for (let i = 0; i < wordsToFlash.length && millis() > timeToStartFlashingWordset[i]; i++) {
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
  } while (isPointInBox(textRestrictedArea, wordCoords[indexOfWordSet]));
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
    const welcomeTextFontSize = Number($("h1").css("font-size").slice(0, -2));
    
    if (cnvWidth < 600 )
        fontSize = welcomeTextFontSize / 1.3;
    else
        fontSize = welcomeTextFontSize / 2;

    textSize(fontSize);
}

const setBoundingBoxOfWelcomeText = (): void => {
  let y = Number($("h1").css("margin-top").slice(0, -2));

  textRestrictedArea = {
    coords: {
      x: 0,
      y: y - yPaddingToRestrictedArea,
    },
    width: cnvWidth,
    height: $("h1").height() + 2 * yPaddingToRestrictedArea,
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
