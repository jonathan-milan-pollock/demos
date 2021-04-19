import { Meta } from '@storybook/angular/types-6-0';

import { NavBarComponent } from './nav-bar.component';

export default {
  title: 'UI SHELL/NavBar',
  component: NavBarComponent,
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
