import {getViewportHeight} from "./window_utils.js";
import {handleNavLinkClick} from "./nav.js";

let scrollTopValues: number[] = [];

let sections: Section[] = [];
const sectionIdAffix = "-section";
const navLinkIdAffix = "-span";
const activeLinkClass = "orange";

const paddingToChangeLink = 1/3 * getViewportHeight();

$(document).ready(() => {
    mapSectionsToTopPositions();
    setEventListeners();
    handleDocumentReady();
});

const setEventListeners = (): void => {
    $(window).scroll((e) => {
        handleScroll(e);
    })
}

const handleDocumentReady = (): void => {
    let nameOfSectionToScrollTo = "";
    let distanceFromScrollTopToSection = Number.MAX_SAFE_INTEGER;
    const scrollTop = $(document).scrollTop();
    sections.forEach((section) => {
        const distance = Math.abs(section.top - scrollTop)
        console.log(section.top, scrollTop);
        if (distance < distanceFromScrollTopToSection)
            {
                distanceFromScrollTopToSection = distance;
                nameOfSectionToScrollTo = section.name;
            }
    });
    const currentNavLink = $(`#${nameOfSectionToScrollTo}${navLinkIdAffix}`);
    handleNavLinkClick(currentNavLink);
}

const handleScroll = (e: JQuery.ScrollEvent): void => {
    scrollTopValues.push($(document).scrollTop());

    if (scrollTopValues.length === 2){
        const deltaScrollY = scrollTopValues[1] - scrollTopValues[0];

        if (deltaScrollY > 0)
            handleScrollingDown();
        else if (deltaScrollY < 0)
            handleScrollingUp();

        scrollTopValues = [];
    }
}

const handleScrollingDown = () => {
    const scrollTopWithPadding = scrollTopValues[1] + paddingToChangeLink;

    for (let i = sections.length - 1; i >= 0; i--) {

        const currentNavLink = $(`#${sections[i].name}${navLinkIdAffix}`);

        if (scrollTopWithPadding >= sections[i].top){
            if (!currentNavLink.hasClass(activeLinkClass))
                handleNavLinkClick(currentNavLink);
            break;
        }
    }
}

const handleScrollingUp = () => {
    const scrollTopWithPadding = scrollTopValues[1] - paddingToChangeLink;

    for (let i = 0; i < sections.length; i++) {

        const currentNavLink = $(`#${sections[i].name}${navLinkIdAffix}`);

        if (scrollTopWithPadding <= sections[i].top){
            if (!currentNavLink.hasClass(activeLinkClass))
                handleNavLinkClick(currentNavLink);
            break;
        }
    }
}

const mapSectionsToTopPositions = () => {
    $("section").each((i, section) => {
        sections.push({
            top: $(section).position().top,
            name: $(section)[0].id.slice(0, -sectionIdAffix.length)
        })
    });
}

interface Section{
    top: number;
    name: string;
}