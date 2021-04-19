import { Meta } from '@storybook/angular/types-6-0';

import { BottomNavBarButtonComponent } from './bottom-nav-bar-button.component';

export default {
  title: 'UI SHELL/Bottom Nav Bar Button',
  component: BottomNavBarButtonComponent,
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
