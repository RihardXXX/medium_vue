<template>
    <div>
        <h3>FEED</h3>
        <p>{{ apiUrl }}</p>
    </div>
</template>

<script>
import { actionTypes } from '@/store/modules/feed'

export default {
    name: 'MvFeed',
    props: {
        apiUrl: {
            // указываем тип пропсов и их обязательность
            type: String,
            required: true
        }
    },
    mounted() {
        // метод который запускается при нициализации компонента
        this.$store.dispatch(actionTypes.getFeed, { apiUrl: this.apiUrl })
    }
}
</script>
