const rootMain = require('../../../.storybook/main');

rootMain.refs = {
  Elements: {
    title: 'Elements',
    url: 'http://localhost:7007',
  },
  UiShared: {
    title: 'UiShared',
    url: 'http://localhost:7007',
  },
  UiShell: {
    title: 'UiShell',
    url: 'http://localhost:7007',
  },
};

module.exports = rootMain;
