
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

    defaultContent = `Adedayo Adeniyi. Full-stack Web Applications Developer. Create custom personal and business websites tailored to your needs. Front-end Development,
    Back-end Development, UI Designs, Single Page Applications(SPAs), Ecommerce Development, Wordpress Development`
    /* vue-meta abstraction method */
    metaInfo (
        title: string,
        content: string,
        image,
        url: string,
        type: string
    ) {
        return {
            title,
            meta: [
                {
                    name: 'description',
                    content: content ? content.slice(0, 250) + '...' : this.defaultContent
                },
                {
                    property: 'og:title',
                    content: title
                },
                {
                    property: 'og:description',
                    content: content ? content.slice(0, 250) + '...' : this.defaultContent
                },
                {
                    property: 'og:url',
                    content: url
                },
                {
                    property: 'og:image',/* reccomended aspect-ratio 1200x630 */
                    content: image
                },
                {
                    property: 'og:type',
                    content: type
                },
                {
                    name: 'robots',
                    content: 'index, follow'
                }
            ]
        }
    }
}
