import authApi from '@/api/auth'
import { setItem } from '@/helpers/persistanceStorage'

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
                    setItem('accessToken', response.data.user.token) // сохраняем токен авторизации в локал сторидж
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(
                        'registerFailure',
                        result.response.data.errors // ошибки с бекенда
                    )
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
