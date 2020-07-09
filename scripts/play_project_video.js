import { getViewportWidth, getViewportHeight } from "./window_utils.js";
var iframeWidthFactor = 0.8;
var iframeHeightFactor = 0.8;
$(document).ready(function () {
    setEventListeners();
    setSizeOfAllIframes();
});
var setEventListeners = function () {
    $(".play-video-showcase").on("click", function (e) {
        handlePlayVideoClick(e.currentTarget.getAttribute("modal-to-show"));
    });
    $(".close-modal").on("click", function (e) {
        e.stopPropagation();
        handleTimesAndBackgroundClick("#" + e.currentTarget.parentElement.id);
    });
    $(".modal-overlay").on("click", function (e) {
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
