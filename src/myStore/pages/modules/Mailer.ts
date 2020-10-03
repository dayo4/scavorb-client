import { $Axios, $Process, $Notify } from '@/plugins'

export class Mailer {
    success: string = ''
    error: string = ''

    async send (payload: { name: string, email: string, subject: string, message: string, token: string }) {
        $Process.add('Sending Message...')
        this.error = this.success = ''
        try
        {
            const { data } = await $Axios.post("mail/send", {
                ...payload
            })
            this.error = ''
            this.success = data
            return data
        }
        catch (e)
        {
            this.success = ''
            this.error = e
        }
        finally { $Process.hide() }
    }
}
