<template>
    <div>
        <div id="UpperSection">
            <div class="CoverImage" ref="CoverImage">
                <div class="Blur noselect">
                    <div class="flex j-c-center pt-5 pl-3">
                        <div class="logo-base logo-small shadow-5">
                            <span>
                                <span>
                                    <b>S</b>
                                </span>
                                <span></span>
                            </span>
                            <span></span>
                        </div>
                    </div>
                    <div class="text-center font-3 bold-4 my-3 t-white">SCAVORB</div>
                </div>

                <!-- :style="!profile.cover_image ? 'background-image: url(/defaults/4.jpg)' : 'background-image: url('+profile.cover_image+')'" -->
                <img
                    :src="!profile.cover_image ? '/defaults/pgs/prfcv1.jpg' : $userBaseUrl + profile.cover_image"
                />
                <div v-if="user&&user.id === profile.id" class="UploadActions">
                    <!-- Cover Image upload component-->
                    <ImageTransformer
                        ref="coverUpload"
                        @ready="finalizeImageUpload"
                        fieldName="coverImage"
                        :cropWidth="1100"
                        :cropHeight="310"
                    />
                    <span class="flex a-i-center j-c-around shadow-4 bg-trans-2">
                        <span
                            @click="triggerImageTransformer('coverUpload')"
                            class="icon-camera font-9"
                            title="Upload Image"
                        ></span>
                    </span>
                </div>
            </div>
            <!-- //// -->
            <div class="TopActions flex a-i-center j-c-between noselect">
                <router-link :to="{name:'contact'}">
                    <span class="icon-commenting"></span>
                    <span>{{ user&&user.id === profile.id ? 'MESSAGES' : 'MESSAGE'}}</span>
                </router-link>
                <router-link v-if="user" to="bookmarks">
                    <span class="icon-bookmarks"></span>
                    <span>BOOKMARKS</span>
                </router-link>
                <!-- <router-link to="/channels">
                    <span class="icon-flow-branch"></span>
                    <span>CHANNELS</span>
                </router-link>-->
                <router-link
                    v-if="user&&user.id === profile.id"
                    :to="{name:'manage-settings', query: {tab:1}}"
                >
                    <span class="icon-edit"></span>
                    <span>Edit Profile</span>
                </router-link>
            </div>
            <!-- //// -->
            <div class="Cover">
                <div class="ProfileImage noselect">
                    <img
                        :src="$userBaseUrl + profile.profile_image"
                        alt="profile image"
                        draggable="false"
                    />
                    <div v-if="user&&user.id === profile.id" class="UploadActions">
                        <!-- Profile Image upload component-->
                        <ImageTransformer
                            ref="profileUpload"
                            @ready="finalizeImageUpload"
                            fieldName="profileImage"
                        />
                        <span class="flex a-i-center j-c-around shadow-3 bg-trans-2">
                            <!--<span class="icon-camera font-12 cursor-pointer" title="Take Photo"></span> -->
                            <span
                                @click="triggerImageTransformer('profileUpload')"
                                class="icon-camera font-9"
                                title="Upload Image"
                            ></span>
                        </span>
                    </div>
                </div>
                <!-- ///// -->
                <div class="Details t-white p-2">
                    <h3 class="Name my-1 pt-1">{{profile.name}}</h3>
                    <h5 class="font-6 mb-3 mt-0">@{{profile.username}}</h5>
                    <div class="Status italic font-2 flex wrap mr-1">
                        <div class="mr-1 m-1 p-1 pr-2 b2 br1 w-fit">
                            <span class="icon-check-1 mr-1"></span>
                            {{profile.status}}
                        </div>
                        <div
                            v-if="user&&user.id === profile.id"
                            @click="updateStatus"
                            class="Update icon-arrows-cw m-1 p-1 b2 br1 w-fit noselect"
                        >Update</div>
                    </div>
                    <!-- <InputModal></InputModal> -->
                    <div class="About font-5 mt-4 p-1 noselect">
                        <b class="t-pink--3 bg-white py-1 px-3 mr-3 br2">ABOUT</b>
                        <span class="font-4 bold-1 letter-space-1">{{profile.about}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue"
import { $Auth, $Profile } from "@/myStore"
import { $Notify, $InputModal } from "@/plugins"
import { max } from 'moment'

export default defineComponent({
    components: {
        ImageTransformer: defineAsyncComponent(() => import("@/components/uploads/ImageTransformer.vue")),
    },

    computed: {
        user: () => $Auth.user,
        profile: () => $Profile.data,
    },

    methods: {
        triggerImageTransformer (ref) {
            if (ref === 'profileUpload')
            {
                (this.$refs.profileUpload as any /* child component */).trigger()
            }
            else if (ref === 'coverUpload')
            {

                (this.$refs.coverUpload as any  /* child component */).trigger()
            } else
            {
                $Notify.error('invalid imageUploadHandler query!')
            }
        },

        finalizeImageUpload (formData) {
            $Profile.$images.uploadImages(formData)
        },

        updateStatus () {
            $InputModal.set({
                header: 'Update Your Status',
                fieldName: 'status', /* NOTE: Let this match the colomn name to update in database. Otherwise there will be server error. */
                type: 'text',
                validation: {
                    rules: {
                        required: true,
                        max: 150
                    }
                },
            })
        }

    },

})
    // $refs!: {
    //     profileUpload: HTMLFormElement
    //     coverUpload: HTMLFormElement
    //     CoverImage: HTMLFormElement
    // }
</script>
<style lang="scss" scoped>
#UpperSection {
    overflow-x: hidden;
}
.CoverImage {
    & img {
        height: 100%;
        width: 100%;
        box-shadow: 0 0 8px 10px #eceff1 inset;
    }
    position: relative;
    // height: 200px;
    height: fit-content;
    background-color: lightblue;
    background-repeat: no-repeat;
    background-position: center;
    // background-size: contain;
    // object-fit: ;
    & .Blur {
        position: absolute;
        top: -15px;
        bottom: -10px;
        left: -15px;
        right: -15px;
        border: solid 4px;
        border-color: #eceff1;
        box-shadow: #eceff1 inset 18px 18px 10px, #eceff1 inset -18px -18px 10px;
    }

    & .UploadActions {
        & > span {
            position: absolute;
            bottom: 10px;
            right: 6px;
            height: 40px;
            width: 40px;
            cursor: pointer;
            border: solid $blue-grey-4 0.5px;
            border-radius: 50px;
            color: $blue-grey-4;
            & span:hover {
                color: $blue-grey-5;
            }
        }
    }
}

