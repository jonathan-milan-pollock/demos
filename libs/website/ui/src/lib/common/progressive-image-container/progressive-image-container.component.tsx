import { Image } from '@dark-rush-photography/website/types';
import ProgressiveImage from '../progressive-image/progressive-image.component';
import styles from './progressive-image-container.module.scss';

interface Props {
  image: Image;
  width: number;
  height: number;
  marginLeft: number;
}

export default function ProgressiveImageContainer(props: Props): JSX.Element {
  return (
    <div className={styles['container']}>
      <ProgressiveImage
        image={props.image}
        width={props.width}
        height={props.height}
      />
    </div>
  );
}
