import { getViewportWidth, getViewportHeight } from "./window_utils.js";

const iframeWidthFactor = 0.8;
const iframeHeightFactor = 0.8;

$(document).ready(() => {
  setEventListeners();
  setSizeOfAllIframes();
});

const setEventListeners = () => {
  $(".play-video-showcase").on("click", (e) => {
    handlePlayVideoClick(e.currentTarget.getAttribute("modal-to-show"));
  });

  $(".close-modal").on("click", (e) => {
    e.stopPropagation();
    handleTimesAndBackgroundClick("#" + e.currentTarget.parentElement.id);
  });

  $(".modal-overlay").on("click", (e) => {
    handleTimesAndBackgroundClick("#" + e.currentTarget.id);
  });

  $(window).resize(() => {
    setSizeOfAllIframes();
  });
};

const handlePlayVideoClick = (modalId: string) => {
  toggleModal($(modalId));
};

const handleTimesAndBackgroundClick = (modalId: string) => {
  stopAllVideos();
  toggleModal($(modalId));
};

const toggleModal = (modal: JQuery<HTMLElement>) => {
  modal.toggleClass("d-flex");
  modal.toggleClass("d-none");
  $("body, html").toggleClass("overflow-hidden")
};

const setSizeOfAllIframes = () => {
  $("iframe").attr("width", getViewportWidth() * iframeWidthFactor);
  $("iframe").attr("height", getViewportHeight() * iframeHeightFactor);
};

const stopAllVideos = () => {
  $("iframe").each((i, iframe) => {
    iframe.contentWindow.postMessage(
        '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
        "*"
      );
  });
};
