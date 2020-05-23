module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex',
        'vue-lazyload': 'VueLazyload'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        views: '@/views',
        network: '@/network',
        common: '@/common'
      }
    }
  },
  publicPath: './',
  devServer: {
    open: true,
    port: 8080
  }
}
