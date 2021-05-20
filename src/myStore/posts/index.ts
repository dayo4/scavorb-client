/* Import other modules */
import { Compose } from './modules/Compose'
import { Settings } from './modules/Settings'
import { SinglePost } from './modules/Single'

import { $Vue, $Axios, $Notify } from '@/plugins'

interface Query {
    limit?: number
    offset?: number
    sort?: string

}

class Posts {
    $compose = new Compose()
    $settings = new Settings()
    $single = new SinglePost()

    posts: Array<object> = []
    postsCount: number = 0
    userPosts: Array<object> = []
    userPostsCount: number = 0
    wpp: any = []


    async fetchAll(payload: Query = {}, refresh: boolean = false) {

        try {
            const query: Query = {
                limit: payload.limit || 10,
                offset: payload.offset || refresh ? 0 : this.posts.length,
                sort: payload.sort || 'desc'
            }

            const { data } = await $Axios.get(`posts/allPosts/${JSON.stringify(query)}`)
            this.postsCount = data.count
            if (refresh)
                this.posts = data.posts
            else
                this.posts.push(...data.posts)
            return data
        }
        catch {
            $Notify.error()
        }
    }
    async wpps() {

        try {


            const { data } = await $Axios
                .get("https://wp.scavorb.com/wp-json/wp/v2/posts?page=1&per_page=20")
            console.log(data);

            this.wpp = data

            return data
        }
        catch {
            $Notify.error()
        }
    }

    async fetchUserPosts(user_id: any, payload: Query = {}, refresh: boolean = false) {
        try {
            const query: Query = {
                limit: payload.limit || 10,
                offset: payload.offset || refresh ? 0 : this.userPosts.length,
                sort: payload.sort || 'desc'
            }
            const { data } = await $Axios.get(`posts/users/${user_id}/${JSON.stringify(query)}`)
            this.userPostsCount = data.count
            if (refresh)
                this.userPosts = data.posts
            else
                this.userPosts.push(...data.posts)
            return data
        }
        catch {
            $Notify.error()
        }
    }
}

export const $Posts = $Vue.observable(new Posts())

export * from './misc'
