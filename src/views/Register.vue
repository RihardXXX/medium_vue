<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign UP</h1>
                    <p class="text-xs-center">
                        <router-link :to="{ name: 'login' }"
                            >Need an account?</router-link
                        >
                    </p>
                    <MvValidationErrors
                        v-if="validationErrors"
                        :validationErrors="validationErrors"
                    />
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                            <input
                                type="text"
                                class="form-control
                            form-control-lg"
                                placeholder="Username"
                                v-model="username"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                type="text"
                                class="form-control
                            form-control-lg"
                                placeholder="Email"
                                v-model="email"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                type="password"
                                class="form-control
                            form-control-lg"
                                placeholder="Password"
                                v-model="password"
                            />
                        </fieldset>
                        <button
                            class="btn btn-lg btn-primary pull-xs-right"
                            :disabled="isSubmitting"
                        >
                            Sig Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MvValidationErrors from '@/components/ValidationErrors'

export default {
    name: 'MvRegister',
    components: {
        MvValidationErrors // регистрация другого компонента внутри
    },
    data() {
        return {
            email: '', // регистрация полей форм
            password: '',
            username: ''
        }
    },
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting // данные из state
        },
        validationErrors() {
            // вовзращаем данные из state
            return this.$store.state.auth.validationErrors
        }
    },
    methods: {
        onSubmit() {
            this.$store // запускаем экшены
                .dispatch('register', {
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                .then(user => {
                    console.log('successfully register user', user)
                    this.$router.push({ name: 'home' })
                })
        }
    }
}
</script>
