<template>
    <router-view v-slot="{ Component }">
        <transition name="slide-fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>