.TopActions {
    height: 50px;
    // padding-left: 227px;
    padding-left: 160px;
    background-color: $blue-grey-5;
    & a {
        position: relative;
        overflow: hidden;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        padding: 4px;
        font-size: 12px;
        font-weight: 700;
        margin-right: 6px;
        outline: none;
        color: $pink--4;
        border: solid $pink--2 0.5px;
        border-radius: 6px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        transition: background-color 0.3s;
        & span {
            margin-right: 4px;
            font-size: 14px;
        }
        &:active {
            box-shadow: none;
            background-color: $blue-grey-4;
        }
    }
}

.Cover {
    position: relative;
}

.ProfileImage {
    position: absolute;
    left: -15px;
    top: -90px;
    background-color: #eceff1;
    background: linear-gradient(to right, $blue-grey-5 15%, $pink--3 70%);
    border-radius: 4% 50% 50% 4%;
    width: 150px;
    height: 150px;
    & img {
        width: 150px;
        height: 150px;
        min-width: 150px;
        min-height: 150px;
        border-radius: 4% 50% 50% 4%;
        border: solid transparent 9px;
        transition: all 0.5s;
    }
    & .UploadActions {
        position: relative;
        & > span {
            position: absolute;
            bottom: -18px;
            left: 40px;
            height: 40px;
            width: 40px;
            cursor: pointer;
            border: solid $blue-grey-4 0.5px;
            border-radius: 50px;
            color: $blue-grey-4;
            transition: 0.4s;
            & span:hover {
                color: $blue-grey-5;
            }
        }
    }
}

.Details {
    min-height: 147px;
    max-height: 270px;
    padding-left: 0px;
    background-color: $pink--3;
    overflow-y: hidden;
    background: linear-gradient(to right, $blue-grey-5, $pink--3 8%);
    & .Name {
        font-size: 24px;
        text-shadow: 0px 1px 3px white;
    }
    & h5,
    .Name {
        margin-left: 140px;
    }
    & .Status {
        margin-left: 100px;
        & .Update {
            cursor: pointer;
            &:hover {
                background-color: rgba(255, 255, 255, 0.356);
            }
        }
    }
    & .About {
        margin-left: 100px;
        border-radius: 10px;
        border-top: solid 1px $pink-2;
        max-height: 150px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
}

@include sm-and-down {
    .Details {
        background: linear-gradient(to right, $blue-grey-5, $pink--3 11%);
    }
}
// @include sm-only {
// }
@include xs-only {
    .CoverImage {
        & img {
            width: 170%;
        }
    }
    .ProfileImage {
        left: -15px;
        top: -70px;
        width: 110px;
        height: 110px;
        & img {
            width: 110px;
            height: 110px;
            min-width: 110px;
            min-height: 110px;
            border: solid transparent 7px;
        }
    }
    .TopActions {
        padding-left: 120px;
        height: 40px;
        & a {
            & span:first-child {
                margin: 0;
                font-size: 18px;
            }
            & span:last-child {
                display: none;
            }
        }
    }
    .Details {
        background: linear-gradient(to right, $blue-grey-5, $pink--3 14%);
        & h5,
        .Name {
            font-size: 20px;
            margin-left: 100px;
        }
        & .About,
        .Status {
            margin-left: 60px;
        }
    }
}

@include xs-and-up {
    .MiniScreenLink {
        display: none;
    }
}
@include xxs-only {
    .Details {
        & .About,
        .Status {
            margin-left: 40px;
        }
    }
}
</style>