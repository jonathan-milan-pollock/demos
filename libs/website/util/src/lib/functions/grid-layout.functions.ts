import { GridLayout } from '@dark-rush-photography/website/types';

export const loadGridLayout = (items: number, width: number): GridLayout => {
  const numberOfColumns = Math.floor(width / 280);

  if (numberOfColumns === 0)
    return {
      width: 0,
      cols: 0,
      layout: [],
    };

  const numberOfRows = Math.floor(items / numberOfColumns);

  const gridLayout = [];
  let itemNumber = 1;
  for (let row = 0; row < numberOfRows + 1; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      gridLayout.push({
        i: (itemNumber++).toString(),
        x: col,
        y: 0,
        w: 1,
        h: 1,
      });
    }
  }
  return {
    width: width,
    cols: numberOfColumns,
    layout: gridLayout,
  };
};
