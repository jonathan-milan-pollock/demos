import React from 'react';

import Document, { Html, Main, NextScript, Head } from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';

import ApplicationUi from '../constants/app-ui-constants';

export default class WebsiteDocument extends Document {
  render() {
    return (
      <Html
        lang="en"
        style={{ backgroundColor: ApplicationUi.BACKGROUND_COLOR }}
      >
        <Head></Head>
        <body style={{ height: '100vh' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Compatible with server-side generation (SSG) as
// `getInitialProps` belongs to `_document` (instead of `_app`)
WebsiteDocument.getInitialProps = async (pageContext) => {
  const serverStyleSheets = new ServerStyleSheets();
  const originalRenderPage = pageContext.renderPage;

  pageContext.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        serverStyleSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(pageContext);
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      serverStyleSheets.getStyleElement(),
    ],
  };
};
