import React from 'react';

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

export default function ImageGalleryButton(props: Props): JSX.Element {
  const renderButton = () => {
    if (!props.isDisplayed) return;
    return (
      <Button
        className={styles['button']}
        disabled={props.isDisabled}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={props.icon} size="2x" />
      </Button>
    );
  };
  return <span className={styles['buttonContainer']}>{renderButton()}</span>;
}
