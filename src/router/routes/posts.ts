import { $Posts } from "@/myStore"

const routes = [
    {
        path: "/compose",
        name: "compose-post",
        component: () => import("@/views/posts/Compose.vue"),
        meta: { adminOnly: true },
    },
    {
        path: "/posts",
        name: "posts",
        component: () => import(/* webpackPrefetch: true, webpackChunkName: "all-pst" */ "@/views/posts/AllPosts.vue"),
        // beforeEnter: (to, from, next) => {
        //     $Posts.fetchAll({}, true)
        //     next()
        // }
    },
    {
        path: "/posts/:post_id",
        component: () => import(/* webpackPrefetch: true */'@/views/posts/Index.vue'),
        children: [
            {
                path: '',
                name: 'post',
                component: () => import(/* webpackChunkName: "sngl-pst" */ '@/views/posts/Single.vue'),
                beforeEnter: (to, from, next) => {
                    $Posts.$single.fetch({
                        post_id: to.params.post_id.split('_')[ 0 ]
                    }).then((loaded) => {
                        if (loaded)
                        {
                            next()
                        }
                    })
                }
            },
        ]
    },
]

export default routes