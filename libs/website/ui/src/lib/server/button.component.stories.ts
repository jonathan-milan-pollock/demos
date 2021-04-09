import { text, number, boolean } from '@storybook/addon-knobs';
import { ServerComponent } from './server.component';

export default {
  title: 'ServerComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: ServerComponent,
  props: {},
});
