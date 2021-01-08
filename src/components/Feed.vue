<template>
    <div>
        <div v-if="isLoading">
            <div class="center">
                <MvSpinner />
            </div>
        </div>

        <div v-if="errors"><h3>Something bad happened</h3></div>

        <div v-if="feed">
            <div
                class="article-preview"
                v-for="(article, index) in feed.articles"
                :key="index"
            >
                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'userProfile',
                            params: { slug: article.author.username }
                        }"
                    >
                        <img :src="article.author.image" />
                    </router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile',
                                params: { slug: article.author.username }
                            }"
                            class="author"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <div class="pull-xs-right">
                        ADD TO FAVORITES
                    </div>
                </div>
                <router-link
                    :to="{ name: 'article', params: { slug: article.slug } }"
                    class="preview-link"
                >
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    TAG LIST
                </router-link>
            </div>
            PAGINATION
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/feed'
import MvSpinner from '@/components/Spinner'

export default {
    name: 'MvFeed',
    components: {
        MvSpinner // регистрируем импортированный компонент
    },
    props: {
        apiUrl: {
            // указываем тип пропсов и их обязательность
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            errors: state => state.feed.errors
        })
    },
    mounted() {
        // метод который запускается при инициализации компонента
        this.$store.dispatch(actionTypes.getFeed, { apiUrl: this.apiUrl })
    }
}
</script>

<style>
.center {
    text-align: center;
}
</style>
