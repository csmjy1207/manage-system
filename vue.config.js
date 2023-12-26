const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV == 'development' ? './' : '/test-daily/',
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api': ''},
        ws: true, //用于支持websocket
        changeOrigin: true
      }
    }
  }
})
