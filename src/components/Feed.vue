<template>
    <div>
        <div class="center">
            <MvSpinner v-if="isLoading" />
            <MvError v-if="errors" :errorsMessage="'Feeds error'" />
        </div>

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
            <MvPagination
                :total="feed.articlesCount"
                :limit="limit"
                :currentPage="currentPage"
                :url="baseUrl"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/feed'
import MvSpinner from '@/components/Spinner'
import MvError from '@/components/Error'
import MvPagination from '@/components/Pagination'
import { limit } from '@/helpers/variables'
import { stringify, parseUrl } from 'query-string'

export default {
    name: 'MvFeed',
    components: {
        MvSpinner, // регистрируем импортированный компонент
        MvPagination,
        MvError
    },
    props: {
        apiUrl: {
            // указываем тип пропсов и их обязательность
            type: String,
            required: true
        }
    },
    data() {
        // данные
        return {
            // total: 500,
            limit,
            url: '/'
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.feed.isLoading,
            feed: state => state.feed.data,
            errors: state => state.feed.errors
        }),
        currentPage() {
            return Number(this.$route.query.page || '1')
        },
        baseUrl() {
            return this.$route.path
        },
        offset() {
            return this.currentPage * limit - limit
        }
    },
    watch: {
        currentPage() {
            this.fetchFeed()
        },
        apiUrl(newValue) {
            this.apiUrl = newValue
            this.fetchFeed()
        }
    },
    mounted() {
        // метод который запускается при инициализации компонента
        this.fetchFeed()
    },
    methods: {
        fetchFeed() {
            const parsedUrl = parseUrl(this.apiUrl)
            const stringifiedParams = stringify({
                limit,
                offset: this.offset,
                ...parsedUrl.query
            })
            const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
            this.$store.dispatch(actionTypes.getFeed, {
                apiUrl: apiUrlWithParams
            })
        }
    }
}
</script>

<style>
.center {
    text-align: center;
}
</style>
