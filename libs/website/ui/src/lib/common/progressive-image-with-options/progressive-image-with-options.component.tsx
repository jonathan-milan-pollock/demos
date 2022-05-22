import PropTypes from 'prop-types';

import OptionsBar from '../options-bar/options-bar.component';
import ProgressiveImage from '../progressive-image/progressive-image.component';
import { ApplicationLayout, Image } from '@dark-rush-photography/website/types';
import styles from './progressive-image-with-options.module.scss';

interface Props {
  image: Image;
  width: number;
  height: number;
  marginLeft: number;
  isCloseButtonDisplayed: boolean;
  closeModalDialog?(): void;
}

ProgressiveImageWithOptions.propTypes = {
  image: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  isCloseButtonDisplayed: PropTypes.bool.isRequired,
  closeModalDialog: PropTypes.func,
};

export default function ProgressiveImageWithOptions({
  image,
  width,
  height,
  marginLeft,
  isCloseButtonDisplayed,
  closeModalDialog,
}: Props): JSX.Element {
  return (
    <div className={styles['outerContainer']}>
      <OptionsBar
        image={image}
        isCloseButtonDisplayed={isCloseButtonDisplayed}
        closeModalDialog={closeModalDialog}
      />
      <div className={styles['container']} onClick={closeModalDialog}>
        <ProgressiveImage
          image={image}
          width={width}
          height={height - ApplicationLayout.OPTIONS_BAR_HEIGHT}
        />
      </div>
    </div>
  );
}
