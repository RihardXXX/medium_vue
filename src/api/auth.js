import axios from '@/api/axios'

const register = credentials => {
    // запрос на регистрацию
    return axios.post('/users', { user: credentials })
}

const login = credentials => {
    // запрос на вход
    return axios.post('/users/login', { user: credentials })
}

export default {
    register,
    login
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
