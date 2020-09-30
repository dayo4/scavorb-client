import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/*webpackPrefetch: true, webpackChunkName: "hm" */ "@/views/pages/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/*webpackPrefetch: true, webpackChunkName: "abt" */ "@/views/pages/About.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import(/* webpackPrefetch: true, webpackChunkName: "cntct" */ "@/views/pages/Contact.vue")
  },
  // {
  //   path: "/services",
  //   name: "services",
  //   component: () => import(/* webpackChunkName: "srvc" */ "@/views/pages/Services.vue")
  // },
  {
    path: "/401",
    name: "401",
    component: () => import(/* webpackPrefetch: true */"@/views/pages/ERRORS/401.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackPrefetch: true */"@/views/pages/ERRORS/404.vue")
  },
]

export default routes
