import { Meta } from '@storybook/angular/types-6-0';

import { FooterComponent } from './footer.component';

export default {
  title: 'UI SHELL/Footer',
  component: FooterComponent,
} as Meta;

interface StorybookComponent {
  moduleMetadata: { imports: [] };
  props: { [key: string]: unknown };
}

export const Primary = (): StorybookComponent => ({
  moduleMetadata: {
    imports: [],
  },
  props: {},
});
