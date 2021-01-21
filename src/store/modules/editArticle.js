import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
}

// Обёртки для названий мутаций
export const mutationTypes = {
    // редактирование статьи
    updateArticleStart: '[updateArticle] Update article start',
    updateArticleSuccess: '[updateArticle] Update article success',
    updateArticleFailure: '[updateArticle] Update article failure',

    // получние статьи
    getArticleStart: '[updateArticle] Get article start',
    getArticleSuccess: '[updateArticle] Get article success',
    getArticleFailure: '[updateArticle] Get article failure'
}

export const actionTypes = {
    updateArticle: '[updateArticle] Update article',
    getArticle: '[updateArticle] Get article'
}
//=====================================================

const mutations = {
    [mutationTypes.updateArticleStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.updateArticleSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.updateArticleFailure](state) {
        state.isSubmitting = false
        state.validationErrors = null
    },

    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.article = payload
    },
    [mutationTypes.getArticleFailure](state) {
        state.isLoading = false
    }
}

const actions = {
    [actionTypes.updateArticle](context, { slug, articleInput }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateArticleStart)
            articleApi
                .updateArticle(slug, articleInput)
                .then(article => {
                    context.commit(mutationTypes.updateArticleSuccess, article)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.updateArticleFailure,
                        result.response.data.errors
                    )
                })
        })
    },
    [actionTypes.getArticle](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart)
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}
