module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-themes',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
