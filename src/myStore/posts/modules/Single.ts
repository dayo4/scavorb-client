import { $Axios, $Process, $Notify } from '@/plugins'

export class SinglePost {
    post = null

    async fetch (payload: { slug: string }, preview = false) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get("posts/" + payload.slug + '/' + (preview ? 'preview' : ''))
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
