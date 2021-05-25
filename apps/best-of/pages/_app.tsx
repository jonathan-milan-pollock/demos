import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

//import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
// <NxLogo width="75" height="50" />

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Welcome to best-of!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <h1>Welcome to best-of!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
