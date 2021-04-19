import { Meta } from '@storybook/angular/types-6-0';

import { TitleBarKabobMenuItemComponent } from './title-bar-kabob-menu-item.component';

export default {
  title: 'UI SHELL/Title Bar Kabob Menu Item',
  component: TitleBarKabobMenuItemComponent,
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
