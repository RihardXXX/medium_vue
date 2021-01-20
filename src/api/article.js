import axios from '@/api/axios'

const getArticle = (
    slug // получаем статью
) => axios.get(`/articles/${slug}`).then(response => response.data.article)

const deleteArticle = slug => axios.delete(`/articles/${slug}`) // удалем стать с соответствующим слагом

// вызов метода создания поста
const createArticle = articleInput =>
    axios
        .post('/articles', { article: articleInput })
        .then(response => response.data.article)

export default {
    getArticle,
    deleteArticle,
    createArticle
}
