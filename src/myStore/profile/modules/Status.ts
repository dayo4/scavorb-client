import { $Auth, $Profile } from '@/myStore'
import { $Axios, $Notify, $Process } from '@/plugins'

export class Status {


    async updateStatus (payload: object) {
        $Process.add('Updating')
        try
        {
            const data: any = await $Axios.patch('users/' + $Auth.user.id, {
                ...payload
            })
            $Notify.success('Your status has been updated.')

            $Auth.refresh({
                user: data.user
            })
            $Profile.refresh()
            return true
        }
        catch {
            $Notify.error('Unable to update status')
        }
        finally { $Process.hide() }
    }
}
