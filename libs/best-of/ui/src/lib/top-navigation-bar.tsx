import { AppBar, Toolbar } from '@material-ui/core';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import TopNavigationBarButton from './top-navigation-bar-button';
import ThemeToggleButton from './theme-toggle-button';
import styles from './top-navigation-bar.module.scss';

export interface TopNavigationBarProps {
  readonly isDarkTheme: boolean;
  readonly activeLink: string;
  onToggleTheme(): void;
  onLinkClicked(link: string): void;
}

function TopNavigationBar(props: TopNavigationBarProps): JSX.Element {
  return (
    <div className={styles.outerContainer}>
      <AppBar className={styles.container} position="static">
        <Toolbar>
          <div className={styles.buttonContainer}>
            <TopNavigationBarButton
              icon={faHome}
              text="Home"
              isSelected={props.activeLink === '/'}
              onClick={() => props.onLinkClicked('/')}
            ></TopNavigationBarButton>
            <TopNavigationBarButton
              icon={faInfoCircle}
              text="About"
              isSelected={props.activeLink === '/about'}
              onClick={() => props.onLinkClicked('/about')}
            ></TopNavigationBarButton>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              alt={`37 (DR) Images`}
              src="/dark-rush-photography-logo.png"
            />
          </div>
          <ThemeToggleButton
            isDarkTheme={props.isDarkTheme}
            onToggleTheme={props.onToggleTheme}
          ></ThemeToggleButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopNavigationBar;
