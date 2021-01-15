<template>
    <div class="home-page">
        <MvBanner />
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <MvFeedToggler :tagName="tagName" />
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
import MvFeedToggler from '@/components/FeedToggler'

export default {
    name: 'MvTagFeed',
    components: {
        // регистрируем импортированный компонент
        MvFeed,
        MvTags,
        MvBanner,
        MvFeedToggler
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
