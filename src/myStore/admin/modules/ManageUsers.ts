import { $Axios, $Process, $Notify } from '@/plugins'

interface Query {
    limit?: number
    offset?: number
    filter?: object
    sort?: string[]

}

export class Users {
    users = []
    count = 0


    // createManyDummy () {
    //     $Axios
    //         .post("createMany")
    //         .then(({ data }) => {
    //             // console.log(data)
    //             this.fetchAll()
    //         })
    //         .catch((error) => {
    //             // console.log(error)
    //         })
    // }

    async fetchAll (payload?: Query, refresh: boolean = false) {
        $Process.add('fetching users')
        const query: Query = {
            limit: payload.limit || 20,
            offset: payload.offset || refresh ? 0 : this.users.length,
            filter: payload.filter,
            sort: payload.sort
        }
        try
        {
            const { data } = await $Axios.post("admEP/allUsers", { query: JSON.stringify(query) })
            this.count = data.count
            if (refresh)
                this.users = data.users
            else
                this.users.push(...data.users)
            // return data
        } catch (error)
        {
            $Notify.error(error)
        }
        finally { $Process.hide() }
    }
    async fetch (user_id) {
        $Process.add()
        try
        {
            const { data } = await $Axios.get("admEP/users/" + user_id)
            return data
        } catch (error)
        {
            $Notify.error(error)
        }
        finally { $Process.hide() }
    }

    async changeStatus (payload: { user_id: any, actor_id: any/* person who did the action */, action: string, reason: string }) {
        $Process.add()
        try
        {
            const { data } = await $Axios.patch("admEP/users/status/", payload)
            if (data)
            {
                $Notify.success('Account status updated!')
                return data
            }
        } catch (error)
        {
            $Notify.error(error)
        }
        finally { $Process.hide() }
    }
    async delete (user_id) {
        $Process.add()
        try
        {
            const { data } = await $Axios.delete("admEP/users/delete/" + user_id)
            if (data)
            {
                $Notify.success('User deleted!')
                return data
            }
        } catch (error)
        {
            $Notify.error(error)
        }
        finally { $Process.hide() }
    }

}
