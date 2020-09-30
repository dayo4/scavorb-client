import { $Auth } from '@/myStore'
import { $Axios, $Notify, $Process } from '@/plugins'
interface Query {
    filter?: object
    user_id?: string
}
export class Portfolio {
    projects_A = [] /* Appears in profile */
    projects_B = [] /* Only for the settings page */


    editorConfig: [
        [
            { header: [ false, 1, 2, 3, 4, 5, 6 ] }
        ],
        [
            { font: [] },
        ],
        [ "bold", "italic", "underline", "strike" ],
        [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" }
        ],
        [ "blockquote", "code-block" ],
        [
            { script: "sub" },
            { script: "super" }
        ],
        [
            { list: "ordered" },
            { list: "bullet" },
            { list: "check" }
        ],
        [
            { indent: "-1" },
            { indent: "+1" }
        ],
        [
            { color: [] },
            { background: [] }
        ],
        [ "link", "video" ]
    ]

    async create (payload: any) {
        $Process.add()

        try
        {
            const { data } = await $Axios.post(`portfolio/new/${$Auth.user.id}`, {
                ...payload
            })
            $Notify.success('Portfolio Updated!')
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async update (payload: any) {
        $Process.add()

        try
        {
            const { data } = await $Axios.patch(`portfolio/${$Auth.user.id}`, {
                ...payload
            })
            $Notify.success('Portfolio Updated!')
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async delete (project_id: string) {
        $Process.add()

        try
        {
            const { data } = await $Axios.delete(`portfolio/${$Auth.user.id}/${project_id}`)
            $Notify.success('Deleted!')
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async fetch (project_id: string) {
        $Process.add()

        try
        {
            const { data } = await $Axios.get(`portfolio/${project_id}`)
            return data
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async fetchAll (payload: Query = {}, fetchDetail: boolean = false) {
        try
        {
            const { data } = await $Axios.post(`portfolio/${payload.user_id}`, { query: JSON.stringify(payload), fetchDetail })
            if (fetchDetail)
                this.projects_A = data
            this.projects_B = data
            return true
        }
        catch {
            $Notify.error()
        }
    }


}
