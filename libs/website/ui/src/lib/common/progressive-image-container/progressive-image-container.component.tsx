import PropTypes from 'prop-types';

import { Image } from '@dark-rush-photography/website/types';
import ProgressiveImage from '../progressive-image/progressive-image.component';
import styles from './progressive-image-container.module.scss';

interface Props {
  image: Image;
  width: number;
  height: number;
  marginLeft: number;
}

ProgressiveImageContainer.propTypes = {
  image: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
};

export default function ProgressiveImageContainer({
  image,
  width,
  height,
  marginLeft,
}: Props): JSX.Element {
  return (
    <div className={styles['container']}>
      <ProgressiveImage image={image} width={width} height={height} />
    </div>
  );
}
