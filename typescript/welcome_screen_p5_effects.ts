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

let font : Font;
let fontSize = 40;

let assemlbySegmentMoveOffset = 0;

function preload(){
    font = loadFont("../assets/arial.ttf");
}

function windowResized() {
  setCanvasWidthAndHeight();
  setXYStartEnd();
  resizeCanvas(cnvWidth, cnvHeight);
}

function setup() {
  setCanvasWidthAndHeight();
  const canvas = createCanvas(cnvWidth, cnvHeight);
  canvas.parent("welcome-screen");
  background(34, 34, 34);
  strokeWeight(1);
  setXYStartEnd();
}

const setTextCharacteristics = ():void => {
    textFont(font);
    textSize(fontSize);
}

function draw() {
  clear();
  noFill();
  stroke(assemblyLineColor);

  text("halo", 160, 160);

  drawAssembyLine();
  drawMovingSegmentsAssembly(assemlbySegmentMoveOffset);

  fill(wallColor);
  stroke(wallStrokeColor);
  drawAssemblyRooms();

  handleAssemblySegmentMoveOffset();
}

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

  if (noFillHoleWall)
    noFill();

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
