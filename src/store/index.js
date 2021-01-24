import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import tags from '@/store/modules/tags'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'
import editArticle from '@/store/modules/editArticle'
import setting from '@/store/modules/setting'
import addToFavorites from '@/store/modules/addToFavorites'

Vue.use(Vuex) // коннектим вью к вьюикс

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        feed,
        tags,
        article,
        createArticle,
        editArticle,
        setting,
        addToFavorites
    }
})
