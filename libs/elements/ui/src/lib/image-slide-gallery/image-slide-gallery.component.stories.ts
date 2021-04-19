import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ImageSlideGalleryComponent } from './image-slide-gallery.component';
import { ElementsUiModule } from '../elements-ui.module';

export default {
  title: 'CUSTOM ELEMENTS/Image Slide Gallery',
  component: ImageSlideGalleryComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ElementsUiModule],
    }),
  ],
} as Meta;

const Template: Story<ImageSlideGalleryComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-image-slide-gallery></drp-image-slide-gallery>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-image-slide-gallery></drp-image-slide-gallery>',
};
