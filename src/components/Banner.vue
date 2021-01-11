<template>
    <div class="m-banner">
        <img src="@/assets/medium.png" />
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
.m-banner {
    text-align: center;
}

.m-banner img {
    width: 150px;
    height: 150px;
}
</style>
