<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign In</h1>
                    <p class="text-xs-center">
                        <router-link :to="{ name: 'register' }"
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
                            Sig in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MvValidationErrors from '@/components/ValidationErrors'
import { actionTypes } from '@/store/modules/auth'

export default {
    name: 'MvLogin',
    components: {
        MvValidationErrors // регистрация другого компонента внутри
    },
    data() {
        return {
            email: '', // регистрация полей форм
            password: ''
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.auth.isSubmitting,
            validationErrors: state => state.auth.validationErrors
        })
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch(actionTypes.login, {
                    email: this.email,
                    password: this.password
                })
                .then(() => {
                    this.$router.push({ name: 'globalFeed' })
                })
        }
    }
}
</script>
