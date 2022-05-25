import { useState } from 'react';

export const useImageIndex = () => {
  const [imageIndex, setImageIndex] = useState(0);

  function displayImage(currentImageIndex: number): void {
    setImageIndex(currentImageIndex);
  }

  return { imageIndex, displayImage };
};
