import { $Posts } from "@/myStore"
import { $Notify } from '@/plugins'

const routes = [
    {
        path: "/compose",
        name: "compose-post",
        component: () => import(/* webpackChunkName: "cmps" */ "@/views/posts/Compose.vue"),
        meta: { adminOnly: true },
    },
    {
        path: "/posts",
        name: "posts",
        component: () => import(/* webpackPrefetch: true, webpackChunkName: "psts" */ "@/views/posts/AllPosts.vue"),
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
                component: () => import(/* webpackChunkName: "pst" */ '@/views/posts/Single.vue'),
                beforeEnter: (to, from, next) => {
                    // const post: any = $Posts.$single.post as object
                    // const fetched = post && post.slug === to.params.slug
                    // if (fetched)
                    // {
                    //     next()
                    // }
                    // else
                    // {
                    $Posts.$single.fetch({
                        slug: to.params.slug
                    }, to.params.preview ? true : false).then((loaded) => {
                        // if (fetched)
                        // {
                        next()

                        if (!loaded)
                        {
                            $Notify.error('unable to connect')
                        }
                        // }
                    })
                    //     }
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
                component: () => import(/* webpackChunkName: "pst" */ '@/views/posts/Single.vue'),
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