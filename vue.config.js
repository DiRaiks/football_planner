const webpack = require('webpack')

module.exports = {
  publicPath: process.env.SITE_URL !== undefined ? process.env.SITE_URL : '/',
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env': {
          'FETCHURL': JSON.stringify(process.env.FETCHURL),
        },
      }),
    ]
  },
};
