import axios from '@/api/axios'

const getArticle = (
    slug // получаем статью
) => axios.get(`/articles/${slug}`).then(response => response.data.article)

const deleteArticle = slug => axios.delete(`/articles/${slug}`) // удалем стать с соответствующим слагом

export default {
    getArticle,
    deleteArticle
}
