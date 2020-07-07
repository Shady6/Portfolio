var currentImageIndex = 0;
var prevImageIndex = 0;
var imagesCount = 0;
var imageWidth = 0;
$(document).ready(function () {
    setEventListeners();
});
var setEventListeners = function () {
    $(".fa-arrow-left").on("click", function (e) {
        changeImage($(e.target).parent(), -1);
    });
    $(".fa-arrow-right").on("click", function (e) {
        changeImage($(e.target).parent(), 1);
    });
};
var changeImage = function (parent, direction) {
    setImagesCount(parent);
    setCurrentImageIndex(parent);
    changeImageIndex(direction);
    moveImages(parent, direction);
};
var moveImages = function (parent, direction) {
    $(parent.children()[currentImageIndex]).css("display", "block");
    $(parent.children()[prevImageIndex]).css("display", "none");
};
var changeImageIndex = function (direction) {
    prevImageIndex = currentImageIndex;
    var nextIndex = currentImageIndex + direction;
    if (nextIndex === -1)
        nextIndex = imagesCount - 1;
    currentImageIndex = nextIndex % imagesCount;
};
var setCurrentImageIndex = function (parent) {
    parent.children().each(function (i, child) {
        if ($(child).css("display") !== "none" && child.tagName === "IMG")
            currentImageIndex = i;
    });
};
var setImagesCount = function (parent) {
    imagesCount = 0;
    parent.children().each(function (i, child) {
        if (child.tagName === "IMG")
            imagesCount++;
    });
};
