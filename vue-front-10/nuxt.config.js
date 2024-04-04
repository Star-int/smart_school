import Vue from 'vue'
// import ElementUI from 'element-ui' //element-ui的全部组件
// import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
// Vue.use(VueAwesomeSwiper)
// Vue.use(ElementUI) //使用elementUI
import vueQriously from 'vue-qriously' //二维码组件

Vue.use(vueQriously)





module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '智慧校园',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
    '~plugins/element-ui.js',
    // '~plugins/vue-qriously.js'

  ],

  css: [
    'swiper/dist/css/swiper.css',
    'element-ui/lib/theme-chalk/index.css'


  ],

  serverMiddleware: [
    { path: '/api/captcha', handler: '~/api/captcha.js' }
  ],


  router: {
    // 添加自定义路由配置
    extendRoutes(routes, resolve) {
      // 添加新的路由规则
      routes.push(
      {
        name: 'profile',
        path: '/ucenter/profile',
        component: resolve(__dirname, 'pages/ucenter/index.vue')
      },
      {
        name: 'applicationCenter',
        path: '/ucenter/applicationCenter',
        component: resolve(__dirname, 'pages/ucenter/index.vue')
      },
      {
        name: 'selling',
        path: '/ucenter/selling',
        component: resolve(__dirname, 'pages/ucenter/index.vue')
      },
      {
        name: 'resume',
        path: '/ucenter/resume',
        component: resolve(__dirname, 'pages/ucenter/index.vue')
      },
      {
        name: 'collectlist',
        path: '/ucenter/collectlist',
        component: resolve(__dirname, 'pages/ucenter/index.vue')
      },

      )
    }
  },
  

  

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

