module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/commonents',
        'network': '@/network',
        'router': '@/router',
        'views': '@/router'
      }
    }
  }
}