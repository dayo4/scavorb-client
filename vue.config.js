const path = require('path')
var PrerenderSPAPlugin = require('prerender-spa-plugin')
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/globalStyles/devOnly/_variables.scss";
                @import "@/globalStyles/devOnly/_mixins.scss";
                `,
                // sassOptions: {
                //     indentedSyntax: true
                // }
            }
        }
    },
    pwa: {
        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        //     swSrc: 'service-worker.js',
        // exclude: [
        //     /\.map$/,
        //     /manifest\.json$/
        // ],
        // },
        // manifestPath: 'manifest.json',
        assetsVersion: 5,
        themeColor: '#880e4f'
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint')
        config.module.rules.delete('tslint')
        config.plugins.delete('prefetch')
        // config.plugin('prefetch').tap(options => {
        //     options[ 0 ].fileBlacklist = options[ 0 ].fileBlacklist || []
        //     options[ 0 ].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
        //     return options
        // })
    },
    // pluginOptions: {
    //     prerenderSpa: {
    //         registry: undefined,
    //         renderRoutes: [
    //             '/',
    //             '/about', '/contact', '/profile/dayo'
    //         ],
    //         useRenderEvent: true,
    //         headless: true,
    //         // onlyProduction: true,
    //         postProcess: route => {
    //             // Defer scripts and tell Vue it's been server rendered to trigger hydration
    //             route.html = route.html
    //                 .replace(/<script (.*?)>/g, '<script $1 defer>')
    //                 .replace('id="app"', 'id="app" data-server-rendered="true"')
    //             return route
    //         }
    //         // useRenderEvent: true,
    //         // onlyProduction: true,

    //         // headless: false, // <- this could also be inside the customRendererConfig
    //         // customRendererConfig:
    //         // {
    //         //     args: [ "--auto-open-devtools-for-tabs" ]
    //         // }
    //     }
    // }

    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return

        return {
            plugins: [
                new PrerenderSPAPlugin(
                    // Absolute path to compiled SPA
                    path.resolve(__dirname, 'dist'),
                    // List of routes to prerender
                    [ '/', '/about', '/contact' ],
                    new PuppeteerRenderer()
                ),
            ]
        }
    }
}



/* for non-vue-cli users */
// webpack.config.js
// {
//     test: /\.scss$/,
//         use: [
//             'vue-style-loader',
//             'css-loader',
//             {
//                 loader: 'sass-loader',
//                 options: {
//                     data: `
//           @import "@/scss/_variables.scss";
//           @import "@/scss/_mixins.scss";
//         `
//                 }
//             }
//         ]
// }