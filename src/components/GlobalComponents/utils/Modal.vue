<template>
    <transition name="slide-fade">
        <div v-if="condition" class="GlobalModal modal flex a-i-center j-c-center">
            <div class="Content xs12 sm8 md6 pl-2">
                <h3
                    class="Head flex a-i-center j-c-between font-7 p-4 my-0 noselect"
                    :class="HCB ? HCB : 'bg-white t-blue-grey'"
                >
                    <span class="Header text-up">
                        <!-- heading slot -->
                        <slot name="heading"></slot>
                    </span>
                    <div @click="$emit('close')" class="labeled-action">
                        <span class="icon-off t-pink-2"></span>
                        <span>Close</span>
                    </div>
                </h3>
                <hr />
                <div
                    class="Body bg-white p-2 mb-0 br1"
                    :style="`${minHeight ? 'min-height:'+minHeight+'px;' : ''} ${maxHeight ? 'max-height:'+maxHeight+'px' : ''}`"
                >
                    <!-- body slot -->
                    <slot></slot>
                </div>
                <hr />
                <div class="Foot bg-white noselect flex a-i-center j-c-center p-4">
                    <!-- action slots -->
                    <button
                        @click="$emit('close')"
                        class="btn cyan-gradient-btn"
                        :class="LCB ? LCB : 'icon-cancel'"
                    >
                        <slot name="leftBtn">Close</slot>
                    </button>
                    <button
                        @click="$emit('action')"
                        class="btn pink-gradient-btn"
                        :class="RCB ? RCB : 'icon-hammer'"
                    >
                        <slot name="rightBtn">OK</slot>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        condition: { required: true },
        minHeight: { required: false, type: Number },
        maxHeight: { required: false, type: Number },
        /* additional special classname binding for the slots if necessary */
        HCB: { required: false, type: String },/* header_class_binding */
        LCB: { required: false, type: String },/* leftBtn_class_binding */
        RCB: { required: false, type: String },/* rightBtn_class_binding */
    },
})
</script>
<style lang="scss">
.GlobalModal {
    overflow-y: scroll;
    & .Content {
        & .Head {
            border-radius: 8px 8px 0 0;
            & .Header {
                max-width: 85%;
                overflow-x: hidden;
            }
        }
        & .Body {
            min-height: 100px;
            max-height: 300px;
            overflow-y: scroll;
        }

        & .Foot {
            border-radius: 0 0 100px 100px;
            & button {
                height: 40px;
                min-width: 100px;
                letter-spacing: 1.5px;
                &:first-child {
                    border-radius: 88% 3px 3px 88%;
                }
                &:last-child {
                    border-radius: 3px 88% 88% 3px;
                }
            }
        }
    }
}
</style>