import Vue from 'vue'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

import routes from "@/router/routes/index.ts"
import { $Auth } from '@/myStore'
// import { $Process } from '@/plugins'

/* ssr purpose */
const isServer = typeof window === 'undefined'
let history = isServer ? createMemoryHistory() : createWebHistory()


const router = createRouter({
  history /* : createWebHistory(process.env.BASE_URL) */,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition)
    {
      return savedPosition
    } else
    {
      return { top: 0 }
    }
  },
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
        path: "/401",
      })
    } else
    {
      $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
      // next({
      //   path: "/auth",
      //   query: { redirect: to.fullPath }
      // })
    }
  }
  /*  Users Routes Guard */
  else if (userOnly)
  {
    if (isUser)
    {
      next()
    } else
    {
      $Auth.$form.show({ showQuery: true, redirect: to.fullPath })
    }
  }
  /* Guests-Only Routes Guard */
  else if (guestOnly)
  {
    if (isUser)
    {
      next({ path: "/" })
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

// router.beforeResolve((to, from, next) => {
// $Process.add('resolving route')
// next()
// })

// router.afterEach((to, from) => {
//   $Process.hide()
// })

export default router