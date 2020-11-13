// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/gallery",
    component: () => import("@/subViews/gallery/Index.vue"),
    children: [
      {
        path: '',
        name: "gallery",
        component: () => import(/* webpackChunkName: "glr-ls" */ "@/subViews/gallery/List.vue"),
      },
      {
        path: '/gallery/:title',
        component: () => import(/* webpackChunkName: "glr-v" */ "@/subViews/gallery/View.vue"),
      },
    ]
  },
  {
    path: "/demo/:title",
    component: () => import("@/subViews/gallery/demo/Index.vue"),
    children: [
      {
        path: '',
        name: 'gallery-demo',
        component: () => import(/* webpackChunkName: "glr-d" */ "@/subViews/gallery/demo/Demo.vue"),
      },
    ]
  }
]

export default routes
