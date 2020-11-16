import admin from "@/router/routes/admin.ts"
import auth from "@/router/routes/auth.ts"
import users from "@/router/routes/users.ts"
import pages from "@/router/routes/pages.ts"
import posts from "@/router/routes/posts.ts"
// import message from "@/router/routes/message.ts"
import settings from "@/router/routes/settings.ts"
// import notifications from "@/router/routes/notifications.ts"

/* OTHER FEATURES */
import gallery from "@/router/routes/gallery"

export default [
    ...admin,
    ...auth,
    ...users,
    ...pages,
    ...posts,
    ...settings,
    ...gallery,
    { path: '/:pathMatch(.*)*', component: () => import("@/views/pages/ERRORS/404.vue") }
]
