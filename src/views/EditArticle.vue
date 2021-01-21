<template>
    <div>
        <MvSpinner v-if="isLoading" />
        <mvArticleForm
            v-if="initialValues"
            :initialValues="initialValues"
            :errors="validationErrors"
            :isSubmitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/editArticle'
import MvArticleForm from '@/components/ArticleForm'
import MvSpinner from '@/components/Spinner'

export default {
    name: 'MvEditArticle',
    components: {
        MvArticleForm,
        MvSpinner
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.editArticle.isSubmitting,
            validationErrors: state => state.editArticle.validationErrors,
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article
        }),
        initialValues() {
            if (!this.article) {
                // если состояние статьи пустое
                return null
            }
            // если в состоянии есть статья
            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList: this.article.tagList
            }
        }
    },
    mounted() {
        // при инициализации компонента получаем статью
        this.$store.dispatch(actionTypes.getArticle, {
            slug: this.$route.params.slug
        })
    },
    methods: {
        onSubmit(articleInput) {
            const slug = this.$route.params.slug // берем данные с роута
            this.$store
                .dispatch(actionTypes.updateArticle, { slug, articleInput })
                .then(article => {
                    this.$router.push({
                        name: 'article',
                        params: { slug: article.slug }
                    })
                })
        }
    }
}
</script>
