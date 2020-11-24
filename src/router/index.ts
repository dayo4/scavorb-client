import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import allRoutes from '@/router/routes/index.ts'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = allRoutes

import { $Auth } from '@/myStore'

// export default () => {
// import { $Process } from '@/plugins'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition)
  //   {
  //     return savedPosition
  //   } else
  //   {
  //     return { top: 0 }
  //   }
  // },
})

//GLOBAL ROUTE GAURDS
router.beforeEach((to, from, next) => {
  const isUser = $Auth.isUser
  const isAdmin = $Auth.isAdmin

  const guestOnly = to.matched.some(record => record.meta.guestOnly)
  const userOnly = to.matched.some(record => record.meta.userOnly)
  const adminOnly = to.matched.some(record => record.meta.adminOnly)
  // const special = to.matched.some(record => record.meta.special)

  /* Admin Routes Guard */
  if (adminOnly)
  {
    if (isUser && isAdmin)
    {
      next()
    } else if (isUser && !isAdmin)
    {
      next({
        path: '/401'
      })
    } else
    {
      $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
      // next({
      //   path: "/auth",
      //   query: { redirect: to.fullPath }
      // })
    }
  } else if (userOnly)
  {
    /*  Users Routes Guard */
    if (isUser)
    {
      next()
    } else
    {
      $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
    }
  } else if (guestOnly)
  {
    /* Guests-Only Routes Guard */
    if (isUser)
    {
      next({ path: '/' })
    } else
    {
      next()
    }
  }
  // /* System only can access these routes */
  // else if (special)
  // {
  //   if (isUser)
  //   {
  //     next({ path: "/" })
  //   } else
  //   {
  //     next()
  //   }
  // }
  /*  All things being equal.. */
  else
  {
    next()
  }
})

export default router
//   return router
// }
