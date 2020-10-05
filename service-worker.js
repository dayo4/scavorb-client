/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js")

importScripts(
  "/precache-manifest.e3fb101aeef0ad0d18ddc49ae4bd253e.js"
)

workbox.core.setCacheNameDetails({ prefix: "scavorb" })

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
  {
    self.skipWaiting()
  }
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "icons": [
      {
        "src": "./img/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "./img/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "./img/icons/android-chrome-maskable-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "./img/icons/android-chrome-maskable-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "./img/icons/apple-touch-icon-60x60.png",
        "sizes": "60x60",
        "type": "image/png"
      },
      {
        "src": "./img/icons/apple-touch-icon-76x76.png",
        "sizes": "76x76",
        "type": "image/png"
      },
      {
        "src": "./img/icons/apple-touch-icon-120x120.png",
        "sizes": "120x120",
        "type": "image/png"
      },
      {
        "src": "./img/icons/apple-touch-icon-152x152.png",
        "sizes": "152x152",
        "type": "image/png"
      },
      {
        "src": "./img/icons/apple-touch-icon-180x180.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "./img/icons/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "./img/icons/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "./img/icons/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "./img/icons/msapplication-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "./img/icons/mstile-150x150.png",
        "sizes": "150x150",
        "type": "image/png"
      }
    ]
  }
].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
