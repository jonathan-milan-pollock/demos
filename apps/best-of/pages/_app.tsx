import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
// <NxLogo width="75" height="50" />
//TODO: Setup GA
//ReactGA.initialize(Application.GOOGLE_ANALYTICS_TRACKING_ID);

import { TopNavigationBar, TabBar } from '@dark-rush-photography/best-of/ui';
import theme from '../theme/theme';
import './styles.scss';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>37 (DR) Images</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <TopNavigationBar
          isDarkTheme={true}
          activeLink="/"
          onToggleTheme={() => {
            console.log('toggle theme');
          }}
          onLinkClicked={(link) => {
            router.push(link);
          }}
        />
        <TabBar
          activeLink={router.pathname === '/' ? '/events' : router.pathname}
          onTabChange={(link) => {
            router.push(link);
          }}
        />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

export default CustomApp;
