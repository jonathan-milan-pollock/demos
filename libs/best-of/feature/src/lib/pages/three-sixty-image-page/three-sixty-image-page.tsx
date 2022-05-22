import React from 'react';

import ImagePageLayout from '../../layout/page-layout/page-layout';
import classes from './three-sixty-image-page.module.scss';

interface Props {
  threeSixtyImageStorageId: string;
}

export function ThreeSixtyImagePage({
  threeSixtyImageStorageId,
}: Props): JSX.Element {
  return (
    //N0y63
    //N0rbt
    //width="80%"
    //height="640"
    <ImagePageLayout>
      <iframe
        className={classes.threeSixtyImage}
        title="three-sixty-image"
        width="100%"
        frameBorder="0"
        allowFullScreen
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        scrolling="no"
        src="https://kuula.co/share/N0rbt?logo=-1&info=0&fs=1&vr=1&autorotate=0&zoom=1&sd=1&thumbs=1&inst=0"
      ></iframe>
    </ImagePageLayout>
  );
}

export default ThreeSixtyImagePage;
