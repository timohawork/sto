const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = withCSS(withSass({
  onDemandEntries: {
    maxInactiveAge: 1000*60*60,
    pagesBufferLength: 5
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });
    return config;
  }
}));