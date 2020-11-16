<template>
    <button
        @click="dropdown = !dropdown"
        :style="pos ? {
			position: pos.type,
			top: pos.top+'px',
			bottom: pos.bottom+'px',
			left: pos.left+'px',
			right: pos.right+'px',
			}: ''"
        :class="'DropBtnId-'+ownID"
        class="GlobalDropBtn"
    >
        <span>{{ text?' '+text:''}}</span>
        <transition name="slide-down-fade">
            <button
                v-if="dropdown === true"
                class="GlobalDropdown shadow-5 bg-grey--3 font-3 br1 t-white px-3 noselect"
                :style="optPos ? {
					top: optPos.top+'px',
					bottom: optPos.bottom+'px',
					left: optPos.left+'px',
					right: optPos.right+'px',
					}: ''"
            >
                <slot></slot>
            </button>
        </transition>
    </button>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    props: {
        ownID: { required: true, type: [ String, Number ] },
        text: { required: false, type: String },
        pos: { required: false, type: Object /* { type?, top?, bottom?, right?, left?} */ },
        optPos: { required: false, type: Object /* { type?, top?, bottom?, right?, left?} */ }
    },
    data () {
        return {
            dropdown: false
        }
    },

    methods: {
        dropdownHandler () {
            // const _this = this
            const dropdown = (e) => {
                if (!(e.target.closest('.DropBtnId-' + this.ownID)))
                {
                    this.dropdown = false
                }
            }
            window.addEventListener('click', dropdown, false)
        }
    },
    mounted () {
        this.dropdownHandler()
    }
})

</script>
<style lang="scss">
.GlobalDropBtn {
    position: relative;
    height: 33px;
    z-index: 1;
}
.GlobalDropdown {
    position: absolute;
    right: 25px;
    top: 32px;
    & a {
        text-decoration: none;
        color: white;
    }
    & > * {
        border-bottom: solid 1px grey;
        display: flex;
        flex-wrap: nowrap;
        padding: 5px 7px 5px 5px;
        margin: 5px 3px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
            background-color: rgba(228, 227, 227, 0.26);
        }

        & span:first-child {
            margin-right: 8px !important;
        }
        & span:only-child {
            margin-right: 0px !important;
        }
    }
}
</style>