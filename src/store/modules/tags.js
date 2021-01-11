import tagsApi from '@/api/tags'

const state = {
    data: null,
    isLoading: false,
    errors: null
}

// создаём обёртки уникальности имён
export const mutationTypes = {
    getTagsStart: '[tags] getTagsStart',
    getTagsSuccess: '[tags] getTagsSuccess',
    getTagsFailure: '[tags] getTagsFailure'
}

export const actionTypes = {
    getTags: '[tags] getTags'
}

//-----------------------------------

const mutations = {
    [mutationTypes.getTagsStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getTagsSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getTagsFailure](state, payload) {
        state.isLoading = false
        state.errors = payload
    }
}

const actions = {
    [actionTypes.getTags](context, { apiUrl }) {
        return new Promise(resolve => {
            // создаём промис
            context.commit(mutationTypes.getTagsStart)
            tagsApi
                .getTags(apiUrl)
                .then(response => {
                    context.commit(
                        mutationTypes.getTagsSuccess,
                        response.data.tags // тут именно бросаем массив тегов в стейт
                    )
                    resolve(response.data)
                })
                .catch(e => {
                    context.commit(mutationTypes.getTagsFailure, e)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
