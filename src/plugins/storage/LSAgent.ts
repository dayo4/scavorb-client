import decoder from 'jwt-decode'
import { $Auth } from '@/myStore'

class LocalStorageService {
    private dataKeyStack: string[] = this.keyStack || []
    private doNotRemove: string[] = [ 'readQueue' ]

    setToken (token: string) {
        const array = this.disfigure(token)

        localStorage.setItem("test-igx1", array[ 1 ] + "i")
        localStorage.setItem("test-igx2", array[ 0 ])
        localStorage.setItem("test-igx3", array[ 2 ])

        $Auth.setUser()

        // setTimeout(() => {
        // this.selfDestruct()
        // store.dispatch('auth/logout', { notify: true })
        // }, 120000)
        // }, (1000 * 60 * 60 * 24) - 30000)

    }
    getToken () {
        const one = localStorage.getItem("test-igx2")
        const two = localStorage.getItem("test-igx1")
        const three = localStorage.getItem("test-igx3")
        if (one && two && three)
        {
            return [ one, two?.slice(0, two.length - 1), three ].join('.')
        }
        return null
    }
    getUser () {
        const token = this.getToken()
        if (token)
        {
            const decoded = decoder(token)
            return decoded.data
        }
        return null
    }

    private disfigure (token: string) {
        return token.split('.')
    }

    private get keyStack () {
        //@ts-nocheck
        return JSON.parse(localStorage.getItem("dataKeyStack") as string)
    }

    setData (data: object, storeId: string, options?: { ifExist: string }) {
        let existingData = this.getData(storeId)
        if (existingData)
        {
            if (options && options.ifExist === 'replace')
            {
                localStorage.setItem(storeId, JSON.stringify(data))
                // console.log('replaced')
            }
            else
            {
                const newData = { ...existingData, ...data }
                localStorage.setItem(storeId, JSON.stringify(newData))
                // console.log('merged')
            }
        }
        else
        {
            localStorage.setItem(storeId, JSON.stringify(data))
            // console.log('stored')

            if (!this.dataKeyStack.some((x) => x === storeId))
            {
                this.dataKeyStack.push(storeId)

                localStorage.setItem("dataKeyStack", JSON.stringify(this.dataKeyStack))
            }
        }

        if (storeId === 'userDetails')
        {
            $Auth.setUserData()
        }
    }

    getData (storeId: string) {
        //@ts-nocheck
        const data = JSON.parse(localStorage.getItem(storeId) as string)
        return data ? data : null
    }

    deleteDataKey (storeId: string) {
        // if (this.dataKeyStack.some((x) => x === storeId))
        // {
        //     const index = this.dataKeyStack.indexOf(storeId)
        //     this.dataKeyStack.splice(index, 1)
        localStorage.removeItem(storeId)

        //     localStorage.setItem("dataKeyStack", JSON.stringify(this.dataKeyStack))
        // }
    }
    selfDestruct () {
        localStorage.removeItem("test-igx2")
        localStorage.removeItem("test-igx1")
        localStorage.removeItem("test-igx3")
        //@ts-nocheck
        const data = JSON.parse(localStorage.getItem("dataKeyStack") as string)
        if (data)
        {
            for (const i of data)
            {
                if (!(this.doNotRemove.includes[ i ]))
                    localStorage.removeItem(i)
            }
        }
        this.dataKeyStack = []
        localStorage.removeItem("dataKeyStack")

        $Auth.setUser()
        $Auth.setUser()
    }
}

const LSAgent = new LocalStorageService()

export default LSAgent