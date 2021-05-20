import { $Vue } from '@/plugins'


interface Notification {
    message: string
    type?: string
}

export class Notify {

    notifs: Notification[] = []

    success(message: string) {
        this.set({ message, type: 'success' })
    }
    error(msg?: string) {
        const offline = function () {
            return !navigator.onLine
        }
        this.set({ message: msg ? msg : !msg && offline ? 'Check your connection!' : 'An error occured!', type: 'error' })
    }
    info(message: string) {
        this.set({ message })
    }

    private set(params: Notification) {
        this.notifs.unshift(params)

        let $this = this
        let timer
        clearTimeout(timer)
        timer = setTimeout(function () {
            $this.notifs.pop()
        }, 5000)

    }

    clear(notification: Notification) {
        this.notifs.splice(this.notifs.indexOf(notification), 1)
    }
}
