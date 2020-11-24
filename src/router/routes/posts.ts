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
        path: "/posts/:slug",
        component: () => import(/* webpackPrefetch: true */'@/views/posts/Index.vue'),
        children: [
            {
                path: '',
                name: 'post',
                component: () => import(/* webpackChunkName: "sngl-pst" */ '@/views/posts/Single.vue'),
                beforeEnter: (to, from, next) => {
                    console.log(typeof to.params.slug)
                    console.log(to.params.slug)
                    if (typeof to.params.slug !== 'undefined')
                        $Posts.$single.fetch({
                            slug: to.params.slug
                        }, to.params.preview ? true : false).then((loaded) => {
                            if (loaded)
                            {
                                next()
                            }
                        })
                }
            },
        ]
    },
    {
        path: "/posts-preview/:slug",
        component: () => import(/* webpackPrefetch: true */'@/views/posts/Index.vue'),
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "sngl-pst" */ '@/views/posts/Single.vue'),
                beforeEnter: (to, from, next) => {
                    $Posts.$single.fetch({
                        slug: to.params.slug
                    }, true).then((loaded) => {
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