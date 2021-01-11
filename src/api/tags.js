import axios from '@/api/axios'

const getTags = apiUrl => {
    return axios.get(apiUrl)
}

export default {
    getTags
}
