import Button from '@mui/material/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './top-navigation-bar-button.module.scss';

export interface TopNavigationBarButtonProps {
  readonly icon: IconProp;
  readonly text: string;
  readonly isSelected: boolean;
  onClick(): void;
}

function TopNavigationBarButton(
  props: TopNavigationBarButtonProps
): JSX.Element {
  return (
    <span className={styles.container}>
      <Button
        className={props.isSelected ? styles.buttonSelected : styles.button}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={props.icon} size="lg"></FontAwesomeIcon>
        <span className={styles.text}>{props.text}</span>
      </Button>
    </span>
  );
}

export default TopNavigationBarButton;
