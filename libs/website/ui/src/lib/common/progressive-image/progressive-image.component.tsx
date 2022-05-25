import { useState, Fragment } from 'react';

import { Image } from '@dark-rush-photography/website/types';
import styles from './progressive-image.module.scss';

interface Props {
  image: Image;
  width: number | string;
  height: number;
}

export default function ProgressiveImage(props: Props): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderFillImage = () => {
    return (
      <div
        className={styles['thumbnail']}
        style={
          imageLoaded
            ? {
                opacity: 0,
                backgroundImage: `url(${props.image.thumbnail})`,
              }
            : {
                backgroundImage: `url(${props.image.thumbnail})`,
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
          backgroundImage: `url(${props.image.original})`,
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
        src={props.image.original}
        alt=""
      />
      {renderFillImage()}
      {renderImage()}
    </Fragment>
  );
}
