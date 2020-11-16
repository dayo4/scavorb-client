/* eslint-disable */
<template>
    <div>
        <input
            ref="image_input"
            hidden="hidden"
            @change="selectImage"
            type="file"
            :name="fieldName"
            accept=".png, .jpg, .jpeg"
        />

        <!-- image cropping and resizing -->
        <transition name="slide-fade">
            <div v-show="show" class="Modal flex j-c-center">
                <div class="Content xs12 sm11 md10 lg9">
                    <h3
                        class="Head flex a-i-center j-c-between font-7 p-3 my-0 noselect bg-white t-blue-grey"
                    >
                        <span class="Header text-up">Resize Image</span>
                        <span @click="dismiss" class="icon-cancel"></span>
                    </h3>
                    <hr />
                    <div class="Body flex wrap j-c-center bg-white p-4 mb-0">
                        <div class="xs12 sm8 md6 flex j-c-center a-i-center w-full m-2">
                            <div ref="CropperContainer" class="CropperContainer">
                                <!-- Image to crop will be appended here -->
                            </div>
                        </div>
                        <h4 class="xs12 sm6 t-blue-grey my-4 font-9 text-center shadow-2">PREVIEW</h4>
                        <!-- <span class="font-4">SIZE: {{previewSize}}</span> -->
                        <div class="xs12 sm8 md6 sm6 flex j-c-center m-2">
                            <div class="PreviewContainer">
                                <img ref="cropPreview" alt="preview" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="Foot bg-white noselect flex a-i-center j-c-center p-4">
                        <button @click="dismiss" class="icons-cancel btn cyan-gradient-btn">
                            <slot name="leftBtn">Close</slot>
                        </button>
                        <button
                            @click="initializeFormData"
                            class="icon-upload btn pink-gradient-btn"
                        >UPLOAD</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref } from "vue"
import { $Profile } from '@/myStore'
import { $Notify, } from '@/plugins'

import Cropper from "cropperjs"

export default defineComponent({
    props: {
        fieldName: { required: true, type: String }, //this input field name is required on the server to upload.
        cropWidth: { required: false, type: Number },
        cropHeight: { required: false, type: Number }
    },

    data () {
        return {
            show: false,
            rawOutput: null as HTMLCanvasElement,
            base64Output: '' as string,
            originalFile: null as File


        }
    },

    methods: {
        dismiss () {
            this.show = false;
            (this.$refs.CropperContainer as HTMLDivElement).innerHTML = ''
        },

        trigger () {
            // this trigger event will originate from the parent component
            (this.$refs.image_input as HTMLInputElement).click()
        },

        selectImage () {
            const file = (this.$refs[ 'image_input' ] as HTMLInputElement).files[ 0 ]

            if (!file)
            {
                $Notify.error('no file selected')
            } else if (![ "image/jpeg", "image/jpg", "image/png" ].includes(file.type))
            {
                $Notify.error('only jpeg, jpg, png files are allowed')
            } else if (file.size > 3000000)
            {
                $Notify.error('highest size allowed is 200kb')
            } else
            {
                this.show = true

                const image = document.createElement('img')
                const imageBox = this.$refs.CropperContainer as HTMLDivElement
                let $this = this

                const fileReader = new FileReader()
                fileReader.onload = function (e) {
                    image.src = e.target.result as any
                    imageBox.appendChild(image)
                    $this.resizeImage(image)
                }
                fileReader.readAsDataURL(file)
                this.originalFile = file
            }
        },

        resizeImage (image) {
            const cropPreview = this.$refs.cropPreview as HTMLImageElement
            let $this = this

            const cropper = new Cropper(image, {
                aspectRatio: $this.cropWidth / $this.cropHeight || 1 / 1,/* alt: 16/9 */
                autoCropArea: 1,
                // background: false,
                zoomable: false,
                scalable: false,
                viewMode: 1,
                dragMode: 'none',
                crop (event) {
                    const canvas = cropper.getCroppedCanvas(
                        {
                            maxWidth: $this.cropWidth,
                            maxHeight: $this.cropHeight,
                            // 	minWidth: 256,
                            // 	minHeight: 256,
                            // maxWidth: 1400,
                            // maxHeight: 400,
                            fillColor: '#fff',
                            // imageSmoothingEnabled: false,
                            // imageSmoothingQuality: 'high',
                        }
                    )
                    $this.base64Output = cropPreview.src = canvas.toDataURL($this.originalFile.type)
                    $this.rawOutput = canvas
                },
            })
        },

        initializeFormData () {

            this.rawOutput.toBlob((blob) => {
                let file =
                    new File([ blob as Blob ], this.originalFile.name, {
                        type: "image/jpeg"//this.originalFile.type
                    })
                // console.log(file)

                const formData = new FormData()
                formData.append(this.fieldName, file)
                this.$emit('ready', formData, this.base64Output)
                this.dismiss()
            }, "image/jpeg"/* this.originalFile.type */)
        }

    }
})

</script>
<style lang="scss" scoped>
.Modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    overflow: scroll;
    background-color: rgba(87, 84, 84, 0.712);
}

.Content {
    max-height: 100%;
    margin: auto;

    & .Head {
        border-radius: 8px 8px 0 0;
        & .Header {
            max-width: 85%;
            overflow-x: hidden;
        }
        & .icon-cancel {
            font-size: 30px;
            cursor: pointer;
            text-shadow: 3px 0px 2px;
        }
    }
    & .Body {
        max-height: 100%;
        overflow-y: scroll;
        & > div:first-child {
            height: 300px;
            width: 400px;
        }
    }

    & .Foot {
        border-radius: 0 0 8px 8px;
        & button {
            min-width: 160px;
            height: 40px;
            letter-spacing: 1px;
            &:first-child {
                border-radius: 88% 3px 3px 88%;
            }
            &:last-child {
                border-radius: 3px 88% 88% 3px;
            }
        }
    }
}

.CropperContainer {
    max-width: 400px;
    max-height: 300px;
}

.PreviewContainer {
    & img {
        max-width: 200px;
        max-height: 200px;
    }
}
</style>