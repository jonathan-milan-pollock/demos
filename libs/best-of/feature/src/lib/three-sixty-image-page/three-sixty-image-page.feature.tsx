import styles from './three-sixty-image-page.module.scss';
import { ImagePageLayout } from '@dark-rush-photography/best-of/ui';

interface ThreeSixtyImagePageProps {
  threeSixtyImageStorageId: string;
}

export default function ThreeSixtyImagePage({
  threeSixtyImageStorageId,
}: ThreeSixtyImagePageProps): JSX.Element {
  return (
    //N0y63
    //N0rbt
    //width="80%"
    //height="640"
    <ImagePageLayout>
      <iframe
        className={styles['threeSixtyImage']}
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
