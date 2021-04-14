const rootMain = require('../../../../.storybook/main');

rootMain.stories.push(
  ...['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)']
);
rootMain.addons.push(
  ...[
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ]
);

module.exports = rootMain;
