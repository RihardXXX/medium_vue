import userProfileApi from '@/api/userProfile'

const state = {
    data: null,
    isLoading: false,
    errors: null
}

// создаём обёртки уникальности имён
export const mutationTypes = {
    getUserProfileStart: '[userProfile] get user profile Start',
    getUserProfileSuccess: '[userProfile] get user profile Success',
    getUserProfileFailure: '[userProfile] get user profile Failure'
}

export const actionTypes = {
    getUserProfile: '[userProfile] get user profile'
}

//-----------------------------------

const mutations = {
    [mutationTypes.getUserProfileStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getUserProfileFailure](state, payload) {
        state.isLoading = false
        state.errors = payload
    }
}

const actions = {
    [actionTypes.getUserProfile](context, { slug }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getUserProfileStart)
            userProfileApi
                .getUserProfile(slug)
                .then(userProfile => {
                    context.commit(
                        mutationTypes.getUserProfileSuccess,
                        userProfile
                    )
                    resolve(userProfile)
                })
                .catch(() => {
                    context.commit(mutationTypes.getUserProfileFailure)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
