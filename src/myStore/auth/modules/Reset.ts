import { $Axios, } from '@/plugins'

export class Reset {

    response = {
        error: false,
        message: ''
    }

    async send (payload: { stage_1?: { email: string }, stage_2?: { email: string, token: string }, stage_3?: { email: string, password: string } }) {
        const sr = this.response
        try
        {
            const { data } = await $Axios.post("resetPassword", {
                ...payload /* ONLY ONE OF THE PAYLOAD PROPERTIES WILL BE SENT AT A TIME, THAT'S WHY THEY ARE OPTIONAL */
            })
            if (data)
            {
                // console.log(data)
                if (data.stage) /* next implies to move to the new password stage after token verification */
                {
                    sr.error = false
                    sr.message = data.info
                    return data
                }
                else
                {
                    sr.error = false
                    sr.message = data
                }
            }
        } catch (e)
        {
            sr.error = true
            sr.message = e
        }
    }

}
