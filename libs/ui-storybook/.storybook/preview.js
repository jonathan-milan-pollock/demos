import 'cypress-storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation/documentation.json';

setCompodocJson(docJson);

export const parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#1e1e1e',
      },
      {
        name: 'light',
        value: '#ffffff',
      },
    ],
  },
  themes: {
    default: 'dark',
    list: [
      { name: 'dark', class: 'dark-theme', color: '#1e1e1e' },
      { name: 'light', class: 'light-theme', color: '#ffffff' },
    ],
  },
};
