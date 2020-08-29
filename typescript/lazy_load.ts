import { mapSectionsToTopPositions } from "./nav_link_change_on_section_change.js";

document.addEventListener("DOMContentLoaded", function () {
  let lazyloadImages = document.querySelectorAll(".lazy");
  let lazyloadThrottleTimeout: number;
  const paddingTopToLoad = window.innerHeight * 2;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      lazyloadImages.forEach(function (element) {
        const yOffset = getTopOffsetOfElement(element);
        if (
          $(element).hasClass("lazy") &&
          yOffset < window.innerHeight + window.pageYOffset + paddingTopToLoad
        ) {
          element.src = element.dataset.src;
          element.classList.remove("lazy");
        }
      });

      if (document.querySelectorAll(".lazy").length == 0) {
        console.log("removed");
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);

    mapSectionsToTopPositions();
  }

  const getTopOffsetOfElement = (element: Element) => {
    const offsetTopOfElement = $(element).offset().top;
    return offsetTopOfElement || getHeightOfFirstNotHiddenElement(element);
  };

  const getHeightOfFirstNotHiddenElement = (element: Node): number => {
    if ($(element).offset().top) return $(element).offset().top;
    return getHeightOfFirstNotHiddenElement(element.parentNode);
  };

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
