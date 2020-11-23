// import GhostContentAPI from '@tryghost/content-api'

// const API_KEY = '13a5910beae6743f971b7ad58d'

// const ghost = (url, key) => {
//     return new GhostContentAPI({
//         url: url,
//         key: key,
//         version: 'v2'
//     })
// }

// const postIndexFields = [
//     'id',
//     'uuid',
//     'title',
//     'slug',
//     'feature_image',
//     'published_at',
//     'html',
//     'excerpt'
// ]

// const postsPerPage = 8

// const ghostAPI = () => {
//     return ghost("https://cms.scavorb.com", API_KEY)
// }


// import $Axios from "axios"
// import { reactive } from "vue"

// class fff {
//     tdata = []

//     async fetchData () {
//         try
//         {
//             const { data } = await $Axios.get('https://cms.scavorb.com/ghost/api/v3/content/posts/?key=13a5910beae6743f971b7ad58d')
//             if (data)
//             {
//                 console.log(data)
//                 this.tdata = data

//             }
//         }
//         catch (e)
//         {
//             console.log(e)
//         }
//     }
// }
// /* in component */

// const fdata = reactive(new fff())
// fdata.fetchData()

// export {
//     ghostAPI,
//     postsPerPage,
//     postIndexFields,
//     fdata
// }
