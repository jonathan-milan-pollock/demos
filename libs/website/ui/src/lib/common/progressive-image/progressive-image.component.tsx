import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Image } from '@dark-rush-photography/website/types';
import styles from './progressive-image.module.scss';

interface Props {
  image: Image;
  width: number | string;
  height: number;
}

ProgressiveImage.propTypes = {
  image: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number.isRequired,
};

export default function ProgressiveImage({
  image,
  width,
  height,
}: Props): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderFillImage = () => {
    return (
      <div
        className={styles['thumbnail']}
        style={
          imageLoaded
            ? {
                opacity: 0,
                backgroundImage: `url(${image.thumbnail})`,
              }
            : {
                backgroundImage: `url(${image.thumbnail})`,
              }
        }
        onClick={() => {
          console.log('progressive image clicked');
        }}
      />
    );
  };

  const renderImage = (): JSX.Element => {
    if (!imageLoaded) return <></>;

    return (
      <div
        className={styles['image']}
        style={{
          backgroundImage: `url(${image.original})`,
        }}
        onClick={() => {
          console.log('render image');
        }}
      />
    );
  };

  return (
    <Fragment>
      <img
        style={{ display: 'none' }}
        onLoad={() => {
          setImageLoaded(true);
        }}
        src={image.original}
        alt=""
      />
      {renderFillImage()}
      {renderImage()}
    </Fragment>
  );
}
