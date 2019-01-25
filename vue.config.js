// vue.config.js
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const NODE_ENV = process.env.NODE_ENV;
const extractCss = NODE_ENV === 'production' || NODE_ENV === 'ssr';

module.exports = {

  publicPath: NODE_ENV === 'production' || NODE_ENV === 'ssr' ?
    '/' : '/',
  css: {
    extract: extractCss,
    modules: true,
    loaderOptions: {
      css: {
        localIdentName: '[local]-[hash:base64:5]',
        camelCase: 'only',
      },
    },
  },
  indexPath: 'no-use.html',

  configureWebpack: config => {
    if (NODE_ENV === 'ssr') {
      return {
        entry: {
          app: './src/entry-server.ts',
        },
        target: 'node',
        devtool: 'source-map',
        output: {
          libraryTarget: 'commonjs2'
        },
        externals: nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          whitelist: /\.css$/
        }),
        plugins: [
          new VueSSRServerPlugin()
        ]
      }
    } else if (NODE_ENV === 'production') {
      return {
        entry: {
          app: './src/entry-client.ts',
        },
        optimization: {
          splitChunks: {
            minChunks: Infinity,
            name: true
          }
        },
        plugins: [
          // new SWPrecacheWebpackPlugin({
          //   cacheId: 'news',
          //   dontCacheBustUrlsMatching: /\.\w{8}\./,
          //   filename: 'service-worker.js',
          //   minify: true,
          //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
          // }),
          new VueSSRClientPlugin()
        ],
      }
    } else {
      return {
        entry: {
          app: './src/entry-client.ts',
        },
        optimization: {
          splitChunks: {
            minChunks: Infinity,
            name: "manifest"
          }
        },
        plugins: [
          // new SWPrecacheWebpackPlugin({
          //   cacheId: 'news',
          //   dontCacheBustUrlsMatching: /\.\w{8}\./,
          //   filename: 'service-worker.js',
          //   minify: true,
          //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
          // }),
          new VueSSRClientPlugin()
        ],
      }
    }
  }
};