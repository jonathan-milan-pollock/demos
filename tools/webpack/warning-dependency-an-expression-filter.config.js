const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = (config) => {
  config.plugins.push(
    new FilterWarningsPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    })
  );
  return config;
};
