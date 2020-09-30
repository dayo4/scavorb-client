/* Import other modules */
import { SubComments } from './modules/SubComments'


import { $Auth } from '@/myStore'
import { $Vue, $Axios, $Notify, $Process, WS } from '@/plugins'

interface State {
    comments: Array<object>
    commentCount: number
}
interface Query {
    limit?: number
    offset?: number
    sort?: string[]

}

export class Comments {
    $SubComments = new SubComments()

    comments = []
    commentCount = 0

    async new (payload: { post_id: number, comment: string }) {
        try
        {
            const { data } = await $Axios.post(`comments/new/${$Auth.user.id}/${payload.post_id}`, { comment: payload.comment })
            return data
        }
        catch{
            $Notify.error('Request could not be completed. Please try again.')
        }
    }

    async fetchAll (socket: SocketIOClient.Socket, post_id: number, payload: Query = {}, refresh: boolean = false) {

        const query: Query = {
            limit: payload.limit || 15,
            offset: payload.offset || refresh ? 0 : this.comments.length,
            sort: payload.sort || [ 'created_at', 'asc' ]
        }
        let _this = this

        return new Promise(function (resolve, reject) {
            // socket.on('connect', () => {
            function fetch () {
                socket.emit('fetch', JSON.stringify({ post_id, query }))
            }
            fetch()

            socket.once('serverUpdated', () => {
                fetch()
            })
            socket.once('message', (Data) => {
                const data = JSON.parse(Data)
                _this.commentCount = data.count
                // data.comments.forEach((a) => {
                //     console.log(a.id)
                // })
                if (refresh)
                    _this.comments = data.comments
                else
                    _this.comments.push(...data.comments)
                resolve(data)
            })

            // socket.on('error', (reason) => {
            //     reject(reason)
            // })

        })
        // })
    }

    async fetch (comment_id: number) {
        $Process.add('Preparing comment')
        try
        {
            const { data } = await $Axios.get("comments/" + comment_id)
            if (data)
            {
                $Process.done()
                return data
            }
        }
        catch{
            $Notify.error()
            $Process.abort()
        }
    }

    async update (payload: { content: string, comment_id: string }) {
        try
        {
            const { data } = await $Axios.patch(`comments/${$Auth.user.id}/${payload.comment_id}`, {
                content: payload.content,
            })
            if (data)
            {
                $Notify.success('Comment Updated!.')
                $Process.done()
                return data
            }
        }
        catch{
            $Notify.error('Unable to update comment.')
            $Process.abort()
        }

    }

    async delete (comment_id: string) {
        $Process.add('Deleting comment')
        try
        {
            const { data } = await
                $Axios.delete(`comments/${$Auth.user.id}/${comment_id}`)
            if (data)
            {
                $Notify.success('Comment deleted')/* leave as is! */
                $Process.done()
            }
            return data
        }
        catch (error)
        {
            $Notify.error()
            $Process.abort()
        }
    }
}


export const $Comments = $Vue.observable(new Comments())
