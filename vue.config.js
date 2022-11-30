const webpack = require('webpack')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 配置Jquery
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }
    ])
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
  // 配置productionSourceMap:false处理Map文件
})
