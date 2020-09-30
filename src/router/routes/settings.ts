

const routes = [
    {
        path: '/manage-settings',
        name: 'manage-settings',
        component: () => import(/* webpackChunkName: "mgt-stns" */ '@/views/settings/Settings.vue'),
        meta: { userOnly: true }
    }
]

export default routes