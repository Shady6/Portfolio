import { isCurrentViewportMedium, isViewportMedium, getViewportWidth, } from "./window_utils.js";
var underscore;
export var underscoreTransitionTime = 300;
var offsetTimeToMakeUnderscoreWider = 50;
var currentlySelectedLink = null;
var prevScreenWidth = getViewportWidth();
export var isScrollingProgramatically = false;
$(document).ready(function () {
    setUnderscore();
    setEventListeners();
    $(".nav-link span").addClass("transition-linear-color");
});
var setEventListeners = function () {
    $(".navbar-collapse").on("shown.bs.collapse", function () {
        placeUnderscoreWithEffects();
    });
    $(".navbar-collapse").on("hidden.bs.collapse", function () {
        placeUnderscoreWithEffects();
    });
    $(window).resize(function () {
        handleResize();
    });
};
var handleResize = function () {
    if (isViewportMedium(prevScreenWidth) !== isViewportMedium(getViewportWidth()))
        placeUnderscoreWithEffects();
    prevScreenWidth = getViewportWidth();
};
export var handleNavLinkClick = function (clickedElement) {
    currentlySelectedLink = clickedElement;
    if (!isCurrentViewportMedium()) {
        underscore.addClass("transition-ease-out-all");
        underscore.removeClass("transition-ease-out-width");
        moveUnderscoreWithEffects(clickedElement);
    }
    else {
        underscore.removeClass("transition-ease-out-all");
        underscore.addClass("transition-ease-out-width");
        moveUnderscoreWithEffectsMobile(clickedElement);
    }
    changeDocumentLocationHash(clickedElement);
};
var changeDocumentLocationHash = function (clickedElement) {
    document.location.hash = clickedElement[0].id.slice(0, -5);
};
var placeUnderscoreWithEffects = function () {
    underscore.removeClass("transition-ease-out-all");
    underscore.removeClass("transition-ease-out-width");
    var navLink = currentlySelectedLink || $($(".nav-link-text")[0]);
    placeUnderscore(navLink);
    if (!isCurrentViewportMedium())
        underscore.addClass("transition-ease-out-all");
    else
        underscore.addClass("transition-ease-out-width");
    setUnderscoreWidthEqualToRefElement(navLink);
    colorLink(navLink);
};
var moveUnderscoreWithEffects = function (clickedElement) {
    uncolorLinks();
    colorLink(clickedElement);
    placeUnderscore(clickedElement);
    wiggleUnderscore(clickedElement);
};
var moveUnderscoreWithEffectsMobile = function (clickedElement) {
    uncolorLinks();
    colorLink(clickedElement);
    underscore.css("width", 0);
    setTimeout(function () {
        placeUnderscore(clickedElement);
        setUnderscoreWidthEqualToRefElement(clickedElement);
    }, underscoreTransitionTime);
};
var setUnderscore = function () {
    underscore = $(".underscore");
};
var wiggleUnderscore = function (referenceElement) {
    underscore.css("width", "1px");
    setTimeout(function () {
        setUnderscoreWidthEqualToRefElement(referenceElement);
    }, underscoreTransitionTime + offsetTimeToMakeUnderscoreWider);
};
var setUnderscoreWidthEqualToRefElement = function (referenceElement) {
    var navLinkWidth = referenceElement.outerWidth();
    underscore.css("width", navLinkWidth);
};
var placeUnderscore = function (referenceElement) {
    underscore.css("left", referenceElement.position().left);
    underscore.css("top", referenceElement.position().top + referenceElement.height() + 10);
};
var uncolorLinks = function () {
    $(".nav-link-text").removeClass("orange");
};
var colorLink = function (navLinkText) {
    navLinkText.addClass("orange");
};
