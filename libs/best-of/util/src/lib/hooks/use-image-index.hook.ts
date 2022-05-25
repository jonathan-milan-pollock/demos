import exp from 'constants';
import { useState } from 'react';

function useImageIndex() {
  const [imageIndex, setImageIndex] = useState(0);

  function displayImage(currentImageIndex: number): void {
    setImageIndex(currentImageIndex);
  }

  return { imageIndex, displayImage };
}

export default useImageIndex;
