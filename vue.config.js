module.exports = {
  // publicPath: "/",
  lintOnSave: false,
  devServer: {
    // port: 8000,
    open: true, //配置是否自动浏览器
    https: false, //是否启用https
    proxy: {
      '/api/business': {
        target: 'http://pngo.top/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api/business': ''
        }
      },
      '/api': {
        target: 'http://dataexpansion.cn/api',
        changeOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}