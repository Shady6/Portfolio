import { getViewportHeight } from "./window_utils.js";
import { handleNavLinkClick } from "./nav.js";
var scrollTopValues = [];
var sections = [];
var sectionIdAffix = "-section";
var navLinkIdAffix = "-span";
var activeLinkClass = "orange";
var paddingToChangeLink = 1 / 3 * getViewportHeight();
$(document).ready(function () {
    mapSectionsToTopPositions();
    setEventListeners();
});
var setEventListeners = function () {
    $(window).scroll(function (e) {
        handleScroll(e);
    });
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
    var scrollTopWithPadding = scrollTopValues[1] + paddingToChangeLink;
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
    var scrollTopWithPadding = scrollTopValues[1] - paddingToChangeLink;
    for (var i = 0; i < sections.length; i++) {
        var currentNavLink = $("#" + sections[i].name + navLinkIdAffix);
        if (scrollTopWithPadding <= sections[i].top) {
            if (!currentNavLink.hasClass(activeLinkClass))
                handleNavLinkClick(currentNavLink);
            break;
        }
    }
};
var mapSectionsToTopPositions = function () {
    $("section").each(function (i, section) {
        sections.push({
            top: $(section).position().top,
            name: $(section)[0].id.slice(0, -sectionIdAffix.length)
        });
    });
};
