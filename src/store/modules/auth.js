import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

// Это просто обёртки для уникальности имён в мутациях экшенах  и гетерах
//-----------------------------------
export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

    logout: '[auth] logout'
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
    logout: '[auth] logout'
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}
//------------------------------------

const getters = {
    [getterTypes.currentUser]: state => state.currentUser,
    [getterTypes.isLoggedIn]: state => Boolean(state.isLoggedIn),
    [getterTypes.isAnonymous]: state => state.isLoggedIn === false
}

const mutations = {
    [mutationTypes.registerStart](state) {
        // старт запроса
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
        // успешный ответ от сервера
        state.isSubmitting = false
        state.currentUser = payload // данные кладём в состояние текущего пользователя
        state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, payload) {
        // ошибка с сервера
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.loginStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },

    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure](state, payload) {
        state.validationErrors = payload
    },

    [mutationTypes.logout](state) {
        state.currentUser = null
        state.isLoggedIn = false
    }
}

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi
                .register(credentials)
                .then(response => {
                    context.commit(
                        mutationTypes.registerSuccess,
                        response.data.user
                    ) // отправляем данные текущего юзера в мутации
                    setItem('accessToken', response.data.user.token) // сохраняем токен авторизации в локал сторидж
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.registerFailure,
                        result.response.data.errors // ошибки с бекенда
                    )
                })
        })
    },
    [actionTypes.login](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi
                .login(credentials)
                .then(response => {
                    context.commit(
                        mutationTypes.loginSuccess,
                        response.data.user
                    )
                    setItem('accessToken', response.data.user.token) // сохраняем токен авторизации в локал сторидж
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        mutationTypes.loginFailure,
                        result.response.data.errors
                    )
                })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi
                .getCurrentUser()
                .then(response => {
                    context.commit(
                        mutationTypes.getCurrentUserSuccess,
                        response.data.user
                    )
                    resolve(response.data.user)
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure)
                })
        })
    },
    [actionTypes.updateCurrentUser](context, { currentUserInput }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateCurrentUserStart)
            authApi
                .updateCurrentUser(currentUserInput)
                .then(user => {
                    context.commit(mutationTypes.updateCurrentUserSuccess, user)
                    resolve(user)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateCurrentUserFailure),
                        result.response.data.errors
                })
        })
    },
    [actionTypes.logout](context) {
        return new Promise(resolve => {
            setItem('accessToken', '')
            context.commit(mutationTypes.logout)
            resolve()
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
