const path = require('path');
const webpack = require('webpack');
const globalVars = require('./src/css/var.js');

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/app.js',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    loaderOptions: {
      less: {
        globalVars
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        model: path.resolve(__dirname, 'src/js/model/'),
        js: path.resolve(__dirname, 'src/js/'),
        components: path.resolve(__dirname, 'src/components/'),
        view: path.resolve(__dirname, 'src/view/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
        Manba: 'manba',
        HeyUI: 'heyui',
        Model: 'js-model',
        G: 'hey-global',
        log: 'hey-log',
        R: [path.resolve(__dirname, 'src/js/common/request'), 'default']
      })
    ]
  },
  devServer: {
    proxy: {
    // // 此处应该配置为开发服务器的后台地址
    // // 配置文档： https://cli.vuejs.org/zh/config/#devserver-proxy
    //   '/api': {
    //     target: 'http://localhost:3000/'
    //   },
    //   '/static/upload': {
    //     target: 'http://localhost:3000/'
    //   },
    //   '/static/uploads': {
    //     target: 'http://localhost:3000/'
    //   }
      '/data': {
        target: 'http://localhost:3000/'
      },
      '/uploads': {
        target: 'http://localhost:3000/'
      },
    }
  }
};
