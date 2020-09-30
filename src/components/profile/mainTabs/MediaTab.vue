<template>
    <div v-show="currentTab === 'Tab-3'" class="Tab-3">
        <div v-if="images && images.length > 0">
            <transition name="slide-down-fade">
                <div v-if="selectedImages.length > 0" class="Actions flex j-c-center noselect">
                    <span
                        @click="deleteImages"
                        class="icon-trash-empty btn pink-gradient-btn"
                    >Delete</span>
                    <span class="icon-forward btn cyan-gradient-btn px-1">Set Image As</span>
                </div>
            </transition>
            <h3 v-if="user&&user.id === profile.id" class="my-3">Select Images to work on</h3>
            <h5 v-show="selectedImages.length > 0" class="my-1">{{selectedImages.length}} Selected</h5>
            <div class="Wrapper">
                <div class="Img noselect" v-for="img in images" :key="img.id">
                    <img class :src="$userBaseUrl + img.url" :alt="img.class" />
                    <span v-if="img.url === profile.profile_image" class="InUse icon-user"></span>
                    <span v-if="img.url === profile.cover_image" class="InUse icon-picture"></span>
                    <span
                        v-if="img.url !== profile.cover_image && img.url !== profile.profile_image && user&&user.id === profile.id"
                        @click="selectImage(img.id)"
                        :class="checkBox(img.id) ? 'icon-check-1' : ''"
                        class="NotInUse"
                    ></span>
                </div>
            </div>
        </div>
        <!-- if no images to display -->
        <div v-else>
            <h2
                class="t-blue-grey text-center text-cap font-9 mt-8 letter-space-1"
            >{{ user&&user.id === profile.id ? 'You Currently Have No Uploaded Media.' : profile.name + ' Currently Has No Uploaded Media.' }}</h2>
        </div>
    </div>
</template>
 <script lang="ts">
// import { Component, Vue, Prop, Watch } from "vue-property-decorator"
// import { $Auth, $Profile } from '@/myStore'
// import { $Confirm } from '@/plugins'

// @Component({
//     computed: {
//         user: () => $Auth.user,
//         profile: () => $Profile.data,
//         images: () => $Profile.$images.userImages,
//         selectedImages: () => $Profile.$images.selectedImages,
//     }
// })
// export default class Media extends Vue {


//     @Prop({ required: true, type: String }) readonly currentTab: string
//     selectedImages!: number[]

//     // @Watch('$route')
//     // refreshImages() {
//     // 	$Profile.$images.refresh()
//     // 	// $Profile.$images.fetch()
//     // }

//     selectImage (imageId) {
//         if (!this.selectedImages.includes(imageId))
//             $Profile.$images.selectImage(imageId)
//         else
//             $Profile.$images.unselectImage(imageId)

//     }
//     checkBox (imageId) {
//         if (this.selectedImages.includes(imageId))
//             return true
//     }

//     deleteImages () {
//         if (this.selectedImages.length > 0)
//         {
//             $Confirm({
//                 header: 'Delete Images',
//                 message: `The selected images will be permanently deleted. The process is irreversible.<br>
// 					<b>Are you sure you want to do delete the image(s)?</b>`,
//                 type: 'warning',
//                 onConfirm: function () {
//                     console.log('confirmed')
//                 }
//             })
//         }
//     }
// }
 </script>
<style lang="scss" scoped>
// .Tab-3 {
//     min-height: 500px;
//     & .Wrapper {
//         display: flex;
//         flex-wrap: wrap;
//         & .Img {
//             position: relative;
//             flex: 0 0 auto;
//             margin: 4px;
//             & span {
//                 position: absolute;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 color: $pink--4;
//                 background-color: white;
//                 &.InUse {
//                     top: 3px;
//                     right: 3px;
//                     width: 25px;
//                     height: 25px;
//                     font-size: 19px;
//                     border: $pink--4 solid 0.5px;
//                 }
//                 &.NotInUse {
//                     top: -5px;
//                     right: -5px;
//                     width: 20px;
//                     height: 20px;
//                     border: $pink--4 solid 2px;
//                     cursor: pointer;
//                 }
//             }
//             & img {
//                 max-width: 150px;
//                 max-height: 150px;
//             }
//         }
//     }
// }

// .Actions {
//     & span {
//         min-width: 100px;
//         height: 40px;
//     }
//     & > :first-child {
//         border-radius: 28px 0 0 28px;
//     }
//     & > :last-child {
//         border-radius: 0 28px 28px 0;
//     }
// }
</style>