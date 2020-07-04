/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />
var cnvWidth = 0;
var cnvHeight = 0;
var font;
var fontSize = 24;
var textColor;
var textRestrictedArea;
var yPaddingToRestrictedArea = 50;
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
var wordsetsCount = 3;
var longestWord = "kurczak";
var wordCoords = new Array(3);
var timeToStartFlashingWordset = [3850, 4350, 4850];
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
    var canvas = createCanvas(cnvWidth, cnvHeight);
    canvas.parent("welcome-screen");
    setBoundingBoxOfWelcomeText();
    for (var i = 0; i < wordsetsCount; i++)
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
    } while (isPointInBox(textRestrictedArea, wordCoords[indexOfWordSet]));
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
    var welcomeTextFontSize = Number($("h1").css("font-size").slice(0, -2));
    if (cnvWidth < 600)
        fontSize = welcomeTextFontSize / 1.3;
    else
        fontSize = welcomeTextFontSize / 2;
    textSize(fontSize);
};
var setBoundingBoxOfWelcomeText = function () {
    var y = Number($("h1").css("margin-top").slice(0, -2));
    textRestrictedArea = {
        coords: {
            x: 0,
            y: y - yPaddingToRestrictedArea
        },
        width: cnvWidth,
        height: $("h1").height() + 2 * yPaddingToRestrictedArea
    };
};
var isPointInBox = function (box, point) {
    return (point.x >= box.coords.x &&
        point.x <= box.coords.x + box.width &&
        point.y >= box.coords.y &&
        point.y <= box.coords.y + box.height);
};
//# sourceMappingURL=welcome_screen_p5_flashing_words.js.map