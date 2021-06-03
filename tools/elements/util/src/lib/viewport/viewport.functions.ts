export const getViewportWidth = (
  window: { innerWidth?: number },
  document: { documentElement?: { clientWidth?: number } }
): number | undefined => {
  return window?.innerWidth || document?.documentElement?.clientWidth;
};

export const getViewportHeight = (
  window: { innerHeight?: number },
  document: { documentElement?: { clientHeight?: number } }
): number | undefined => {
  return window?.innerHeight || document?.documentElement?.clientHeight;
};

export const getIsInViewport = (
  boundingClientRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): boolean => {
  return (
    boundingClientRect.top >= 0 &&
    boundingClientRect.left >= 0 &&
    boundingClientRect.right <= viewportWidth &&
    boundingClientRect.bottom <= viewportHeight
  );
};
