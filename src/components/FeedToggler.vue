<template>
    <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="isLoggedIn">
                <router-link
                    :to="{ name: 'yourFeed' }"
                    class="nav-link"
                    :class="{ active: routeName === 'yourFeed' }"
                    >You Feed</router-link
                >
            </li>
            <li class="nav-item">
                <router-link
                    :to="{ name: 'globalFeed' }"
                    class="nav-link"
                    :class="{ active: routeName === 'globalFeed' }"
                    >GlobalFeed</router-link
                >
            </li>
            <li class="nav-item" v-if="tagName">
                <router-link
                    :to="{ name: 'tag' }"
                    class="nav-link"
                    :class="{ active: routeName === 'tag' }"
                    ><i class="ion-pound" />{{ tagName }}</router-link
                >
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '@/store/modules/auth'

export default {
    name: 'MvFeedToggler',
    props: {
        tagName: {
            type: String,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            // проверяем залогинен ли пользователь
            isLoggedIn: getterTypes.isLoggedIn
        }),
        routeName() {
            // возвращаем имя роутинга
            return this.$route.name
        }
    }
}
</script>
