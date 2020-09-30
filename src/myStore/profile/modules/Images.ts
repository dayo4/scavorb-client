import { $Profile, $Auth } from '@/myStore'
import { $Axios, $Notify, $Process } from '@/plugins'

export class Images {
    // userImages = null
    // selectedImages = []

    // /* for checkboxes */
    // selectImage(imageId: number) {
    //     this.selectedImages.push(imageId)
    // }
    // unselectImage(imageId: number) {
    //     this.selectedImages.splice(this.selectedImages.indexOf(imageId), 1)
    // }
    // resetSelectedImages() {
    //     this.selectedImages = []
    // }
    // /* for checkboxes */

    // async fetch(refresh: boolean = false) {
    //     if (!this.userImages || refresh)
    //     {
    //         try
    //         {
    //             const { data } = await $Axios.get("users/fetchImages/" + $Profile.data.id)
    //             this.userImages = data
    //         }
    //         catch
    //         {
    //             $Notify.error('Unable to fetch requested resource. Please try again.')
    //         }
    //     }
    // }

    async uploadImages (formData: HTMLFormElement) {
        var config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round(progressEvent.loaded / progressEvent.total * 100)
                // console.log(percentCompleted)
            }
        }
        try
        {
            $Process.add('Processing')
            const { data } = await $Axios.patch('users/uploadImages/' + $Auth.user.id,
                formData, config
            )
            $Notify.success('Image Uploaded! Profile updated.')
            $Profile.refresh()
            // this.fetch(true)

            $Auth.refresh({
                user: data.user
            })
            $Process.done()
        }

        catch {
            $Notify.error('Image could not be uploaded. Please try again')
            $Process.abort()
        }
    }

    // async deleteImages(payload: { imagesIdArray: number[] }) {
    //     try
    //     {
    //         $Process.add('Processing')
    //         await $Axios.delete('users/deleteImages/' + $Auth.user.id, {
    //             data: payload
    //         })
    //         $Notify.success('The selected Image(s) have been deleted')
    //         // $Profile.refresh()
    //         this.fetch(true)
    //         $Process.done()
    //         this.resetSelectedImages
    //     } catch{
    //         $Process.abort()
    //         $Notify.error('The selected Image(s) could not be deleted')
    //     }
    // }

}
