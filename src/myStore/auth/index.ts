import { $Vue } from '@/plugins'
import { $Notify, $Axios, $LSAgent, $Router } from '@/plugins'

import { Form } from './modules/Form'
import { Reset } from './modules/Reset'


export class Authentication {
    $form = new Form()
    $reset = new Reset()

    user = $LSAgent.getUser()
    userData = $LSAgent.getData('userDetails')
    sysSettings = $LSAgent.getData('sysSet')

    get isUser (): boolean {
        return !!this.user
    }

    get isAdmin (): boolean {
        if (this.isUser)
        {
            return this.user.pr >= 9
        }
        return false
    }

    get isSAdmin (): boolean {
        if (this.isUser)
        {
            return this.user.pr === 10
        }
        return false
    }

    setUser () {
        this.user = $LSAgent.getUser()
    }
    setUserData () {
        this.userData = $LSAgent.getData('userDetails')
    }



    refresh (payload: any) {
        $LSAgent.setData(payload.user, 'userDetails')
    }

    deleteAccount () {
        $Axios.delete('users/' + this.user.id)
            .then(({ data }) => {
                $LSAgent.selfDestruct()
                $Router.push({ path: '/' })
                $Notify.error(data)
            })
            .catch((error) => {
                $Notify.error(error.message)
            })
    }

    async getSysSettings () {

        try
        {
            const { data } = await $Axios.get("system/settings")
            if (data)
                $LSAgent.setData(data, 'sysSet')

            this.sysSettings = $LSAgent.getData('sysSet')
        } catch (e)
        {
            // $Notify.error(e)
        }
    }

}

export const $Auth = $Vue.reactive(new Authentication())
