import { $Auth } from '@/myStore'
import { $Vue, $Axios, $Process, $Notify } from '@/plugins'


export class Compose {
    content = ''
    currentPost_id = null
    contentToEdit = null
    featuredImage = {
        postImageSrc: null,
        formData: null
    }

    editorConfig = [
        [
            { header: [ false, 1, 2, 3, 4, 5, 6 ] }
        ],
        [
            { font: [] },
            // { size: [] }
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
        [ "link", "image", "video" ], [ "clean" ]
    ]

    setFeaturedImage (data: object) {
        // console.log(data)
        this.featuredImage = data as any
    }

    async newPost (payload: { title: string, slug: string, content: string, contentImages: string[] }) {
        try
        {
            const { data } = await $Axios.post("posts/new/" + $Auth.user.id, {
                ...payload
            })
            this.currentPost_id = data
            if (this.featuredImage.formData)
            {
                this.uploadImages(this.featuredImage.formData)
            }
            $Notify.success('Content Saved.')

            $Process.done()
        }
        catch {
            $Notify.error()
            $Process.abort()
            if (payload.contentImages)
                //remove any image allready uploaded if error occured
                this.removeImages(payload.contentImages)
        }
    }

    /* This fetches posts for editing and update. */
    async fetch (payload: { post_id: string }) {
        $Process.add('Fetching content')
        try
        {
            const { data } = await $Axios.get("posts/" + payload.post_id)
            if (data)
            {
                this.contentToEdit = data
                this.currentPost_id = payload.post_id
                this.featuredImage.postImageSrc = data.img
                return data
            }
        }
        catch{
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async update (payload: { title: string, slug: string, content: string, contentImages: string[] }) {
        // this.currentPost_id
        try
        {
            const { data } = await $Axios.patch('posts/' + $Auth.user.id, {
                ...payload,
                postsIds: [ this.currentPost_id ]
            })
            if (data)
                if (this.featuredImage.formData)
                {
                    this.uploadImages(this.featuredImage.formData)
                }
            $Notify.success('Updated!')
            return data
        }
        catch{
            $Notify.error()
            if (payload.contentImages)
                //remove any image allready uploaded if error occured
                this.removeImages(payload.contentImages)
        }
        finally { $Process.hide() }
    }

    async uploadImages (formData: FormData) {
        try
        {
            const { data } = await $Axios.patch('posts/uploadImages/' + this.currentPost_id + '/' + $Auth.user.id,
                formData
            )
            if (data)
            {
                $Notify.success('Uploaded!')
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async removeImages (payload: string[]) {
        try
        {
            const deleted = await
                $Axios.patch('posts/deleteImages/' + $Auth.user.id, {
                    imageUrls: payload
                })
            if (deleted)
                $Notify.success('Deleted!')

        }
        catch{
            $Notify.error()
        }
    }

}
