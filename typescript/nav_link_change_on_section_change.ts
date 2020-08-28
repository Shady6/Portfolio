import { getViewportHeight } from "./window_utils.js";
import { handleNavLinkClick, underscoreTransitionTime } from "./nav.js";

let scrollTopValues: number[] = [];

let sections: Section[] = [];
const sectionIdAffix = "-section";
const navLinkIdAffix = "-span";
const activeLinkClass = "orange";

const paddingToChangeLinkScrollingUp = (1 / 3) * getViewportHeight();
const paddingToChangeLinkScrollingDown = getViewportHeight();

let userScoll = true;
let selectedSection = "";
let navbarTogglerClosed = true;

$(document).ready(() => {
  mapSectionsToTopPositions();
  setEventListeners();
  handleDocumentReady();
});

const setEventListeners = (): void => {
  document.onmousewheel = () => {
    userScoll = true;
  };

  document.addEventListener("touchstart", () => {
    userScoll = true;
  });

  $(".navbar-toggler").on("click", () => {
    navbarTogglerClosed = false;
  });

  $(".nav-link").on("click", (e) => {
    userScoll = false;
    selectedSection = e.currentTarget.hash;
    handleNavLinkClick($(`#${e.currentTarget.firstChild.id}`));
  });

  $(document).scroll(() => {
    handleScroll();
  });
};

const handleDocumentReady = (): void => {
  let nameOfSectionToScrollTo = "";
  let distanceFromScrollTopToSection = Number.MAX_SAFE_INTEGER;
  const scrollTop = $(document).scrollTop();
  sections.forEach((section) => {
    const distance = Math.abs(section.top - scrollTop);
    if (distance < distanceFromScrollTopToSection) {
      distanceFromScrollTopToSection = distance;
      nameOfSectionToScrollTo = section.name;
    }
  });
  const currentNavLink = $(`#${nameOfSectionToScrollTo}${navLinkIdAffix}`);
  handleNavLinkClick(currentNavLink);
  console.table(sections);
};

const handleScroll = (): void => {
  if (userScoll) {
    scrollTopValues.push($(document).scrollTop());

    if (scrollTopValues.length === 2) {
      const deltaScrollY = scrollTopValues[1] - scrollTopValues[0];

      if (deltaScrollY > 0) handleScrollingDown();
      else if (deltaScrollY < 0) handleScrollingUp();

      scrollTopValues = [];
    }
  } else if (!navbarTogglerClosed) closeNavbarOnSectionClicked();
};

const closeNavbarOnSectionClicked = () => {
  for (let i = 0; i < sections.length; i++) {
    if (checkIfWindowScrolledToClickedSection(i)) {
      $(".navbar-toggler").click();
      navbarTogglerClosed = true;
      break;
    }
  }
};

const checkIfWindowScrolledToClickedSection = (i: number): boolean => {
  return (
    sections[i].name === selectedSection.slice(1, -sectionIdAffix.length) &&
      ((window.pageYOffset + 100 >= sections[i].top &&
        window.pageYOffset - 100 <= sections[i].top) ||
      (i === sections.length - 1 &&
        window.pageYOffset + window.innerHeight >= document.body.clientHeight))
  );
};

const handleScrollingDown = () => {
  const scrollTopWithPadding =
    scrollTopValues[1] + paddingToChangeLinkScrollingDown;

  for (let i = sections.length - 1; i >= 0; i--) {
    const currentNavLink = $(`#${sections[i].name}${navLinkIdAffix}`);

    if (scrollTopWithPadding >= sections[i].top) {
      if (!currentNavLink.hasClass(activeLinkClass))
        handleNavLinkClick(currentNavLink);
      break;
    }
  }
};

const handleScrollingUp = () => {
  const scrollTopWithPadding =
    scrollTopValues[1] + paddingToChangeLinkScrollingUp;

  for (let i = sections.length - 2; i >= -1; i--) {
    const currentNavLink = $(`#${sections[i + 1].name}${navLinkIdAffix}`);

    if (scrollTopWithPadding >= sections[i + 1].top) {
      if (!currentNavLink.hasClass(activeLinkClass))
        handleNavLinkClick(currentNavLink);
      break;
    }
  }
};

export const mapSectionsToTopPositions = () => {
  sections = [];
  $("section").each((i, section) => {
    sections.push({
      top: $(section).position().top,
      name: $(section)[0].id.slice(0, -sectionIdAffix.length),
    });
  });
};

interface Section {
  top: number;
  name: string;
}
