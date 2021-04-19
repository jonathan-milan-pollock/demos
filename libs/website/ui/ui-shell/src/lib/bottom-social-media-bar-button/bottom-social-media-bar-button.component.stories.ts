import { Meta } from '@storybook/angular/types-6-0';

import { BottomSocialMediaBarButtonComponent } from './bottom-social-media-bar-button.component';

export default {
  title: 'UI SHELL/Bottom Social Media Bar Button',
  component: BottomSocialMediaBarButtonComponent,
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
