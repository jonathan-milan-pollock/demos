import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

export const parameters = {
  backgrounds: {
    default: 'light',
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
};
