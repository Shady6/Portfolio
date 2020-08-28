import { mapSectionsToTopPositions } from "./nav_link_change_on_section_change.js";
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll(".lazy");
    var lazyloadThrottleTimeout;
    var paddingTopToLoad = window.innerHeight;
    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }
        lazyloadThrottleTimeout = setTimeout(function () {
            lazyloadImages.forEach(function (element) {
                var yOffset = getTopOffsetOfElement(element);
                if (yOffset < window.innerHeight + window.pageYOffset + paddingTopToLoad) {
                    element.src = element.dataset.src;
                    element.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
        mapSectionsToTopPositions();
    }
    var getTopOffsetOfElement = function (element) {
        var offsetTopOfElement = $(element).offset().top;
        return offsetTopOfElement || getHeightOfFirstNotHiddenElement(element);
    };
    var getHeightOfFirstNotHiddenElement = function (element) {
        if ($(element).offset().top)
            return $(element).offset().top;
        return getHeightOfFirstNotHiddenElement(element.parentNode);
    };
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});
