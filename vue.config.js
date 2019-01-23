// vue.config.js
var path = require('path');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');


module.exports = {
  css: {
    modules: true,
    loaderOptions: {
      css: {
        localIdentName: '[local]-[hash:base64:5]',
        camelCase: 'only',
      },
    },
  },
  configureWebpack: {
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'news',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
    ],
  },
};