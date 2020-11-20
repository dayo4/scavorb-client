import GhostContentAPI from '@tryghost/content-api'

const API_KEY = '13a5910beae6743f971b7ad58d'

const ghost = (url, key) => {
    return new GhostContentAPI({
        url: url,
        key: key,
        version: 'v2'
    })
}

const postIndexFields = [
    'id',
    'uuid',
    'title',
    'slug',
    'feature_image',
    'published_at',
    'html',
    'excerpt'
]

const postsPerPage = 8

const ghostAPI = () => {
    return ghost("https://cms.scavorb.com", API_KEY)
}

export {
    ghostAPI,
    postsPerPage,
    postIndexFields
}


/* in component */