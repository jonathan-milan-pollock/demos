import { Meta } from '@storybook/angular/types-6-0';

import { BottomContactBarComponent } from './bottom-contact-bar.component';

export default {
  title: 'UI SHELL/Bottom Contact Bar',
  component: BottomContactBarComponent,
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
