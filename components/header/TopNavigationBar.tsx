//import { useRouter } from 'next/router';

import {
  makeStyles,
  Theme,
  AppBar,
  Toolbar,
  //useTheme,
  useMediaQuery,
} from '@material-ui/core';

import Application from '../../constants/app-constants';
//import BackButton from './BackButton';
import KabobMenu from './KabobMenu';
import ThemeToggleButton from './ThemeToggleButton';
import TopNavigationBarButton from './TopNavigationBarButton';

const useStyles = makeStyles((theme: Theme) => {
  return {
    outerContainer: {
      backgroundColor: theme.palette.custom.topHeaderBackgroundColor,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    buttonContainer: {
      display: 'none',
    },
    image: {
      flex: 1,
      height: 72,
      marginTop: 5,
      objectFit: 'contain',
    },
  };
});

const TopNavigationBar = () => {
  const classes = useStyles();
  //const router = useRouter();
  //const theme = useTheme();
  const textChangeWidth = useMediaQuery('(min-width:600px)');

    /*
  const displayBackButton = [
    '/stories',
    '/stories/',
    '/photo-of-the-week',
    '/photo-of-the-week/',
    '/reviews',
    '/reviews/',
  ].includes(router.pathname);

  //TODO: This image needs to be an svg

   {displayBackButton ? (
              <BackButton goBackToPage={router.pathname} />
            ) : null}
   */
  return (
    <AppBar className={classes.outerContainer} position="static">
      <Toolbar className={classes.container}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div className={classes.buttonContainer}>
            <TopNavigationBarButton
              icon={{ prefix: 'fas', iconName: 'home' }}
              text="HOME"
              slug="/"
              slugs={[
                '/',
                '/stories',
                '/stories/',
                '/photo-of-the-week',
                '/photo-of-the-week/',
                '/extended-reality',
                '/extended-reality/',
              ]}
            />
            <TopNavigationBarButton
              icon={{ prefix: 'fas', iconName: 'edit' }}
              text="REVIEWS"
              slug="/reviews"
              slugs={['/reviews', '/reviews/']}
            />
            <TopNavigationBarButton
              icon={{ prefix: 'fas', iconName: 'info-circle' }}
              text="ABOUT"
              slug="/about"
              slugs={['/about', '/about/']}
            />
          </div>
          <div
            style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
          >
            <img
              className={classes.image}
              alt={`${Application.NAME} Logo`}
              src="https://dark-rush-photography-images.azureedge.net/dark-rush-photography-content/logos/dark-rush-photography-logo.png?v=26"
            />
          </div>
          <div>{textChangeWidth ? <ThemeToggleButton /> : <KabobMenu />}</div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigationBar;
