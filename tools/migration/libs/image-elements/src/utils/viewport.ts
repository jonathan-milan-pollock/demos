const getViewportWidth = (
  window: { innerWidth?: number },
  document: { documentElement?: { clientWidth?: number } },
) => {
  return window?.innerWidth || document?.documentElement?.clientWidth;
};

const getViewportHeight = (
  window: { innerHeight?: number },
  document: { documentElement?: { clientHeight?: number } },
) => {
  return window?.innerHeight || document?.documentElement?.clientHeight;
};

const isInViewport = (
  element: any,
  viewportWidth: number,
  viewportHeight: number,
): boolean => {
  const boundingClientRect = element.getBoundingClientRect();

  return (
    boundingClientRect.top >= 0 &&
    boundingClientRect.left >= 0 &&
    boundingClientRect.right <= viewportWidth &&
    boundingClientRect.bottom <= viewportHeight
  );
};

export { getViewportWidth, getViewportHeight, isInViewport };

