import { MetaInfo } from 'vue-meta'

interface MyMetaInfo {
    title?: string,
    content?: string,
    image?: string,
    url?: string,
    type?: string

}

export class General {

    // appMode: number = 1 /* 1 = 'MainAppMode' 2 = GalleryDemoMode*/

    pasteAsPlainText (e: ClipboardEvent) {
        // e.preventDefault()
        // let t = e.target as any
        // if (t.tagName === 'BR')
        //     // t += e.clipboardData.getData('text/plain')
        //     t.closest('div').textContent += e.clipboardData.getData('text/plain')
        // else
        //     t.textContent += e.clipboardData.getData('text/plain')
        // console.log('jjjjjj', t)

    }

    /* vue-meta abstraction method */
    metaInfo (data: MyMetaInfo) {
        const defaults = {
            title: 'scavorb - web design and web app development',
            content: "scavorb - websites design, full-stack web applications development and consulting service. Have your personal and business website's UI professionally designed for the best user experience and satisfaction.",
            image: 'https://www.scavorb.com/defaults/pgs/scavorb_website_design_and_development.jpg',
            url: '',
            type: 'website'
        }


        return {
            title: data.title || defaults.title,
            meta: [
                {
                    name: 'description',
                    content: data.content ? data.content.slice(0, 250) + '...' : defaults.content
                },
                {
                    property: 'og:title',
                    content: data.title || defaults.title
                },
                {
                    property: 'og:description',
                    content: data.content ? data.content.slice(0, 250) + '...' : defaults.content
                },
                {
                    property: 'og:url',
                    content: data.url || defaults.url
                },
                {
                    property: 'og:image',/* reccomended aspect-ratio 1200x630 */
                    content: data.image || defaults.image
                },
                {
                    property: 'og:type',
                    content: data.type || defaults.type
                },
                {
                    name: 'robots',
                    content: 'index, follow'
                }
            ]
        }
    }
}
