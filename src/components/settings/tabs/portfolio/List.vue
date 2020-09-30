<template>
    <div class="Tab xs12 sm11 lg10">
        <transition name="slide-fade">
            <div v-if="!selectedProject && !createNew" class="Body">
                <h2 class="text-center t-blue-grey--1">MANAGE PORTFOLIO</h2>

                <button @click="createNew = true" class="bg-pink--3 mt-4 btn mb-7">Add New Project</button>

                <h3 class="Header">LIST OF PROJECTS/WORKS</h3>
                <div
                    v-if="projects.length === 0"
                    class="t-blue-grey text-center bold-3 font-9 mt-8 letter-space-1"
                >Your Portfolio Is Currently Empty.</div>
                <div v-else class="mt-5">
                    <Dropdown
                        ownID="filt"
                        :text="'Filter: '+ filter"
                        :optPos="{left: 50}"
                        class="Options icon-search-2 btn"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <a @click="filterBy('All',{})">All</a>
                            <a @click="filterBy('Active', {active:true})">Active</a>
                            <a @click="filterBy('Inactive', {active:false})">Inactive</a>
                        </template>
                    </Dropdown>

                    <div
                        v-for="proj in projects"
                        :key="proj.id"
                        @click="openProject(proj.id)"
                        class="ProjList flex mt-5"
                    >
                        <div :class="proj.active ? 'bg-green-2': 'bg-red-2'"></div>
                        <div class="flex a-i-center font-6 p-3 t-blue-grey">{{proj.title}}</div>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-fade">
            <!-- New Project Component : Also used to edit exiting project -->
            <Editor
                v-if="createNew || selectedProject"
                :projectToView="selectedProject"
                @back="back"
            ></Editor>
        </transition>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { $Auth, $Profile } from '@/myStore'
import { $Confirm, $Validator } from '@/plugins'

import Editor from './Edit.vue'

@Component({
    components: {
        Editor,
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue')
    },

    computed: {
        projects: () => $Profile.$Portfolio.projects_B
    },
})
export default class Portfolio extends Vue {

    createNew: boolean = false /* Toggles the editor component for new project */
    selectedProject: object = null

    filter: string = 'All' /* Filters projects list */
    query = {
        user_id: $Auth.user.id,
        filter: {}
    }

    load () {
        $Profile.$Portfolio.fetchAll(this.query)
    }

    filterBy (txt, v: object) {
        this.filter = txt
        this.query.filter = v
        $Profile.$Portfolio.fetchAll(this.query)
    }

    openProject (project_id) {
        $Profile.$Portfolio.fetch(project_id).then(project => {
            if (project)
                this.selectedProject = project
        })
    }

    back (refresh: boolean) {
        this.selectedProject = null
        this.createNew = false
        if (refresh)
            this.load()
    }
}
</script>
<style lang="scss" scoped>
.Header {
    font-size: 14px;
    color: $blue-grey-1;
    border-top: solid 1.5px;
    border-bottom: solid 1.5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
}

.ProjList {
    height: 45px;

    & div:first-child {
        width: 20px;
        height: 100%;
        border-bottom: white solid 2px;
        border-radius: 28px 0 0 10px;
    }
    & div:last-child {
        width: 100%;
        height: 100%;
        border-bottom: #bad4d4 solid 2px;
        background-color: #bad4d44f;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: #bad4d4b2;
        }
        &:active {
            background-color: #bad4d44f;
        }
    }
}

section {
    margin-bottom: 35px;
}
</style>