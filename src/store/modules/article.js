import articleApi from '@/api/article'

const state = {
    data: null,
    isLoading: false,
    errors: null
}

// создаём обёртки уникальности имён
export const mutationTypes = {
    getArticleStart: '[article] getArticleStart',
    getArticleSuccess: '[article] getArticleSuccess',
    getArticleFailure: '[article] getArticleFailure'
}

export const actionTypes = {
    getArticle: '[article] getArticle'
}

//-----------------------------------

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getArticleFailure](state, payload) {
        state.isLoading = false
        state.errors = payload
    }
}

const actions = {
    [actionTypes.getArticle](context, { slug }) {
        return new Promise(resolve => {
            // создаём промис
            context.commit(mutationTypes.getArticleStart, slug)
            articleApi
                .getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article) // одна статья
                    resolve(article)
                })
                .catch(e => {
                    context.commit(mutationTypes.getArticleFailure, e)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
