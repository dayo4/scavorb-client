
const routes = [
    {
        path: '/message/:username',
        component: () => import(/* webpackChunkName: "chat-index" */ '@/views/message/Index.vue'),
        // alias: '/:username',
        children: [
            {
                path: '',
                name: 'message',
                component: () => import(/* webpackChunkName: "chat-view" */ '@/views/message/Message.vue')
            },
        ]
    },
]

export default routes.map(route => {
    return { ...route, meta: { userOnly: true } }
})