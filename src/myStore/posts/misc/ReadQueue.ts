import { $Notify, $LSAgent } from '@/plugins'

export class ReadQueue {

    status = false
    queue = $LSAgent.getData('readQueue')

    show () {
        this.status = true
    }
    hide () {
        this.status = false
    }

    private setQueue () {
        this.queue = $LSAgent.getData('readQueue')
    }

    add (post: any/* object */) {
        const Q = $LSAgent.getData('readQueue')
        if (Q)
        {
            const exists = Q.some(x => {
                return x.id === post.id
            })
            if (exists)
            {
                $Notify.info('Already in queue')
            }
            else
            {
                Q.push(post)
                $LSAgent.setData(Q, 'readQueue', { ifExist: 'replace' })

                this.setQueue()

                $Notify.info('Added to queue')
            }
        }
        else
        {
            $LSAgent.setData([ post ], 'readQueue')
            this.setQueue()

            $Notify.info('Added to queue')
        }

    }

    remove (id: string/* id of the post */) {
        const Q = $LSAgent.getData('readQueue')
        if (Q)
        {
            for (let i of Q)
            {
                if (i.id === id)
                {
                    Q.splice(Q.indexOf(i), 1)
                    $LSAgent.setData(Q, 'readQueue', { ifExist: 'replace' })
                    this.setQueue()
                }
            }

            $Notify.info('Removed from queue')
        }
    }

    clear () {
        const Q = $LSAgent.getData('readQueue')
        if (Q)
        {
            $LSAgent.deleteDataKey('readQueue')
            this.setQueue()

            $Notify.info('Cleared!')
        }
    }

}
