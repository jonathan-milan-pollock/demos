const rootMain = require('../../../../../.storybook/main');

rootMain.stories.push(
  ...['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)']
);

module.exports = rootMain;
