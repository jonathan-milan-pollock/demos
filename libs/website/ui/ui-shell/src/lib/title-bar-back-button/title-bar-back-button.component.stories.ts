import { Story, Meta } from '@storybook/angular/types-6-0';

import { TitleBarBackButtonComponent } from './title-bar-back-button.component';

export default {
  title: 'UI SHELL/Title Bar Back Button',
  component: TitleBarBackButtonComponent,
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
