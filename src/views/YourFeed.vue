<template>
    <div class="home-page">
        <MvBanner />
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <MvFeedToggler />
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
    name: 'MvYourFeed',
    components: {
        // регистрируем импортированный компонент
        MvFeed,
        MvTags,
        MvBanner,
        MvFeedToggler
    },
    data() {
        return {
            // ту мы храним данные
            apiUrl: '/articles/feed'
        }
    }
}
</script>
