module.exports = {
  core: {
    builder: 'webpack5',
  },
  angularOptions: {
    enableIvy: true,
  },
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-themes',
  ],
};
