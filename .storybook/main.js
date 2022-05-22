module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  features: {
    buildStoriesJson: true,
  },
};
