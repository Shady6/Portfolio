import { isCurrentViewportMedium, isViewportMedium, getViewportWidth, } from "./window_utils.js";
var underscore;
var underscoreTransitionTime = 300;
var offsetTimeToMakeUnderscoreWider = 50;
var underscoreTransitionTimeMobile = 300;
var currentlySelectedLink = null;
var prevScreenWidth = getViewportWidth();
$(document).ready(function () {
    setUnderscore();
    setEventListeners();
    if (!isCurrentViewportMedium())
        placeUnderscoreWithEffects();
});
var setEventListeners = function () {
    $(".navbar-collapse").on("shown.bs.collapse", function () {
        placeUnderscoreWithEffects();
    });
    $(".navbar-collapse").on("hidden.bs.collapse", function () {
        placeUnderscoreWithEffects();
    });
    $(".nav-link-text").on("click", function (e) {
        handleNavLinkClick(e);
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
var handleNavLinkClick = function (e) {
    currentlySelectedLink = $(e.target);
    if (!isCurrentViewportMedium()) {
        underscore.addClass("transition-ease-out-all");
        underscore.removeClass("transition-ease-out-width");
        moveUnderscoreWithEffects(e);
    }
    else {
        underscore.removeClass("transition-ease-out-all");
        underscore.addClass("transition-ease-out-width");
        moveUnderscoreWithEffectsMobile(e);
    }
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
    setTimeout(function () {
        colorLink(navLink);
    }, underscoreTransitionTime);
};
var moveUnderscoreWithEffects = function (e) {
    uncolorLinks();
    colorLink($(e.target));
    placeUnderscore($(e.target));
    wiggleUnderscore($(e.target));
};
var moveUnderscoreWithEffectsMobile = function (e) {
    uncolorLinks();
    colorLink($(e.target));
    underscore.css("width", 0);
    setTimeout(function () {
        placeUnderscore($(e.target));
        setUnderscoreWidthEqualToRefElement($(e.target));
    }, underscoreTransitionTimeMobile);
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
//# sourceMappingURL=nav.js.map