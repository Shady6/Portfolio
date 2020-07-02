import { largeBreakpoint } from "./static_data.js";
export var getViewportWidth = function () {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
};
export var getViewportHeight = function () {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
};
export var isCurrentViewportMedium = function () {
    return getViewportWidth() < largeBreakpoint;
};
export var isViewportMedium = function (viewportWidth) {
    return viewportWidth < largeBreakpoint;
};
//# sourceMappingURL=window_utils.js.map