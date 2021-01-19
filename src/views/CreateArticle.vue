<template>
    <div>
        <h1>Create article</h1>
        <mvArticleForm
            :initialValues="initialValues"
            :errors="validationErrors"
            :isSubmitting="isSubmitting"
            @articleSubmit="onSubmit"
        />
    </div>
</template>

<script>
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
            },
            validationErrors: null
        }
    },
    components: {
        MvArticleForm
    },
    methods: {
        onSubmit(data) {
            console.log('onSubmit in create Article', data)
        }
    }
}
</script>
