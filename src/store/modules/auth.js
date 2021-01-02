import authApi from '@/api/auth'

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

const mutations = {
    registerStart(state) {
        // старт запроса
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload) {
        // успешный ответ от сервера
        state.isSubmitting = false
        state.currentUser = payload // данные кладём в состояние текущего пользователя
        state.isLoggedIn = true
    },
    registerFailure(state, payload) {
        // ошибка с сервера
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi
                .register(credentials)
                .then(response => {
                    context.commit('registerSuccess', response.data.user) // отправляем данные текущего юзера в мутации
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        'registerFailure',
                        result.response.data.errors // ошибки с бекенда
                    )
                })
        })

        // setTimeout(() => {
        //     context.commit('registerStart')
        // }, 2000)
    }
}

export default {
    state,
    mutations,
    actions
}
