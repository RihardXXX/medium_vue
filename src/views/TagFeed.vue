<template>
    <div class="home-page">
        <MvBanner />
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <MvFeed :apiUrl="apiUrl" />
                </div>
                <div class="col-md-3">
                    <MvTags />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MvFeed from '@/components/Feed'
import MvTags from '@/components/Tags'
import MvBanner from '@/components/Banner'

export default {
    name: 'MvTagFeed',
    components: {
        // регистрируем импортированный компонент
        MvFeed,
        MvTags,
        MvBanner
    },
    computed: {
        tagName() {
            return this.$route.params.slug
        },
        apiUrl() {
            return `/articles?tag=${this.tagName}`
        }
    }
}
</script>
