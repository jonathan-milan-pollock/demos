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

export default function ProgressiveImageWithOptions(props: Props): JSX.Element {
  return (
    <div className={styles['outerContainer']}>
      <OptionsBar
        image={props.image}
        isCloseButtonDisplayed={props.isCloseButtonDisplayed}
        closeModalDialog={props.closeModalDialog}
      />
      <div className={styles['container']} onClick={props.closeModalDialog}>
        <ProgressiveImage
          image={props.image}
          width={props.width}
          height={props.height - ApplicationLayout.OPTIONS_BAR_HEIGHT}
        />
      </div>
    </div>
  );
}
