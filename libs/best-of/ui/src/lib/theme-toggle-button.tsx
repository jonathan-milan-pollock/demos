import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import styles from './theme-toggle-button.module.scss';

export interface ThemeToggleButtonProps {
  readonly isDarkTheme: boolean;
  onToggleTheme(): void;
}

function ThemeToggleButton(props: ThemeToggleButtonProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={() => props.onToggleTheme()}>
        <FontAwesomeIcon icon={faCoffee} />
        <span className={styles.buttonText}>DARK MODE</span>
      </Button>
    </div>
  );
}

export default ThemeToggleButton;
