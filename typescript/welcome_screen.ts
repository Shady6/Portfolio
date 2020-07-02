import { getViewportHeight } from "./window_utils.js";

const welcomeText =
  "Hello,_ my name is (Mikołaj Piekutowski)_ * I'm a (full stack developer.)";

const timeToWriteCharacter = 100;
const pauseTime = 300;

$(document).ready(() => {
  setHeightOfWelcomeScreenDiv();

  $("#welcome-screen h1").html(
      transformTextToSpanText(welcomeText)
  );

  writeOutTextOnScreen();

  setEventListeners();
});

const setEventListeners = (): void => {
  $(window).resize(() => {
    setHeightOfWelcomeScreenDiv();
  });
};

const setHeightOfWelcomeScreenDiv = (): void => {
  const welcomeScreen = $("#welcome-screen");
  const navHeight = $("nav").outerHeight();

  const heightOfWelcomeScreen = getViewportHeight() - navHeight;

  welcomeScreen.css("height", heightOfWelcomeScreen);
  welcomeScreen.css("margin-top", navHeight);
}; 

const writeOutTextOnScreen = (): void => {
    const elementsToWriteOut = flattenOutChildrenArray($("#welcome-screen h1").children());
    let totalTime = timeToWriteCharacter;

    for (let i = 0; i < elementsToWriteOut.length; i++) {
        const currentElementToWriteOut = $($(elementsToWriteOut)[i]);

        setTimeout(() => {
            $("#welcome-screen h1 span").removeClass("border-right-1");
            currentElementToWriteOut.removeClass("opacity-0");
            currentElementToWriteOut.addClass("border-right-1");

            if (i === elementsToWriteOut.length - 1)
                setInterval(() => {
                    currentElementToWriteOut.toggleClass("border-right-1");
                }, 700);
        }, totalTime);

        if (currentElementToWriteOut.hasClass("pause"))
            totalTime += pauseTime;
        else
            totalTime += timeToWriteCharacter;
    }
}

const transformTextToSpanText = (text: string): string => {
  let textArray = text.split("");

  return textArray.map((letter) => {
    if (letter === "*") return "<br>";
    else if (letter === "_") return "<span class=\"pause\"></span>";
    else if (letter === "(") return '<span class="red">';
    else if (letter === ")") return "</span>";
    return `<span class="opacity-0">${letter}</span>`;
  }).join("");
};

const flattenOutChildrenArray = (childrenArray: JQuery<HTMLElement>): JQuery<HTMLElement>[] => {
    
    let flatArray: JQuery<HTMLElement>[] = [];
    
    for (let i = 0; i < childrenArray.length; i++) {
        if ($(childrenArray[i]).children().length === 0)
            flatArray.push($(childrenArray[i]));
        else{
            let arrayFromRecursion = flattenOutChildrenArray($(childrenArray[i]).children());
            flatArray = flatArray.concat(arrayFromRecursion);
        }
    }

    return flatArray;
} 

