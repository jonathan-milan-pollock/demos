import { useRouter } from 'next/router';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './bottom-navigation-bar.module.scss';

interface Props {
  isDisplayed: boolean;
}

export default function BottomNavigationBar({ isDisplayed }: Props) {
  const router = useRouter();

  if (!isDisplayed) return <></>;

  let selectedValue = 'home';
  switch (router.pathname) {
    case '/':
    case '/events':
    case '/events/':
    case '/photo-of-the-week':
    case '/photo-of-the-week/':
    case '/destinations':
    case '/destinations/':
      selectedValue = 'home';
      break;
    case '/reviews':
    case '/reviews/':
      selectedValue = 'reviews';
      break;
    case '/about':
    case '/about/':
      selectedValue = 'about';
      break;
  }

  return (
    <BottomNavigation
      showLabels={true}
      value={selectedValue}
      className={styles['bottomNavigation']}
      data-testid="bottom-navigation-bar"
    >
      <BottomNavigationAction
        label="HOME"
        value="home"
        icon={
          <FontAwesomeIcon
            icon={{ prefix: 'fas', iconName: 'home' }}
            size="2x"
          />
        }
        onClick={() => router.push('/')}
      />
      <BottomNavigationAction
        label="REVIEWS"
        value="reviews"
        icon={
          <FontAwesomeIcon
            icon={{ prefix: 'fas', iconName: 'edit' }}
            size="2x"
          />
        }
        onClick={() => router.push('/reviews')}
      />
      <BottomNavigationAction
        label="ABOUT"
        value="about"
        icon={
          <FontAwesomeIcon
            icon={{ prefix: 'fas', iconName: 'info-circle' }}
            size="2x"
          />
        }
        onClick={() => router.push('/about')}
      />
    </BottomNavigation>
  );
}
