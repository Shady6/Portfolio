/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />
var cnvWidth = 0;
var cnvHeight = 0;
var xStart = 0;
var xEnd = 0;
var yStart = 0;
var yEnd = 0;
var assemblySegments = 32;
var assemblyLineHeight = 55;
var assemblySegmentMoveSpeed = 0.8;
var assemblyRoomHeight = 100;
var assemblyRoomWidth = 90;
var perspectiveAngle = (75 * Math.PI) / 180;
var wallColor = 65;
var wallStrokeColor = 255;
var insideWallColor = 25;
var assemblyLineColor = 255;
var roofColor = 76;
var font;
var fontSize = 40;
var assemlbySegmentMoveOffset = 0;
function preload() {
    font = loadFont("../assets/arial.ttf");
}
function windowResized() {
    setCanvasWidthAndHeight();
    setXYStartEnd();
    resizeCanvas(cnvWidth, cnvHeight);
}
function setup() {
    setCanvasWidthAndHeight();
    var canvas = createCanvas(cnvWidth, cnvHeight);
    canvas.parent("welcome-screen");
    background(34, 34, 34);
    strokeWeight(1);
    setXYStartEnd();
}
var setTextCharacteristics = function () {
    textFont(font);
    textSize(fontSize);
};
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
var drawAssemblyRooms = function () {
    drawAssemblyRoom(0, false);
    drawAssemblyRoom((xEnd - xStart - assemblyRoomWidth) / 2, true);
    drawAssemblyRoom(xEnd - xStart - assemblyRoomWidth, true);
};
var drawAssemblyRoom = function (xOffset, noFillHoleWall) {
    // inside wall
    fill(insideWallColor);
    quad(xStart + xOffset, yStart, xStart + xOffset + assemblyRoomWidth, yStart, xStart +
        xOffset +
        assemblyRoomWidth +
        cos(perspectiveAngle) * assemblyRoomHeight, yStart + -sin(perspectiveAngle) * assemblyRoomHeight, xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight, yStart + -sin(perspectiveAngle) * assemblyRoomHeight);
    fill(wallColor);
    // closest wall
    quad(xStart + xOffset, yEnd, xStart + xOffset + assemblyRoomWidth, yEnd, xStart +
        xOffset +
        assemblyRoomWidth +
        cos(perspectiveAngle) * assemblyRoomHeight, yEnd + -sin(perspectiveAngle) * assemblyRoomHeight, xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight, yEnd + -sin(perspectiveAngle) * assemblyRoomHeight);
    if (noFillHoleWall)
        noFill();
    // hole wall
    quad(xStart + xOffset, yEnd, xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight, yEnd + -sin(perspectiveAngle) * assemblyRoomHeight, xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight, yStart + -sin(perspectiveAngle) * assemblyRoomHeight, xStart + xOffset, yStart);
    fill(roofColor);
    rect(xStart + xOffset + cos(perspectiveAngle) * assemblyRoomHeight, yStart + -sin(perspectiveAngle) * assemblyRoomHeight, assemblyRoomWidth, assemblyLineHeight);
};
var drawAssembyLine = function () {
    rect(xStart, yStart, xEnd - xStart, assemblyLineHeight);
};
var drawMovingSegmentsAssembly = function (moveOffset) {
    for (var i = 0; i < assemblySegments; i++) {
        drawMovingSegmentAssembly(xStart + ((xEnd - xStart) / assemblySegments) * i + moveOffset);
    }
};
var drawMovingSegmentAssembly = function (x) {
    line(x, yStart, x, yEnd);
};
var handleAssemblySegmentMoveOffset = function () {
    assemlbySegmentMoveOffset += assemblySegmentMoveSpeed;
    if (assemlbySegmentMoveOffset >= (1 / assemblySegments) * (xEnd - xStart))
        assemlbySegmentMoveOffset = 0;
};
var setXYStartEnd = function () {
    xStart = 0.1 * cnvWidth;
    xEnd = 0.9 * cnvWidth;
    yStart = cnvHeight * 0.8;
    yEnd = yStart + assemblyLineHeight;
};
var setCanvasWidthAndHeight = function () {
    cnvWidth = $("#welcome-screen").outerWidth();
    cnvHeight = $("#welcome-screen").outerHeight();
};
//# sourceMappingURL=welcome_screen_p5_effects.js.map