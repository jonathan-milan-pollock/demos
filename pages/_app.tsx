import React, { Fragment, useState, useEffect } from 'react';
//import ReactGA from 'react-ga';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import useDarkMode from 'use-dark-mode';

import Application from '../constants/app-constants';
import ApplicationUi from '../constants/app-ui-constants';
import { createCustomMuiTheme } from '../theme/custom-mui-theme';
import { darkVariables } from '../theme/variables-dark';
import { lightVariables } from '../theme/variables-light';
import { addFontAwesomeIcons } from '../theme/font-awesome-icons';

import {
  applyPolyfills,
  defineCustomElements,
} from '@dark-rush-photography/image-web-components/loader';

/*
TODO: How to implement these???
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-grid-layout/css/styles.css';
*/

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const darkMode = useDarkMode(true);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    setIsMounted(true);

    applyPolyfills().then(() => {
      defineCustomElements(window);
    });
  }, []);

  //TODO: Setup GA
  //ReactGA.initialize(Application.GOOGLE_ANALYTICS_TRACKING_ID);

  addFontAwesomeIcons();

  const customMuiTheme = createCustomMuiTheme(
    darkMode.value ? darkVariables : lightVariables
  );

  return (
    <Fragment>
      <Head>
        <title>{Application.NAME}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86"
        />
        <meta name="theme-color" content={ApplicationUi.BACKGROUND_COLOR} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={customMuiTheme}>
        <CssBaseline />
        {isMounted ? <Component {...pageProps} /> : null}
      </ThemeProvider>
    </Fragment>
  );
}
