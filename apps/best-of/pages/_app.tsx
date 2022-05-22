import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme/theme';
import '../styles/styles.scss';

//import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
// <NxLogo width="75" height="50" />
//TODO: Setup GA
//ReactGA.initialize(Application.GOOGLE_ANALYTICS_TRACKING_ID);

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Best 37</title>
        <link href="/favicon.ico" rel="icon" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
