import { $Profile } from "@/myStore"


const routes = [
    {
        path: '/profile/:username',
        component: () => import(/* webpackPrefetch: true */'@/views/profile/Index.vue'),
        // alias: '/:username',
        children: [
            {
                path: '',
                name: 'user-profile',
                component: () => import(/*webpackPrefetch: true, webpackChunkName: "prf" */ '@/views/profile/Profile.vue'),
                beforeEnter: (to, from, next) => {
                    $Profile.fetch({
                        username: to.params.username
                    }).then((loaded) => {
                        if (loaded)
                        {
                            next()
                        } else
                        {
                            next(false)
                        }
                    })
                }
            },
        ]
    },
]

export default routes