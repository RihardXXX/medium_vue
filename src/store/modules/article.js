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
    getArticleFailure: '[article] getArticleFailure',

    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
    deleteArticleFailure: '[article] deleteArticleFailure'
}

export const actionTypes = {
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle'
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
    },

    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailure]() {}
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
    },
    [actionTypes.deleteArticle](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticleStart, slug)
            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSuccess)
                    resolve()
                })
                .catch(() => context.commit(mutationTypes.deleteArticleFailure))
        })
    }
}

export default {
    state,
    mutations,
    actions
}
