// import { $Posts } from "@/myStore"

const routes = [
  {
    path: "/gallery",
    component: () => import("@/subViews/gallery/Index.vue"),
    children: [
      {
        path: '',
        name: "gallery",
        component: () => import(/* webpackChunkName: "glr-lst" */ "@/subViews/gallery/List.vue"),
      },
      {
        path: '/gallery/:title',
        component: () => import(/* webpackChunkName: "glr-lst" */ "@/subViews/gallery/View.vue"),
      },
    ]
  }
]

export default routes
