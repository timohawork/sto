/*const withSass = require('@zeit/next-sass');

module.exports = withSass({
	webpack: (config, options) => {
		console.log(config);
		return config;
	}
});*/

const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  onDemandEntries: {
    maxInactiveAge: 1000*60*60,
    pagesBufferLength: 5
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
};