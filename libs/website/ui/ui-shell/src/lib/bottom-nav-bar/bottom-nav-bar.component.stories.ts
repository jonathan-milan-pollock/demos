import { Meta } from '@storybook/angular/types-6-0';

import { BottomNavBarComponent } from './bottom-nav-bar.component';

export default {
  title: 'UI SHELL/Bottom Nav Bar',
  component: BottomNavBarComponent,
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
