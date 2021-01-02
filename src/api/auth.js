import axios from '@/api/axios'

const register = credentials => {
    // credentials данные с формы
    return axios.post('/users', { user: credentials })
}

export default {
    register
}

//-----------
// API бекенда в таком виде передается запрос
// {user: {username: "bgbgb", email: "sadsd@dvvcv.ru", password: "sddsdsd"}}

// библиотека отправляет пост запрос в таком виде
// axios
//     .post('/user', {
//         firstName: 'Fred',
//         lastName: 'Flintstone'
//     })
//     .then(function(response) {
//         console.log(response)
//     })
//     .catch(function(error) {
//         console.log(error)
//     })
