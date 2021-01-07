<template>
    <div>
        <MvTopbar />
        <router-view />
    </div>
</template>

<script>
import MvTopbar from '@/components/Topbar'
import { actionTypes } from '@/store/modules/auth'

export default {
    name: 'MvApp',
    components: {
        MvTopbar
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser)
    }
}
</script>
