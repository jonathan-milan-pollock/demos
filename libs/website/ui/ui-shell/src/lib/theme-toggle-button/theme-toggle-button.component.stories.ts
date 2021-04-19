import { Meta } from '@storybook/angular/types-6-0';

import { ThemeToggleButtonComponent } from './theme-toggle-button.component';

export default {
  title: 'UI SHELL/Theme Toggle Button',
  component: ThemeToggleButtonComponent,
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
