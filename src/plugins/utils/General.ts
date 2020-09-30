
export class General {

    pasteAsPlainText (e: ClipboardEvent) {
        e.preventDefault()
        let t = e.target as any
        if (t.tagName === 'BR')
            // t += e.clipboardData.getData('text/plain')
            t.closest('div').textContent += e.clipboardData.getData('text/plain')
        else
            t.textContent += e.clipboardData.getData('text/plain')
        // console.log('jjjjjj', t)

    }

    /* vue-meta abstraction method */
    metaInfo (
        title: string,
        content: string,
        image,
        url: string,
        type: string = 'website'
    ) {
        return {
            title,
            meta: [
                {
                    name: 'description',
                    content: content.slice(0, 250) + '...'
                },
                {
                    property: 'og:title',
                    content: title
                },
                {
                    property: 'og:description',
                    content: content.slice(0, 250) + '...'
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
