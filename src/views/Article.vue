<template>
    <div class="article-page">
        <div class="banner">
            <div class="container" v-if="article">
                <h1>{{ article.title }}</h1>
                <div class="article-meta">
                    <router-link
                        :to="{
                            name: 'userProfile',
                            params: { slug: article.author.username }
                        }"
                        ><img :src="article.author.image"
                    /></router-link>
                    <div class="info">
                        <router-link
                            :to="{
                                name: 'userProfile',
                                params: { slug: article.author.username }
                            }"
                            >{{ article.author.username }} /></router-link
                        >
                        <span class="data">{{ article.createdAt }}</span>
                    </div>
                    <span v-if="isAuthor">
                        <router-link
                            class="btn btn-outline-secondary btn-sm"
                            :to="{
                                name: 'editArticle',
                                params: { slug: article.slug }
                            }"
                            ><i class="ion-edit">Edit Article</i></router-link
                        >
                        <button
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteArticle"
                        >
                            <i class="ion-trash-a" />
                            Delete Article
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <div class="container page">
            <MvSpinner v-if="isLoading" />
            <MvError v-if="errors" />
            <div class="row article-content" v-if="article">
                <div class="col-xs-12">
                    <div>
                        <p>{{ article.body }}</p>
                    </div>
                    <MvTaglist :tagList="article.tagList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { actionTypes as articleActionTypes } from '@/store/modules/article'
import { mapState, mapGetters } from 'vuex'
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import MvSpinner from '@/components/Spinner'
import MvError from '@/components/Error'
import MvTaglist from '@/components/Taglist'

export default {
    name: 'MvArticle',
    mounted() {
        const slugArticle = this.$route.params.slug // получаем слаг с роута
        this.$store.dispatch(articleActionTypes.getArticle, {
            slug: slugArticle
        }) // кладем его в экшн
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            errors: state => state.article.errors,
            article: state => state.article.data
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser // получаем текущего пользователя
        }),
        isAuthor() {
            // являемся ли мы автором поста
            if (!this.currentUser || !this.article) {
                return false // если нет тек пользователя или статьи
            }
            return this.currentUser.username === this.article.author.username // если имя текущего пользователя равна имени автора статьи, то мы являемся пользователем
        }
    },
    components: {
        MvSpinner, // регистрируем импортированный компонент
        MvError,
        MvTaglist
    },
    methods: {
        deleteArticle() {
            this.$store
                .dispatch(articleActionTypes.deleteArticle, {
                    slug: this.$route.params.slug
                })
                .then(() => this.$router.push({ name: 'globalFeed' })) // перекидываем пользователя на главную страницу
        }
    }
}
</script>
