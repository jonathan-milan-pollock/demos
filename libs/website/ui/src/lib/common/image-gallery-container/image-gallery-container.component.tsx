import PropTypes from 'prop-types';

import styles from './image-gallery-container.module.scss';
import { ApplicationLayout, Image } from '@dark-rush-photography/website/types';
import { useImageIndex } from '@dark-rush-photography/best-of/util';
import ImageGallery from '../image-gallery/image-gallery.component';

interface Props {
  images: Image[];
  displayOptionsBar: boolean;
  width: number;
  height: number;
  marginLeft: number;
}

ImageGalleryContainer.propTypes = {
  images: PropTypes.array.isRequired,
  displayOptionsBar: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
};

export default function ImageGalleryContainer({
  images,
  width,
  height,
  marginLeft,
}: Props): JSX.Element {
  const { imageIndex, displayImage } = useImageIndex();

  return (
    <div className={styles['container']}>
      <ImageGallery
        images={images}
        imageIndex={imageIndex}
        width={width - ApplicationLayout.IMAGES_GALLERY_BUTTON_WIDTH * 2}
        height={height}
        autoPlay={true}
        displayImage={displayImage}
      />
    </div>
  );
}
