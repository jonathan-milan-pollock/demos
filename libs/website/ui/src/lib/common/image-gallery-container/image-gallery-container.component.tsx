import styles from './image-gallery-container.module.scss';
import { ApplicationLayout, Image } from '@dark-rush-photography/website/types';
import { useImageIndex } from '@dark-rush-photography/website/util';
import ImageGallery from '../image-gallery/image-gallery.component';

interface Props {
  images: Image[];
  displayOptionsBar: boolean;
  width: number;
  height: number;
  marginLeft: number;
}

export default function ImageGalleryContainer(props: Props): JSX.Element {
  const { imageIndex, displayImage } = useImageIndex();

  return (
    <div className={styles['container']}>
      <ImageGallery
        images={props.images}
        imageIndex={imageIndex}
        width={props.width - ApplicationLayout.IMAGES_GALLERY_BUTTON_WIDTH * 2}
        height={props.height}
        autoPlay={true}
        displayImage={displayImage}
      />
    </div>
  );
}
