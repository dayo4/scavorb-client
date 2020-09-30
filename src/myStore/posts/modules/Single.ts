import { $Axios, $Process, $Notify } from '@/plugins'

export class SinglePost {
    post = null

    async fetch (payload: { post_id: string }) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get("posts/" + payload.post_id)
            this.post = data
            return true
        }
        catch (e)
        {
            $Notify.error('Unable to get the requested page')
        }
        finally { $Process.hide() }
    }
}
