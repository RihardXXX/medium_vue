import addToFavoritesApi from '@/api/addToFavorites'

export const mutationTypes = {
    addToFavoritesStart: '[`addToFavorites] add to favorites start',
    addToFavoritesSuccess: '[`addToFavorites] add to favorites success',
    addToFavoritesFailure: '[`addToFavorites] add to favorites failure'
}

export const actionTypes = {
    addToFavorites: '[addToFavorites] add to favorites'
}

const mutations = {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSuccess]() {},
    [mutationTypes.addToFavoritesFailure]() {}
}

const actions = {
    [actionTypes.addToFavorites](context, { slug, isFavorited }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.addToFavoritesStart)

            const promise = isFavorited
                ? addToFavoritesApi.removeFromFavorites(slug)
                : addToFavoritesApi.addToFavorites(slug)

            promise
                .then(article => {
                    context.commit(mutationTypes.addToFavoritesSuccess)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.addToFavoritesFailure)
                })
        })
    }
}

export default {
    actions,
    mutations
}
