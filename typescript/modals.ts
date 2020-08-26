import { getViewportWidth, getViewportHeight } from "./window_utils.js";
import {mediumBreakpoint} from "./static_data.js";

const iframeWidthFactor = 0.8;
const iframeHeightFactor = 0.8;

let currentPhotoModalSelector = "";

$(document).ready(() => {
  setEventListeners();
  setSizeOfAllIframes();
});

const setEventListeners = () => {
  $(".play-video-showcase").on("click", (e) => {
    e.stopPropagation();
    handlePlayVideoClick(e.currentTarget.getAttribute("modal-to-show"));
  });

  $(".show-magnified-gallery").on("click", (e) => {
    if (getViewportWidth() > mediumBreakpoint)
      showMagnifiedGallery(e);
  });

  $(".close-modal").on("click", (e) => {
    e.stopPropagation();
    handleTimesAndBackgroundClick("#" + e.currentTarget.parentElement.id);
    
  });

  $(".modal-overlay").on("click", (e) => {
    if (e.target.tagName === "DIV")
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

  if ($(modalId).hasClass("photo-modal"))
    showProperPhotoOnClose();

  stopAllVideos();
  toggleModal($(modalId));
};

const toggleModal = (modal: JQuery<HTMLElement>) => {
  modal.toggleClass("d-flex");
  modal.toggleClass("d-none");
  $("body, html").toggleClass("overflow-hidden");
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

const setVisibilityOfPhotos = (
  photosParent: JQuery<HTMLElement>,
  photoIndex: number
) => {
  let imgIndex = 0;

  $(photosParent[0].children).each((i, child) => {
    if (child.tagName === "IMG") {
      if (imgIndex === photoIndex) $(child).show();
      else $(child).hide();
      imgIndex++;
    }
  });
};

const getDisplayedPhotoIndex = (nodes: NodeListOf<ChildNode>): number => {
  let imgIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName === "IMG") {
      if ($(nodes[i]).is(":visible")) break;
      imgIndex++;
    }
  }

  return imgIndex;
};


const showProperPhotoOnClose = () => {
  const childNodesOfPhotosContainer = document.querySelector(`${currentPhotoModalSelector} .project-image-container`).childNodes;
  const photoIndex = getDisplayedPhotoIndex(childNodesOfPhotosContainer);
  const photosParentContainer = $(`div[modal-to-show="${currentPhotoModalSelector}"]`);


  setVisibilityOfPhotos(photosParentContainer, photoIndex);

}

const showMagnifiedGallery = (
  e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
) => {
  const modalToShowSelector = e.currentTarget.getAttribute("modal-to-show");
  currentPhotoModalSelector = modalToShowSelector;

  const photoIndex = getDisplayedPhotoIndex(
    e.currentTarget.childNodes
  );
  setVisibilityOfPhotos(
    $(`${modalToShowSelector} .project-image-container`),
    photoIndex
  );

  toggleModal($(modalToShowSelector));
};
