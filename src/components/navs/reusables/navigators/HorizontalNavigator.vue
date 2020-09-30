<template>
    <div class="Nav shadow-2 flex a-i-center noselect">
        <div
            @click="$emit('tabClicked', tab.id)"
            v-for="tab in tabsList"
            :key="tab.id"
            class="flex j-c-center"
            :class="activeTab == 'Tab-'+tab.id ? 'active' : ''"
        >
            <span class="font-6 mr-4" :class="tab.icon"></span>
            <span>{{ tab.name }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class Navigation extends Vue {
    @Prop({ required: true, type: Array }) readonly tabsList: []/* Array of objects containing -> {icon,name} */
    @Prop({ required: true, type: String }) activeTab: string/*Currently active tab*/
}
</script>
<style lang="scss" scoped>
.Nav {
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: transparent;
    width: 100%;
    z-index: 6;
    height: 55px;
    border-bottom: 1.5px solid $blue-grey;

    & > div {
        flex: 1 1 0;
        position: relative;
        cursor: pointer;
        color: $blue-grey;
        text-align: center;
        height: 50px;
        font-weight: bold;
        letter-spacing: 0.5px;
        padding: 15px 7px;
        margin-right: 1px;
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
</style>