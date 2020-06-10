module.exports = {
    chainWebpack: config => {
      config.module
        .rule('csv')
        .test(/\.csv$/)
        .use('csv-loader')
          .loader('csv-loader')
          .tap(options => ({
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }))
          .end()
    }
}