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
                    <span>
                        <router-link
                            class="btn btn-outline-secondary btn-sm"
                            :to="{
                                name: 'editArticle',
                                params: { slug: article.slug }
                            }"
                            ><i class="ion-edit">Edit Article</i></router-link
                        >
                        <button class="btn btn-outline-danger btn-sm">
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
                    TAGLIST
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { actionTypes } from '@/store/modules/article'
import { mapState } from 'vuex'
import MvSpinner from '@/components/Spinner'
import MvError from '@/components/Error'

export default {
    name: 'MvArticle',
    mounted() {
        const slugArticle = this.$route.params.slug // получаем слаг с роута
        this.$store.dispatch(actionTypes.getArticle, { slug: slugArticle }) // кладем его в экшн
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            errors: state => state.article.errors,
            article: state => state.article.data
        })
    },
    components: {
        MvSpinner, // регистрируем импортированный компонент
        MvError
    }
}
</script>
