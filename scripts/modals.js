import { getViewportWidth, getViewportHeight } from "./window_utils.js";
import { mediumBreakpoint } from "./static_data.js";
var iframeWidthFactor = 0.8;
var iframeHeightFactor = 0.8;
var currentPhotoModalSelector = "";
$(document).ready(function () {
    setEventListeners();
    setSizeOfAllIframes();
});
var setEventListeners = function () {
    $(".play-video-showcase").on("click", function (e) {
        e.stopPropagation();
        handlePlayVideoClick(e.currentTarget.getAttribute("modal-to-show"));
    });
    $(".show-magnified-gallery").on("click", function (e) {
        if (getViewportWidth() > mediumBreakpoint)
            showMagnifiedGallery(e);
    });
    $(".close-modal").on("click", function (e) {
        e.stopPropagation();
        handleTimesAndBackgroundClick("#" + e.currentTarget.parentElement.id);
    });
    $(".modal-overlay").on("click", function (e) {
        if (e.target.tagName === "DIV")
            handleTimesAndBackgroundClick("#" + e.currentTarget.id);
    });
    $(window).resize(function () {
        setSizeOfAllIframes();
    });
};
var handlePlayVideoClick = function (modalId) {
    toggleModal($(modalId));
};
var handleTimesAndBackgroundClick = function (modalId) {
    if ($(modalId).hasClass("photo-modal"))
        showProperPhotoOnClose();
    stopAllVideos();
    toggleModal($(modalId));
};
var toggleModal = function (modal) {
    modal.toggleClass("d-flex");
    modal.toggleClass("d-none");
    $("body, html").toggleClass("overflow-hidden");
};
var setSizeOfAllIframes = function () {
    $("iframe").attr("width", getViewportWidth() * iframeWidthFactor);
    $("iframe").attr("height", getViewportHeight() * iframeHeightFactor);
};
var stopAllVideos = function () {
    $("iframe").each(function (i, iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', "*");
    });
};
var setVisibilityOfPhotos = function (photosParent, photoIndex) {
    var imgIndex = 0;
    $(photosParent[0].children).each(function (i, child) {
        if (child.tagName === "IMG") {
            if (imgIndex === photoIndex)
                $(child).show();
            else
                $(child).hide();
            imgIndex++;
        }
    });
};
var getDisplayedPhotoIndex = function (nodes) {
    var imgIndex = 0;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].tagName === "IMG") {
            if ($(nodes[i]).is(":visible"))
                break;
            imgIndex++;
        }
    }
    return imgIndex;
};
var showProperPhotoOnClose = function () {
    var childNodesOfPhotosContainer = document.querySelector(currentPhotoModalSelector + " .project-image-container").childNodes;
    var photoIndex = getDisplayedPhotoIndex(childNodesOfPhotosContainer);
    var photosParentContainer = $("div[modal-to-show=\"" + currentPhotoModalSelector + "\"]");
    setVisibilityOfPhotos(photosParentContainer, photoIndex);
};
var showMagnifiedGallery = function (e) {
    var modalToShowSelector = e.currentTarget.getAttribute("modal-to-show");
    currentPhotoModalSelector = modalToShowSelector;
    var photoIndex = getDisplayedPhotoIndex(e.currentTarget.childNodes);
    setVisibilityOfPhotos($(modalToShowSelector + " .project-image-container"), photoIndex);
    toggleModal($(modalToShowSelector));
};
