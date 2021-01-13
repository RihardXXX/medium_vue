<template>
    <div class="banner">
        <img src="@/assets/medium.png" />
        <h2>Medium</h2>
    </div>
</template>

<script>
export default {
    name: 'MvBanner',
    data() {
        return {
            path: '@/assets/medium.png'
        }
    }
}
</script>

<style>
.banner {
    text-align: center;
}

.banner img {
    width: 120px;
    height: 120px;
    border-radius: 5px;
}
</style>
