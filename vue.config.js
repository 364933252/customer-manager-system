module.exports = {
  // publicPath: "/",
  lintOnSave: false,
  devServer: {
    port: 8090,
    open: true, //配置是否自动浏览器
    https: false, //是否启用https
    proxy: {
      '/api': {
        target: 'http://dataexpansion.cn/api',
        changOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}