<template>
    <div class="settings-page" v-if="currentUser">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Settings</h1>
                    <MvValidationErrors
                        v-if="validationErrors"
                        :validationErrors="validationErrors"
                    />
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    v-model="form.image"
                                    placeholder="URL of profile picture"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    v-model="form.username"
                                    placeholder="Username"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    class="form-control form-control-lg"
                                    v-model="form.bio"
                                    placeholder="biografia"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="email"
                                    class="form-control form-control-lg"
                                    v-model="form.email"
                                    placeholder="email"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="password"
                                    class="form-control form-control-lg"
                                    v-model="form.password"
                                    placeholder="password"
                                />
                            </fieldset>
                            <button
                                type="submit"
                                class="btn btn-lg btn-primary pull-xs-right"
                                :disabled="isSubmitting"
                            >
                                Update settings
                            </button>
                        </fieldset>
                    </form>
                    <hr />
                    <button
                        class="btn btn-outline-danger"
                        type="text"
                        @click="logout"
                    >
                        or click here to logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import MvValidationErrors from '@/components/ValidationErrors'
import { actionTypes as authActionTypes } from '@/store/modules/auth'

export default {
    name: 'MvSettings',
    components: {
        MvValidationErrors
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.setting.isSubmitting,
            validationErrors: state => state.setting.validationErrors
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser
        }),
        form() {
            // получаем данные из состояние
            return {
                username: this.currentUser.username,
                bio: this.currentUser.bio,
                image: this.currentUser.image,
                email: this.currentUser.email
                // password: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(authActionTypes.updateCurrentUser, {
                currentUserInput: this.form
            })
        },
        logout() {
            this.$store
                .dispatch(authActionTypes.logout)
                .then(() => this.$router.push({ name: 'globalFeed' }))
        }
    }
}
</script>
