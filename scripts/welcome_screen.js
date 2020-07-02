import { getViewportHeight } from "./window_utils.js";
var welcomeText = "Hello,_ my name is (Mikołaj Piekutowski)_ * I'm a (full stack developer.)";
var timeToWriteCharacter = 100;
var pauseTime = 300;
$(document).ready(function () {
    setHeightOfWelcomeScreenDiv();
    $("#welcome-screen h1").html(transformTextToSpanText(welcomeText));
    writeOutTextOnScreen();
    setEventListeners();
});
var setEventListeners = function () {
    $(window).resize(function () {
        setHeightOfWelcomeScreenDiv();
    });
};
var setHeightOfWelcomeScreenDiv = function () {
    var welcomeScreen = $("#welcome-screen");
    var navHeight = $("nav").outerHeight();
    var heightOfWelcomeScreen = getViewportHeight() - navHeight;
    welcomeScreen.css("height", heightOfWelcomeScreen);
    welcomeScreen.css("margin-top", navHeight);
};
var writeOutTextOnScreen = function () {
    var elementsToWriteOut = flattenOutChildrenArray($("#welcome-screen h1").children());
    var totalTime = timeToWriteCharacter;
    var _loop_1 = function (i) {
        var currentElementToWriteOut = $($(elementsToWriteOut)[i]);
        setTimeout(function () {
            $("#welcome-screen h1 span").removeClass("border-right-1");
            currentElementToWriteOut.removeClass("opacity-0");
            currentElementToWriteOut.addClass("border-right-1");
            if (i === elementsToWriteOut.length - 1)
                setInterval(function () {
                    currentElementToWriteOut.toggleClass("border-right-1");
                }, 700);
        }, totalTime);
        if (currentElementToWriteOut.hasClass("pause"))
            totalTime += pauseTime;
        else
            totalTime += timeToWriteCharacter;
    };
    for (var i = 0; i < elementsToWriteOut.length; i++) {
        _loop_1(i);
    }
};
var transformTextToSpanText = function (text) {
    var textArray = text.split("");
    return textArray.map(function (letter) {
        if (letter === "*")
            return "<br>";
        else if (letter === "_")
            return "<span class=\"pause\"></span>";
        else if (letter === "(")
            return '<span class="red">';
        else if (letter === ")")
            return "</span>";
        return "<span class=\"opacity-0\">" + letter + "</span>";
    }).join("");
};
var flattenOutChildrenArray = function (childrenArray) {
    var flatArray = [];
    for (var i = 0; i < childrenArray.length; i++) {
        if ($(childrenArray[i]).children().length === 0)
            flatArray.push($(childrenArray[i]));
        else {
            var arrayFromRecursion = flattenOutChildrenArray($(childrenArray[i]).children());
            flatArray = flatArray.concat(arrayFromRecursion);
        }
    }
    return flatArray;
};
//# sourceMappingURL=welcome_screen.js.map