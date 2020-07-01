import {
  isCurrentViewportMedium,
  isViewportMedium,
  getViewportWidth,
} from "./window_utils.js";

let underscore: JQuery<HTMLElement>;
const underscoreTransitionTime: number = 300;
const offsetTimeToMakeUnderscoreWider: number = 50;

const underscoreTransitionTimeMobile: number = 300;

let currentlySelectedLink: JQuery<HTMLElement> = null;

let prevScreenWidth: number = getViewportWidth();

$(document).ready(() => {
  setUnderscore();

  setEventListeners();

  if (!isCurrentViewportMedium()) placeUnderscoreWithEffects();
});

const setEventListeners = (): void => {
  $(".navbar-collapse").on("shown.bs.collapse", () => {
    placeUnderscoreWithEffects();
  });

  $(".navbar-collapse").on("hidden.bs.collapse", () => {
    placeUnderscoreWithEffects();
  });

  $(".nav-link-text").on("click", (e) => {
    handleNavLinkClick(e);
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

const handleNavLinkClick = (e: JQuery.ClickEvent): void => {
  currentlySelectedLink = $(e.target);

  if (!isCurrentViewportMedium()) {
    underscore.addClass("transition-ease-out-all");
    underscore.removeClass("transition-ease-out-width");
    moveUnderscoreWithEffects(e);
  } else {
    underscore.removeClass("transition-ease-out-all");
    underscore.addClass("transition-ease-out-width");
    moveUnderscoreWithEffectsMobile(e);
  }
};

const placeUnderscoreWithEffects = (): void => {
  underscore.removeClass("transition-ease-out-all");
  underscore.removeClass("transition-ease-out-width");
  const navLink = currentlySelectedLink || $($(".nav-link-text")[0]);

  placeUnderscore(navLink);

  if (!isCurrentViewportMedium())
    underscore.addClass("transition-ease-out-all");
  else underscore.addClass("transition-ease-out-width");

  setUnderscoreWidthEqualToRefElement(navLink);
  setTimeout(() => {
    colorLink(navLink);
  }, underscoreTransitionTime);
};

const moveUnderscoreWithEffects = (e: JQuery.ClickEvent): void => {
  uncolorLinks();
  colorLink($(e.target));

  placeUnderscore($(e.target));
  wiggleUnderscore($(e.target));
};

const moveUnderscoreWithEffectsMobile = (e: JQuery.ClickEvent): void => {
  uncolorLinks();
  colorLink($(e.target));

  underscore.css("width", 0);
  setTimeout(() => {
    placeUnderscore($(e.target));
    setUnderscoreWidthEqualToRefElement($(e.target));
  }, underscoreTransitionTimeMobile);
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
