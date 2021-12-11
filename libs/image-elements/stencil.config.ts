import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'image-elements',
  taskQueue: 'async',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: '../../dist/libs/image-elements/dist',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'pages' }],
    },
  ],
};
