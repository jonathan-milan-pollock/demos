import { text, number } from '@storybook/addon-knobs';
import { ButtonComponent } from './button.component';

export default {
  title: 'Button',
};

interface StorybookComponent {
  moduleMetadata: { imports: [] };
  component: typeof ButtonComponent;
  props: { [key: string]: unknown };
}

export const primary = (): StorybookComponent => ({
  moduleMetadata: {
    imports: [],
  },
  component: ButtonComponent,
  props: {
    text: text('text', 'Click me!'),
    padding: number('padding', 0),
    style: text('style', 'default'),
  },
});
