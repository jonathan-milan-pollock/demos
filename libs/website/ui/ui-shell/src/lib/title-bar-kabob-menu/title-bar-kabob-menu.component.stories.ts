import { Meta } from '@storybook/angular/types-6-0';

import { TitleBarKabobMenuComponent } from './title-bar-kabob-menu.component';

export default {
  title: 'UI SHELL/Title Bar Kabob Menu',
  component: TitleBarKabobMenuComponent,
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
