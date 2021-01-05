<template>
    <div>
        <MvTopbar />
        <router-view />
    </div>
</template>

<script>
import MvTopbar from '@/components/Topbar'

export default {
    name: 'MvApp',
    components: {
        MvTopbar
    }
}
</script>
