<template>
    <mvArticleForm
        :initialValues="initialValues"
        :errors="validationErrors"
        :isSubmitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
</template>

<script>
import { mapState } from 'vuex'
import { actionTypes } from '@/store/modules/createArticle'
import MvArticleForm from '@/components/ArticleForm'

export default {
    name: 'MvCreateArticle',
    data() {
        return {
            initialValues: {
                title: '',
                description: '',
                body: '',
                tagList: []
            }
        }
    },
    components: {
        MvArticleForm
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.createArticle.isSubmitting,
            validationErrors: state => state.createArticle.validationErrors
        })
    },
    methods: {
        onSubmit(articleInput) {
            this.$store
                .dispatch(actionTypes.createArticle, { articleInput })
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
