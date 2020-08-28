import {
  isCurrentViewportMedium,
  isViewportMedium,
  getViewportWidth,
} from "./window_utils.js";

let underscore: JQuery<HTMLElement>;
export const underscoreTransitionTime: number = 300;
const offsetTimeToMakeUnderscoreWider: number = 50;

let currentlySelectedLink: JQuery<HTMLElement> = null;

let prevScreenWidth: number = getViewportWidth();

export let isScrollingProgramatically = false;

$(document).ready(() => {
  setUnderscore();
  setEventListeners();
  $(".nav-link span").addClass("transition-linear-color");
});

const setEventListeners = (): void => {
  $(".navbar-collapse").on("shown.bs.collapse", () => {
    placeUnderscoreWithEffects();
  });

  $(".navbar-collapse").on("hidden.bs.collapse", () => {
    placeUnderscoreWithEffects();
  });

  $(window).resize(() => {
    handleResize();
  });
};

const handleResize = (): void => {
  if (
    isViewportMedium(prevScreenWidth) !== isViewportMedium(getViewportWidth())
  )
    placeUnderscoreWithEffects();

  prevScreenWidth = getViewportWidth();
};


export const handleNavLinkClick = (
  clickedElement: JQuery<HTMLElement>
): void => {
  currentlySelectedLink = clickedElement;

  if (!isCurrentViewportMedium()) {
    underscore.addClass("transition-ease-out-all");
    underscore.removeClass("transition-ease-out-width");
    moveUnderscoreWithEffects(clickedElement);
  } else {
    underscore.removeClass("transition-ease-out-all");
    underscore.addClass("transition-ease-out-width");
    moveUnderscoreWithEffectsMobile(clickedElement);
  }

  changeDocumentLocationHash(clickedElement);
};

const changeDocumentLocationHash = (clickedElement: JQuery<HTMLElement>) => {
  document.location.hash = clickedElement[0].id.slice(0, -5);
}

const placeUnderscoreWithEffects = (): void => {
  underscore.removeClass("transition-ease-out-all");
  underscore.removeClass("transition-ease-out-width");
  const navLink = currentlySelectedLink || $($(".nav-link-text")[0]);

  placeUnderscore(navLink);

  if (!isCurrentViewportMedium())
    underscore.addClass("transition-ease-out-all");
  else underscore.addClass("transition-ease-out-width");

  setUnderscoreWidthEqualToRefElement(navLink);
  colorLink(navLink);
};

const moveUnderscoreWithEffects = (
  clickedElement: JQuery<HTMLElement>
): void => {
  uncolorLinks();
  colorLink(clickedElement);

  placeUnderscore(clickedElement);
  wiggleUnderscore(clickedElement);
};

const moveUnderscoreWithEffectsMobile = (
  clickedElement: JQuery<HTMLElement>
): void => {
  uncolorLinks();
  colorLink(clickedElement);

  underscore.css("width", 0);
  setTimeout(() => {
    placeUnderscore(clickedElement);
    setUnderscoreWidthEqualToRefElement(clickedElement);
  }, underscoreTransitionTime);
};

const setUnderscore = (): void => {
  underscore = $(".underscore");
};

const wiggleUnderscore = (referenceElement: JQuery<HTMLElement>): void => {
  underscore.css("width", "1px");
  setTimeout(() => {
    setUnderscoreWidthEqualToRefElement(referenceElement);
  }, underscoreTransitionTime + offsetTimeToMakeUnderscoreWider);
};

const setUnderscoreWidthEqualToRefElement = (
  referenceElement: JQuery<HTMLElement>
): void => {
  let navLinkWidth: number = referenceElement.outerWidth();
  underscore.css("width", navLinkWidth);
};

const placeUnderscore = (referenceElement: JQuery<HTMLElement>): void => {
  underscore.css("left", referenceElement.position().left);
  underscore.css(
    "top",
    referenceElement.position().top + referenceElement.height() + 10
  );
};

const uncolorLinks = (): void => {
  $(".nav-link-text").removeClass("orange");
};

const colorLink = (navLinkText: JQuery<HTMLElement>): void => {
  navLinkText.addClass("orange");
};
