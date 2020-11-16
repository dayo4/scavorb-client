<template>
    <div class="Nav shadow-2 md3 lg3 noselect" :class="collapsed ? 'Collapsed' : ''">
        <div
            @click="$emit('tabClicked', tab.id)"
            v-for="tab in tabsList"
            :key="tab.id"
            :class="activeTab == 'Tab_'+tab.id ? 'active' : ''"
        >
            <span class="font-6 mr-4" :class="tab.icon"></span>
            <span>{{ tab.name }}</span>
        </div>

        <span
            @click="collapsed = !collapsed"
            class="Handle shadow-4 b1 br2 font-6 t-white bg-blue-grey--2"
            :class="collapsed?'icon-left-big':' icon-right-big'"
        ></span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        tabsList: { required: true, type: Array },/* Array of objects containing -> {icon,name} */
        activeTab: { required: true, type: String },/*Currently active tab*/
    },

    data () {
        return {
            collapsed: true
        }
    },
})
</script>
<style lang="scss" scoped>
.Nav {
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    width: 380px;
    z-index: 6;
    height: 100vh;
    padding-top: 55px;
    border-left: 1.5px solid $blue-grey;
    & .Handle {
        display: none;
    }

    & > div {
        min-width: 100%;
        position: relative;
        cursor: pointer;
        color: $blue-grey;
        height: 50px;
        font-weight: bold;
        letter-spacing: 0.5px;
        padding: 15px 7px;
        margin-bottom: 1px;
        transition: background-color 0.3s ease;
        &.active,
        &:hover {
            color: white;
            background-color: $blue-grey--2;
        }
        &::before {
            content: "";
            position: absolute;
            top: 2px;
            width: 0;
            left: 50%;
            border-bottom: 3px solid transparent;
            transition: ease-in-out 0.4s;
        }
        &::after {
            content: "";
            position: absolute;
            bottom: 2px;
            width: 0;
            left: 50%;
            border-bottom: 3px solid transparent;
            transition: ease-in-out 0.4s;
        }
        &.active:hover::after,
        &.active:hover::before {
            border-bottom: 3px solid white;
        }
        &.active::after,
        &.active::before {
            border-bottom: 3px solid white;
            left: 0px;
            width: 100%;
        }
    }
}

@include sm-and-down {
    .Nav {
        background-color: $blue-grey-5;
        margin-left: 20px;
        width: 300px;
        transition: transform 0.4s ease;

        &.Collapsed {
            transform: translateX(257px);
        }
        & .Handle {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: absolute;
            top: 60%;
            left: -17px;
            height: 60px;
            width: 25px;
        }
    }
}
</style>