import { getViewportHeight } from "./window_utils.js";
import { handleNavLinkClick } from "./nav.js";
var scrollTopValues = [];
var sections = [];
var navLinkIdAffix = "-span";
var activeLinkClass = "orange";
var paddingToChangeLinkScrollingUp = (1 / 3) * getViewportHeight();
var paddingToChangeLinkScrollingDown = getViewportHeight();
var userScoll = true;
var selectedSection = "";
var navbarTogglerClosed = true;
$(document).ready(function () {
    mapSectionsToTopPositions();
    setEventListeners();
    handleDocumentReady();
});
var setEventListeners = function () {
    document.onmousewheel = function () {
        userScoll = true;
    };
    document.addEventListener("touchstart", function () {
        userScoll = true;
    });
    $(".navbar-toggler").on("click", function () {
        navbarTogglerClosed = false;
    });
    $("#get-to-know-me-link").on("click", function (e) {
        userScoll = false;
        selectedSection = "#about";
        handleNavLinkClick($("#about-span"));
    });
    $(".nav-link").on("click", function (e) {
        userScoll = false;
        selectedSection = e.currentTarget.hash;
        handleNavLinkClick($("#" + e.currentTarget.firstChild.id));
    });
    $(document).scroll(function () {
        handleScroll();
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
var handleScroll = function () {
    if (userScoll) {
        scrollTopValues.push($(document).scrollTop());
        if (scrollTopValues.length === 2) {
            var deltaScrollY = scrollTopValues[1] - scrollTopValues[0];
            if (deltaScrollY > 0)
                handleScrollingDown();
            else if (deltaScrollY < 0)
                handleScrollingUp();
            scrollTopValues = [];
        }
    }
    else if (!navbarTogglerClosed)
        closeNavbarOnSectionClicked();
};
var closeNavbarOnSectionClicked = function () {
    for (var i = 0; i < sections.length; i++) {
        if (checkIfWindowScrolledToClickedSection(i)) {
            $(".navbar-toggler").click();
            navbarTogglerClosed = true;
            break;
        }
    }
};
var checkIfWindowScrolledToClickedSection = function (i) {
    return (sections[i].name === selectedSection.slice(1) &&
        ((window.pageYOffset + 100 >= sections[i].top &&
            window.pageYOffset - 100 <= sections[i].top) ||
            (i === sections.length - 1 &&
                window.pageYOffset + window.innerHeight >= document.body.clientHeight)));
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
    sections = [];
    $("section").each(function (i, section) {
        sections.push({
            top: $(section).position().top,
            name: $(section)[0].id
        });
    });
};
