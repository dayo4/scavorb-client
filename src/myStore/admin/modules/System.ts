import { $Axios, $Process, $Notify } from '@/plugins'

export class System {

    async update (payload) {
        $Process.add()
        try
        {
            const { data } = await $Axios.patch("admEP/settings", { settings: payload })
            if (data)
            {
                $Notify.success('Updated')
                return data
            }
        } catch (e)
        {
            $Notify.error(e)
        }
        finally { $Process.hide() }
    }


}
