import { Meta } from '@storybook/angular/types-6-0';

import { BottomSocialMediaBarComponent } from './bottom-social-media-bar.component';

export default {
  title: 'UI SHELL/Bottom Social Media Bar',
  component: BottomSocialMediaBarComponent,
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
