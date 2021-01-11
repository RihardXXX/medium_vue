<template>
    <div class="sidebar">
        <div v-if="isLoading">
            <MvSpinner />
        </div>
        <div v-if="errors">
            <h3>ERROR {{ errors }}</h3>
        </div>

        <div v-if="tags">
            <p>Popular Tags</p>
            <router-link
                v-for="tag in tags"
                :key="tag"
                :to="{ name: 'tag', params: { slug: tag } }"
                class="tag-default tag-pill ng-binding ng-scope"
                >{{ tag }}</router-link
            >
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/tags'
import MvSpinner from '@/components/Spinner'

export default {
    name: 'MvTags',
    data() {
        return {
            // ту мы храним данные
            apiUrl: '/tags' // куда делать запрос
        }
    },
    components: {
        MvSpinner
    },
    computed: {
        // получаем данные из стейта
        ...mapState({
            isLoading: state => state.tags.isLoading,
            tags: state => state.tags.data,
            errors: state => state.tags.errors
        })
    },
    mounted() {
        //  хук при при формировании компонента
        this.fetchTags()
    },
    methods: {
        // метод делающий апи запрос к серверу
        fetchTags() {
            const urlTags = this.apiUrl
            this.$store.dispatch(actionTypes.getTags, {
                apiUrl: urlTags
            })
        }
    }
}
</script>

<style>
.sidebar {
    text-align: center;
}
</style>
