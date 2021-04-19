import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ImageGridGalleryComponent } from './image-grid-gallery.component';
import { ElementsUiModule } from '../elements-ui.module';

export default {
  title: 'CUSTOM ELEMENTS/Image Grid Gallery',
  component: ImageGridGalleryComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ElementsUiModule],
    }),
  ],
} as Meta;

const Template: Story<ImageGridGalleryComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-image-grid-gallery></drp-image-grid-gallery>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-image-grid-gallery></drp-image-grid-gallery>',
};
