import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './image-gallery-button.module.scss';
import { GalleryButtonType } from '@dark-rush-photography/website/types';

interface Props {
  galleryButtonType: GalleryButtonType;
  icon: IconProp;
  width: number | string;
  height: number;
  isDisplayed: boolean;
  isDisabled: boolean;
  onClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

ImageGalleryButton.propTypes = {
  galleryButtonType: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.number.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function ImageGalleryButton({
  galleryButtonType,
  icon,
  width,
  height,
  isDisplayed,
  isDisabled,
  onClick,
}: Props): JSX.Element {
  const renderButton = () => {
    if (!isDisplayed) return;
    return (
      <Button
        className={styles['button']}
        disabled={isDisabled}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} size="2x" />
      </Button>
    );
  };
  return <span className={styles['buttonContainer']}>{renderButton()}</span>;
}
