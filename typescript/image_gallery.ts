let currentImageIndex = 0;
let prevImageIndex = 0;
let imagesCount = 0;
let imageWidth = 0;

$(document).ready(() => {
  setEventListeners();
});

const setEventListeners = () => {
  $(".fa-arrow-left").on("click", (e) => {
    changeImage($(e.target).parent(), -1);
  });

  $(".fa-arrow-right").on("click", (e) => {
    changeImage($(e.target).parent(), 1);
  });
};

const changeImage = (parent: JQuery<HTMLElement>, direction: number) => {
  setImagesCount(parent);
  setCurrentImageIndex(parent);
  changeImageIndex(direction);
  moveImages(parent, direction);
};

const moveImages = (parent: JQuery<HTMLElement>, direction: number) => {
  $(parent.children()[currentImageIndex]).css("display", "block");
  $(parent.children()[prevImageIndex]).css("display", "none");
};

const changeImageIndex = (direction: number) => {
  prevImageIndex = currentImageIndex;
  let nextIndex = currentImageIndex + direction;

  if (nextIndex === -1) nextIndex = imagesCount - 1;

  currentImageIndex = nextIndex % imagesCount;
};

const setCurrentImageIndex = (parent: JQuery<HTMLElement>) => {
  parent.children().each((i, child) => {
    if ($(child).css("display") !== "none" && child.tagName === "IMG")
      currentImageIndex = i;
  });
};

const setImagesCount = (parent: JQuery<HTMLElement>) => {
  imagesCount = 0;

  parent.children().each((i, child) => {
    if (child.tagName === "IMG") imagesCount++;
  });
};
