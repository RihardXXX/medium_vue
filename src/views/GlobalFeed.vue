<template>
    <div class="home-page">
        BANNER
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <MvFeed :apiUrl="apiUrl" />
                </div>
                <div class="col-md-3">
                    <h3>POPULAR TAGS</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MvFeed from '@/components/Feed'

export default {
    name: 'MvGlobalFeed',
    components: {
        MvFeed // регистрируем импортированный компонент
    },
    data() {
        return {
            // ту мы храним данные
            apiUrl: '/articles'
        }
    }
}
</script>
