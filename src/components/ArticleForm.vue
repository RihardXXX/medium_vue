<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <MvValidationErrors
                        v-if="errors"
                        :validationErrors="errors"
                    />
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control
                                form-control-lg"
                                    placeholder="Article title"
                                    v-model="title"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control
                                form-control-lg"
                                    placeholder="Description"
                                    v-model="description"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    type="text"
                                    class="form-control
                                form-control-lg"
                                    placeholder="What is this article about"
                                    v-model="body"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control
                                form-control-lg"
                                    placeholder="Enter tags"
                                    v-model="tagList"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <button
                                    type="submit"
                                    class="btn bnt-lg pull-xs-right btn-primary"
                                    :disable="isSubmitting"
                                >
                                    Published article
                                </button>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MvValidationErrors from '@/components/ValidationErrors'

export default {
    name: 'MvArticleForm',
    components: {
        MvValidationErrors
    },
    props: {
        initialValues: {
            type: Object,
            required: true
        },
        errors: {
            type: Object,
            reguired: false
        },
        isSubmitting: {
            type: Boolean,
            reguired: true
        }
    },
    data() {
        return {
            title: '',
            description: '',
            body: '',
            tagList: ''
        }
    },
    methods: {
        onSubmit() {
            // собираем данные с форм и отправляем и вызываем их у метода родителя
            const form = {
                title: this.title,
                description: this.description,
                body: this.body,
                tagList: this.tagList.split(' ') // строку в массив
            }
            this.$emit('articleSubmit', form)
        }
    }
}
</script>
