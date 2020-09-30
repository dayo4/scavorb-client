import { $Auth } from '@/myStore'
import { $Axios, $Notify } from '@/plugins'

export class Settings {

    editName (payload: object) {
        $Axios.patch('users/' + $Auth.user.id, {
            ...payload
        })
            .then(({ data }) => {
                $Notify.success('Updated')

                $Auth.refresh({
                    user: data.user
                })
            })
            .catch(() => {
                $Notify.error()
            })
    }

    editAbout (payload: object) {
        $Axios.patch('users/' + $Auth.user.id, {
            ...payload
        })
            .then(({ data }) => {
                $Notify.success('Updated')

                $Auth.refresh({
                    user: data.user
                })
            })
            .catch(() => {
                $Notify.error()
            })
    }

    async changePassword (payload: object) {
        try
        {
            const { data } = await $Axios.patch('users/' + $Auth.user.id, {
                ...payload
            })

            if (data)
                $Notify.success('Updated')
            return data
        }
        catch (error)
        {
            $Notify.error(error)/* leave as is! */
        }
    }

    async deactivateAccount () {
        try
        {
            const { data } = await $Axios.patch('users/' + $Auth.user.id, {
                active: false
            })

            $Notify.success('Account deactivated')
            return data
        }
        catch (e)
        {
            $Notify.error()
        }
    }
    async deleteAccount () {
        try
        {
            const { data } = await $Axios.delete('users/' + $Auth.user.id)

            $Notify.success(data)
            return data
        }
        catch (e)
        {
            $Notify.error()
        }
    }

}
