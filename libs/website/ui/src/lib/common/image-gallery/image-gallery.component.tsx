import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ReactImageGallery from 'react-image-gallery';

import styles from './image-gallery.module.scss';
import { GalleryButtonType, Image } from '@dark-rush-photography/website/types';
import ImageGalleryButton from '../image-gallery-button/image-gallery-button.component';
import ProgressiveImage from '../progressive-image/progressive-image.component';

interface Props {
  images: Image[];
  imageIndex: number;
  width: number;
  height: number;
  autoPlay: boolean;
  displayImage(currentImageIndex: number): void;
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  imageIndex: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  displayImage: PropTypes.func.isRequired,
};

export default function ImageGallery({
  images,
  imageIndex,
  width,
  height,
  autoPlay,
  displayImage,
}: Props): JSX.Element {
  const imageGalleryRef = useRef<any>(null);
  useEffect(() => {
    imageGalleryRef.current.handleResize = () => {
      console.log('TODO: Determine if fixes bug');
    };
  }, [imageGalleryRef]);

  /*
  componentWillReceiveProps() {
    //Fixes a Bug with React Image Gallery when removed from screen
    if (this._imageGallery) this._imageGallery._handleResize = () => {};
  }
  */

  const renderLeftButton = (
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    disabled: boolean
  ) => {
    return (
      <ImageGalleryButton
        galleryButtonType={GalleryButtonType.Left}
        icon={{ prefix: 'fas', iconName: 'chevron-left' }}
        width={width}
        height={height}
        isDisplayed={images.length > 1}
        isDisabled={disabled}
        onClick={onClick}
      />
    );
  };

  const renderRightButton = (
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    disabled: boolean
  ) => {
    return (
      <ImageGalleryButton
        galleryButtonType={GalleryButtonType.Right}
        icon={{ prefix: 'fas', iconName: 'chevron-right' }}
        width={width}
        height={height}
        isDisplayed={images.length > 1}
        isDisabled={disabled}
        onClick={onClick}
      />
    );
  };

  return (
    <div className={styles['imageGallery']}>
      <ReactImageGallery
        ref={imageGalleryRef}
        items={images}
        renderItem={(image) => {
          if (!image.original || !image.thumbnail) return;
          return (
            <ProgressiveImage
              image={image as Image}
              width={width}
              height={height}
            />
          );
        }}
        renderLeftNav={(onClick, disabled) => {
          return renderLeftButton(onClick, disabled);
        }}
        renderRightNav={(onClick, disabled) => {
          return renderRightButton(onClick, disabled);
        }}
        lazyLoad={true}
        infinite={false}
        showFullscreenButton={false}
        showThumbnails={false}
        showNav={true}
        showPlayButton={false}
        autoPlay={autoPlay}
        startIndex={imageIndex}
        slideInterval={8000}
        slideDuration={autoPlay ? 3000 : 2000}
        onSlide={(currentIndex) => {
          displayImage(currentIndex);
        }}
      />
    </div>
  );
}
