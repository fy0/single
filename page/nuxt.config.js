// const pkg = require('./package')
const path = require('path')
const webpack = require('webpack')
const mm = require('micromatch')

module.exports = {
    mode: 'universal',
    srcDir: 'src/',

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [
        'element-ui/lib/theme-chalk/index.css'
    ],

    /** middleware */
    serverMiddleware: [
        {
            handler: function (req, res, next) {
                let spaPaths = [
                    '/new'
                ]
                if (mm.some(req._parsedUrl.pathname, spaPaths)) {
                    res.spa = true
                }
                next()
            }
        }
    ],

    router: {
        middleware: ['router-guards']
    },

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        { src: '@/plugins/element-ui', ssr: false }
    ],

    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/router'
    ],
    /*
      ** Build configuration
      */
    build: {
        /*
        ** You can extend webpack config here
        */
        postcss: {
            plugins: {
                autoprefixer: {}
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                '_': path.resolve(__dirname, './src/lodash.js')
            }),
            new webpack.ProvidePlugin({
                '$': path.resolve(__dirname, './src/tools.js')
            })
        ],

        extend (config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
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
