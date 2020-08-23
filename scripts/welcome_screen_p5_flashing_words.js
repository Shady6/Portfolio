/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />
var cnvWidth = 0;
var cnvHeight = 0;
var font;
var fontSize = 24;
var textColor;
var textRestrictedAreaH1;
var textRestrictedAreaBtn;
var yPaddingToRestrictedArea = 50;
var xPaddingToRestrictedArea = 35;
var canFlashNewWord = [false, false, false];
var indexOfWordToFlash = [0, 0, 0];
var textOpacity = [0, 0, 0];
var textOpacityIsGoingUp = [true, true, true];
var opacityChangeSpeed = 3;
var wordsToFlash = [
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
var wordsetsCount = 3;
var longestWord = "TypeScript";
var wordCoords = new Array(3);
var timeToStartFlashingWordset = [4000, 4500, 5000];
function preload() {
    font = loadFont("../assets/arial.ttf");
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
    var canvas = createCanvas(cnvWidth, cnvHeight);
    canvas.parent("welcome-screen");
    setBoundingBoxOfWelcomeText();
    setBoundingBoxOfGetToKnowMeBtn();
    for (var i = 0; i < wordsetsCount; i++)
        setWordCoordsOutsideRestrictedAreas(i);
    textColor = color(200, 200, 200);
    textColor.setAlpha(0);
    background(34, 34, 34);
    fill(textColor);
}
function draw() {
    clear();
    flashWords();
}
var flashWords = function () {
    for (var i = 0; i < wordsToFlash.length && millis() > timeToStartFlashingWordset[i]; i++) {
        oscilateOpacity(i);
        flashWord(wordsToFlash[i][indexOfWordToFlash[i]], textOpacity[i], i, wordCoords[i]);
        if (textOpacity[i] <= 1 && canFlashNewWord[i]) {
            setWordCoordsOutsideRestrictedAreas(i);
            canFlashNewWord[i] = false;
            indexOfWordToFlash[i] = generateRandomIndex(0, wordsToFlash[i].length, indexOfWordToFlash[i]);
        }
    }
};
var flashWord = function (word, opacity, wordSetIndex, coords) {
    textColor.setAlpha(opacity);
    fill(textColor);
    text(word, coords.x, coords.y);
    if (alpha(textColor) >= 250)
        canFlashNewWord[wordSetIndex] = true;
};
var oscilateOpacity = function (wordsetIndex) {
    if (textOpacity[wordsetIndex] >= 255)
        textOpacityIsGoingUp[wordsetIndex] = false;
    if (textOpacity[wordsetIndex] <= 0)
        textOpacityIsGoingUp[wordsetIndex] = true;
    if (textOpacityIsGoingUp[wordsetIndex])
        textOpacity[wordsetIndex] += opacityChangeSpeed;
    else
        textOpacity[wordsetIndex] -= opacityChangeSpeed;
};
var setTextCharacteristics = function () {
    textFont(font);
    setFontSize();
};
var setCanvasWidthAndHeight = function () {
    cnvWidth = $("#welcome-screen").outerWidth();
    cnvHeight = $("#welcome-screen").outerHeight();
};
var setWordCoordsOutsideRestrictedAreas = function (indexOfWordSet) {
    do {
        wordCoords[indexOfWordSet] = generateRandomPoint();
    } while (isPointInBox(textRestrictedAreaH1, wordCoords[indexOfWordSet]) ||
        isPointInBox(textRestrictedAreaBtn, wordCoords[indexOfWordSet]));
};
var generateRandomIndex = function (min, max, exclude) {
    var randomIndex = 0;
    do {
        randomIndex = Math.floor(random(min, max));
    } while (randomIndex == exclude);
    return randomIndex;
};
var generateRandomPoint = function () {
    var x = random(textWidth(longestWord), cnvWidth - textWidth(longestWord) * 2);
    var y = random(textSize(), cnvHeight - textSize() * 2);
    return { x: x, y: y };
};
var setFontSize = function () {
    var welcomeTextFontSize = Number($("#welcome-screen h1").css("font-size").slice(0, -2));
    if (cnvWidth < 600)
        fontSize = welcomeTextFontSize / 1.3;
    else
        fontSize = welcomeTextFontSize / 2;
    textSize(fontSize);
};
var setBoundingBoxOfWelcomeText = function () {
    var y = $("#welcome-screen h1").position().top;
    var navHeight = $("nav").outerHeight();
    textRestrictedAreaH1 = {
        coords: {
            x: 0,
            y: y - navHeight - yPaddingToRestrictedArea
        },
        width: cnvWidth,
        height: $("#welcome-screen h1").height() + 2 * yPaddingToRestrictedArea
    };
};
var setBoundingBoxOfGetToKnowMeBtn = function () {
    var y = $("#welcome-screen button").position().top;
    var x = $("#welcome-screen button").position().left;
    var btnWidth = $("#welcome-screen button").outerWidth();
    var navHeight = $("nav").outerHeight();
    textRestrictedAreaBtn = {
        coords: {
            x: x - xPaddingToRestrictedArea - textWidth(longestWord),
            y: y - navHeight - yPaddingToRestrictedArea
        },
        width: btnWidth + 2 * (xPaddingToRestrictedArea + textWidth(longestWord)),
        height: $("#welcome-screen button").height() + 2 * yPaddingToRestrictedArea
    };
};
var isPointInBox = function (box, point) {
    return (point.x >= box.coords.x &&
        point.x <= box.coords.x + box.width &&
        point.y >= box.coords.y &&
        point.y <= box.coords.y + box.height);
};
