/* Import other modules */
import { Images } from './modules/Images'
import { Settings } from './modules/Settings'
import { Portfolio } from './modules/Portfolio'
import { Status } from './modules/Status'

import { $Auth } from '@/myStore'
import { $Vue, $Axios, $Notify, $Process } from '@/plugins'


class Profile {
    $images = new Images()
    $settings = new Settings()
    $Portfolio = new Portfolio()
    $status = new Status()

    data: any = null


    async fetch (payload: { username: string }, refresh: boolean = false) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get("users/" + payload.username)
            this.data = data
            $Process.hide()
            // this.$images.fetch(true)
            this.$Portfolio.fetchAll({ user_id: this.data.id, filter: { active: true } }, true)
            return data
        } catch {
            $Process.hide()
            $Notify.error()
        }
    }

    refresh () {
        this.fetch({ username: $Auth.user.username }, true)
    }
}

export const $Profile = $Vue.observable(new Profile())
