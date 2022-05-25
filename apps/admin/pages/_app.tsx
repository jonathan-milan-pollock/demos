import type { AppProps } from 'next/app';

import { UserProvider } from '@auth0/nextjs-auth0';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme/theme';
import '../styles/styles.scss';

//import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
// <NxLogo width="75" height="50" />
//ReactGA.initialize(Application.GOOGLE_ANALYTICS_TRACKING_ID);

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div className="dark">
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default MyApp;
