import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { BottomSocialMediaBarButtonComponent } from './bottom-social-media-bar-button.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Bottom Social Media Bar Button',
  component: BottomSocialMediaBarButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [WebsiteUiUiShellModule, BrowserModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<BottomSocialMediaBarButtonComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template:
    '<drp-bottom-social-media-bar-button></drp-bottom-social-media-bar-button>',
};

export const Facebook = Template.bind({});
Facebook.args = {
  socialMediaType: 'Facebook',
};
Facebook.parameters = {
  template:
    '<drp-bottom-social-media-bar-button></drp-bottom-social-media-bar-button>',
};

export const Instagram = Template.bind({});
Instagram.args = {
  socialMediaType: 'Instagram',
};
Instagram.parameters = {
  template: `<drp-bottom-social-media-bar-button></drp-bottom-social-media-bar-button>`,
};

export const LinkedIn = Template.bind({});
LinkedIn.args = {
  socialMediaType: 'LinkedIn',
};
LinkedIn.parameters = {
  template: `<drp-bottom-social-media-bar-button></drp-bottom-social-media-bar-button>`,
};

export const YouTube = Template.bind({});
YouTube.args = {
  socialMediaType: 'YouTube',
};
YouTube.parameters = {
  template: `<drp-bottom-social-media-bar-button></drp-bottom-social-media-bar-button>`,
};
