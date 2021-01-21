import axios from '@/api/axios'

// получаем статью
const getArticle = slug =>
    axios.get(`/articles/${slug}`).then(response => response.data.article)

const deleteArticle = slug => axios.delete(`/articles/${slug}`) // удалем стать с соответствующим слагом

// вызов метода создания поста
const createArticle = articleInput =>
    axios
        .post('/articles', { article: articleInput })
        .then(response => response.data.article)

// редактирование статьи
const updateArticle = (slug, articleInput) =>
    axios
        .put(`/articles/${slug}`, articleInput)
        .then(response => response.data.article)

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle
}
