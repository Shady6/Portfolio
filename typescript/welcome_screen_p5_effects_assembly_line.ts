/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Font } from "p5";

let cnvWidth = 0;
let cnvHeight = 0;

let xStart = 0;
let xEnd = 0;
let yStart = 0;
let yEnd = 0;

const assemblySegments = 32;
const assemblyLineHeight = 55;
const assemblySegmentMoveSpeed = 0.8;
const assemblyRoomHeight = 100;
const assemblyRoomWidth = 90;
const perspectiveAngle = (75 * Math.PI) / 180;

const wallColor = 65;
const wallStrokeColor = 255;
const insideWallColor = 25;
const assemblyLineColor = 255;
const roofColor = 76;

let font: Font;
let fontSize = 50;

let textXOffset = 0;
const frontEndWords = ["JS", "UI", "UX", "Client", "Css", "Ajax"];
const backEndWords = ["API", "Server", "REST", "SQL"];
const wordToWordOffset = 30;

let assemlbySegmentMoveOffset = 0;

function preload() {
  font = loadFont("../assets/Arial.ttf");
}

function windowResized() {
  setCanvasWidthAndHeight();
  setXYStartEnd();
  resizeCanvas(cnvWidth, cnvHeight);
}

function setup() {
  setTextCharacteristics();
  setCanvasWidthAndHeight();
  const canvas = createCanvas(cnvWidth, cnvHeight);
  canvas.parent("welcome-screen");
  background(34, 34, 34);
  strokeWeight(1);
  setXYStartEnd();
}

const setTextCharacteristics = (): void => {
  textFont(font);
  textSize(fontSize);
};

function draw() {
  clear();
  // noFill();
  // stroke(assemblyLineColor);

  // drawAssembyLine();
  // drawMovingSegmentsAssembly(assemlbySegmentMoveOffset);
  // drawWords(textXOffset);

  // fill(wallColor);
  // stroke(wallStrokeColor);
  // drawAssemblyRooms();

  // handleAssemblySegmentMoveOffset();
  // handleAssemblyWordMoveOffset();
}

const drawWords = (textXOffset: number) => {
  noStroke();
  let prevWordOffset = 0;
  frontEndWords.forEach((word, i) => {
    prevWordOffset += textWidth(word) + wordToWordOffset;
    drawWord(word, textXOffset - prevWordOffset , true);
  })
};

const drawWord = (
  textToWrite: string,
  offset: number,
  leftAssemblySideWord: boolean
): void => {
  if (leftAssemblySideWord && (offset >= (xEnd - xStart - assemblyRoomWidth) / 2 || offset  <= 0))
    noFill();
  else if (leftAssemblySideWord) fill(255);

  if (
    !leftAssemblySideWord &&
    (offset >= xEnd - xStart || offset < (xEnd - xStart) / 2)
  )
  noFill();
  else if (!leftAssemblySideWord) fill(255);

  text(textToWrite, xStart + offset, yEnd);
};

const handleAssemblyWordMoveOffset = (): void => {
  textXOffset += assemblySegmentMoveSpeed;

  if (textXOffset >= (xEnd - xStart) * 2) textXOffset = 0;
};

const drawAssemblyRooms = () => {
  drawAssemblyRoom(0, false);

  drawAssemblyRoom((xEnd - xStart - assemblyRoomWidth) / 2, true);

  drawAssemblyRoom(xEnd - xStart - assemblyRoomWidth, true);
};

const drawAssemblyRoom = (xOffset: number, noFillHoleWall: boolean) => {
  // inside wall
  fill(insideWallColor);
  quad(
    xStart + xOffset,
    yStart,
    xStart + xOffset + assemblyRoomWidth,
    yStart,
    xStart +
      xOffset +
      assemblyRoomWidth +
      cos(perspectiveAngle) * assemblyRoomHeight,
    yStart + -sin(perspectiveAngle) * assemblyRoomHeight,
    xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight,
    yStart + -sin(perspectiveAngle) * assemblyRoomHeight
  );

  fill(wallColor);
  // closest wall
  quad(
    xStart + xOffset,
    yEnd,
    xStart + xOffset + assemblyRoomWidth,
    yEnd,
    xStart +
      xOffset +
      assemblyRoomWidth +
      cos(perspectiveAngle) * assemblyRoomHeight,
    yEnd + -sin(perspectiveAngle) * assemblyRoomHeight,
    xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight,
    yEnd + -sin(perspectiveAngle) * assemblyRoomHeight
  );

  if (noFillHoleWall) noFill();

  // hole wall
  quad(
    xStart + xOffset,
    yEnd,
    xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight,
    yEnd + -sin(perspectiveAngle) * assemblyRoomHeight,
    xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight,
    yStart + -sin(perspectiveAngle) * assemblyRoomHeight,
    xStart + xOffset,
    yStart
  );

  fill(roofColor);
  // roof
  rect(
    xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight,
    yStart + -sin(perspectiveAngle) * assemblyRoomHeight,
    assemblyRoomWidth,
    assemblyLineHeight
  );
};

const drawAssembyLine = (): void => {
  rect(xStart, yStart, xEnd - xStart, assemblyLineHeight);
};

const drawMovingSegmentsAssembly = (moveOffset: number): void => {
  for (let i = 0; i < assemblySegments; i++) {
    drawMovingSegmentAssembly(
      xStart + ((xEnd - xStart) / assemblySegments) * i + moveOffset
    );
  }
};

const drawMovingSegmentAssembly = (x: number): void => {
  line(x, yStart, x, yEnd);
};

const handleAssemblySegmentMoveOffset = (): void => {
  assemlbySegmentMoveOffset += assemblySegmentMoveSpeed;

  if (assemlbySegmentMoveOffset >= (1 / assemblySegments) * (xEnd - xStart))
    assemlbySegmentMoveOffset = 0;
};

const setXYStartEnd = (): void => {
  xStart = 0.1 * cnvWidth;
  xEnd = 0.9 * cnvWidth;
  yStart = cnvHeight * 0.8;
  yEnd = yStart + assemblyLineHeight;
};

const setCanvasWidthAndHeight = (): void => {
  cnvWidth = $("#welcome-screen").outerWidth();
  cnvHeight = $("#welcome-screen").outerHeight();
};
