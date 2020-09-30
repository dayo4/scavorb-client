
import { $Auth } from '@/myStore'
import { $Vue, $Axios, $Notify, $Process } from '@/plugins'

interface State {
    comments: Array<object>
    commentCount: number
}
interface Query {
    limit?: number
    offset?: number
    sort?: string[]

}

export class SubComments {
    showComments = false
    comments = []
    commentCount = 0


    async new (payload: { comment_id: number, comment: string }) {
        try
        {
            const { data } = await $Axios.post(`subComments/new/${$Auth.user.id}/${payload.comment_id}`, { comment: payload.comment })

            return data
        }
        catch{
            $Notify.error()
        }
    }

    async fetchAll (socket: SocketIOClient.Socket, comment_id: number, payload: Query = {}, refresh: boolean = false) {
        let _this = this

        const query: Query = {
            limit: payload.limit || 15,
            offset: payload.offset || refresh ? 0 : this.comments.length,
            sort: payload.sort || [ 'created_at', 'asc' ]
        }

        return new Promise(function (resolve, reject) {
            // socket.on('connect', () => {
            function fetch () {
                socket.emit('fetch', JSON.stringify({ comment_id, query }))
            }
            fetch()

            socket.once('serverUpdated', () => {
                fetch()
            })
            socket.once('message', (Data) => {
                const data = JSON.parse(Data)
                _this.commentCount = data.count

                if (refresh)
                    _this.comments = data.comments
                else
                    _this.comments.push(...data.comments)
                resolve(data)
            })

            // socket.on('error', (reason) => {
            //     regect(reason)
            // })

        })
        // })
    }

    async fetch (comment_id: string) {
        $Process.add('Preparing comment')
        try
        {
            const { data } = await $Axios.get("subComments/" + comment_id)
            if (data)
            {
                $Process.done()
                return data
            }
        }
        catch{
            $Notify.error('Unable to fetch comment for editing.')

            $Process.abort()
        }
    }

    async update (payload: { content: string, comment_id: string }) {
        try
        {
            const { data } = await $Axios.patch(`subComments/${$Auth.user.id}/${payload.comment_id}`, {
                content: payload.content,
            })
            if (data)
            {
                $Notify.success('Comment Updated!.')
                return data
            }
        }
        catch{
            $Notify.error()
        }
        finally { $Process.done() }

    }

    async delete (comment_id: string) {
        $Process.add('Deleting comment')
        try
        {
            const { data } = await
                $Axios.delete(`subComments/${$Auth.user.id}/${comment_id}`)
            if (data)
            {
                $Notify.success('Comment deleted')/* leave as is! */
            }
            return data
        }
        catch (error)
        {
            $Notify.error()
        }
        finally { $Process.done() }
    }
}
