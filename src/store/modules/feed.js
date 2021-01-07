import feedApi from '@/api/feed'

const state = {
    data: null,
    isLoading: false,
    errors: null
}

// Это обёртки для уникальности имён
export const mutationTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSuccess: '[feed] getFeedSuccess',
    getFeedFailure: '[feed] getFeedFailure'
}

export const actionTypes = {
    getFeed: '[feed] getFeed'
}

export const getterTypes = {}
//---------------------------------

const getters = {}

const mutations = {
    [mutationTypes.getFeedStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getFeedSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getFeedFailure](state, payload) {
        state.isLoading = false
        state.errors = payload
    }
}

const actions = {
    [actionTypes.getFeed](context, { apiUrl }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getFeedStart) //  стартуем мутации
            feedApi
                .getFeed(apiUrl) // делаем гет запрос
                .then(res => {
                    // успех
                    context.commit(mutationTypes.getFeedSuccess, res.data)
                    resolve(res.data) // если в компон понадобится
                })
                .catch(e => {
                    // неудача
                    context.commit(mutationTypes.getFeedFailure, e)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
