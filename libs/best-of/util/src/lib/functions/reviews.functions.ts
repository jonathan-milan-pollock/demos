import { GridLayout, Layout } from '@dark-rush-photography/best-of/types';

const loadReviewsGridLayouts = () => {
  return {
    smallLayout: {
      width: 480,
      cols: 1,
      layout: [
        { i: '1', x: 0, y: 0, w: 1, h: 15 },
        { i: '2', x: 0, y: 0, w: 1, h: 14 },
        { i: '3', x: 0, y: 0, w: 1, h: 16 },
        { i: '4', x: 0, y: 0, w: 1, h: 11 },
        { i: '5', x: 0, y: 0, w: 1, h: 9 },
        { i: '6', x: 0, y: 0, w: 1, h: 17 },
        { i: '7', x: 0, y: 0, w: 1, h: 14 },
        { i: '8', x: 0, y: 0, w: 1, h: 18 },
        { i: '9', x: 0, y: 0, w: 1, h: 9 },
      ],
    },
    mediumLayout: {
      width: 740,
      cols: 2,
      layout: [
        { i: '1', x: 0, y: 0, w: 1, h: 19 },
        { i: '2', x: 1, y: 0, w: 1, h: 18 },
        { i: '3', x: 0, y: 0, w: 1, h: 19 },
        { i: '4', x: 1, y: 0, w: 1, h: 14 },
        { i: '5', x: 0, y: 0, w: 1, h: 9 },
        { i: '6', x: 1, y: 0, w: 1, h: 23 },
        { i: '7', x: 0, y: 0, w: 1, h: 16 },
        { i: '8', x: 1, y: 0, w: 1, h: 21 },
        { i: '9', x: 0, y: 0, w: 1, h: 9 },
      ],
    },
    largeLayout: {
      width: 1200,
      cols: 3,
      layout: [
        { i: '1', x: 0, y: 0, w: 1, h: 20 },
        { i: '2', x: 1, y: 0, w: 1, h: 19 },
        { i: '3', x: 2, y: 0, w: 1, h: 20 },
        { i: '4', x: 0, y: 0, w: 1, h: 13 },
        { i: '5', x: 1, y: 0, w: 1, h: 10 },
        { i: '6', x: 2, y: 0, w: 1, h: 24 },
        { i: '7', x: 0, y: 0, w: 1, h: 17 },
        { i: '8', x: 1, y: 0, w: 1, h: 24 },
        { i: '9', x: 2, y: 0, w: 1, h: 10 },
      ],
    },
  };
};

export const findReviewsGridLayout = (layout: Layout): GridLayout => {
  const { smallLayout, mediumLayout, largeLayout } = loadReviewsGridLayouts();
  let gridLayout = smallLayout;
  if (layout.detailWidth > 740 && layout.detailWidth < 1200) {
    gridLayout = mediumLayout;
  } else if (layout.detailWidth >= 1200) {
    gridLayout = largeLayout;
  }
  return gridLayout;
};
