import {mediumBreakpoint, largeBreakpoint} from "./static_data.js"

export const getViewportWidth = () : number => {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  };

  export const getViewportHeight = () : number => {
    return Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  };

  export const isCurrentViewportMedium = (): boolean => {
    return getViewportWidth() < largeBreakpoint;
  }

  export const isViewportMedium = (viewportWidth: number): boolean => {
    return viewportWidth < largeBreakpoint;
  }