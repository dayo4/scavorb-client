import { $Auth } from '@/myStore'
import { $Axios, $Process, $Notify } from '@/plugins'

interface Query {
    limit?: number
    offset?: number
    sort?: string
    filter?: object
}

export class Settings {
    posts: Array<object> = []
    postsCount: number = 0

    async fetchAll (payload: Query = {}, refresh: boolean = false) {
        try
        {
            const query: Query = {
                limit: payload.limit || 20,
                offset: payload.offset || refresh ? 0 : this.posts.length,
                sort: payload.sort || 'desc',
                filter: payload.filter,
            }
            const { data } = await $Axios.post(`posts/users/${$Auth.user.id}`, { query: JSON.stringify(query) })
            this.postsCount = data.count
            if (refresh)
                this.posts = data.posts
            else
                this.posts.push(...data.posts)
            return data
        }
        catch{
            $Notify.error()
        }
    }

    async delete (payload: { postsIds: number | string[] }) {
        $Process.add('Deleting')
        try
        {
            const { data } = await
                $Axios.delete('posts/' + $Auth.user.id, {
                    data: payload
                })
            if (data)
            {
                $Notify.success(data)/* leave as is! */
                $Process.done()
            }
            return data
        }
        catch (error)
        {
            $Notify.error(error)
            $Process.abort()
        }
    }

    async publish (payload: { postsIds: number | string[], published: { value: boolean } }) {
        $Process.add(payload.published.value ? 'Publishing' : 'Unpublishing')
        try
        {
            const { data } = await $Axios.patch('posts/' + $Auth.user.id, {
                ...payload
            })
            if (data)
            {
                $Notify.success(payload.published.value ? 'published' : 'unpublished')
                $Process.done()
                return data
            }
        }
        catch{
            $Notify.error()
            $Process.abort()
        }

    }

    async archive (payload: { postsIds: number | string[], archived: { value: boolean } }) {
        $Process.add('Setting up archive')
        try
        {
            const { data } = await $Axios.patch('posts/' + $Auth.user.id, {
                ...payload
            })
            if (data)
            {
                $Notify.success(payload.archived.value ? 'archived' : 'unarchived')
                $Process.done()
                return data
            }
        }
        catch{
            $Notify.error()
            $Process.abort()
        }

    }

}
