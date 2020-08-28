import { getViewportHeight } from "./window_utils.js";
import { handleNavLinkClick } from "./nav.js";
var scrollTopValues = [];
var sections = [];
var sectionIdAffix = "-section";
var navLinkIdAffix = "-span";
var activeLinkClass = "orange";
var paddingToChangeLinkScrollingUp = 1 / 3 * getViewportHeight();
var paddingToChangeLinkScrollingDown = 2 / 3 * getViewportHeight();
$(document).ready(function () {
    mapSectionsToTopPositions();
    setEventListeners();
    handleDocumentReady();
});
var setEventListeners = function () {
    $(window).scroll(function (e) {
        handleScroll(e);
    });
};
var handleDocumentReady = function () {
    var nameOfSectionToScrollTo = "";
    var distanceFromScrollTopToSection = Number.MAX_SAFE_INTEGER;
    var scrollTop = $(document).scrollTop();
    sections.forEach(function (section) {
        var distance = Math.abs(section.top - scrollTop);
        if (distance < distanceFromScrollTopToSection) {
            distanceFromScrollTopToSection = distance;
            nameOfSectionToScrollTo = section.name;
        }
    });
    var currentNavLink = $("#" + nameOfSectionToScrollTo + navLinkIdAffix);
    handleNavLinkClick(currentNavLink);
};
var handleScroll = function (e) {
    scrollTopValues.push($(document).scrollTop());
    if (scrollTopValues.length === 2) {
        var deltaScrollY = scrollTopValues[1] - scrollTopValues[0];
        if (deltaScrollY > 0)
            handleScrollingDown();
        else if (deltaScrollY < 0)
            handleScrollingUp();
        scrollTopValues = [];
    }
};
var handleScrollingDown = function () {
    var scrollTopWithPadding = scrollTopValues[1] + paddingToChangeLinkScrollingDown;
    for (var i = sections.length - 1; i >= 0; i--) {
        var currentNavLink = $("#" + sections[i].name + navLinkIdAffix);
        if (scrollTopWithPadding >= sections[i].top) {
            if (!currentNavLink.hasClass(activeLinkClass))
                handleNavLinkClick(currentNavLink);
            break;
        }
    }
};
var handleScrollingUp = function () {
    var scrollTopWithPadding = scrollTopValues[1] + paddingToChangeLinkScrollingUp;
    for (var i = sections.length - 2; i >= -1; i--) {
        var currentNavLink = $("#" + sections[i + 1].name + navLinkIdAffix);
        if (scrollTopWithPadding >= sections[i + 1].top) {
            if (!currentNavLink.hasClass(activeLinkClass))
                handleNavLinkClick(currentNavLink);
            break;
        }
    }
};
export var mapSectionsToTopPositions = function () {
    $("section").each(function (i, section) {
        sections.push({
            top: $(section).position().top,
            name: $(section)[0].id.slice(0, -sectionIdAffix.length)
        });
    });
};
