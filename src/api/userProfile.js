import axios from 'axios'

const getUserProfile = slug =>
    axios.get(`/profiles/${slug}`).then(response => response.data.profile)

export default {
    getUserProfile
}
