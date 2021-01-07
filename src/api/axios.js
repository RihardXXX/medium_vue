import axios from 'axios'
import { getItem } from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// щас напишем мидлвере между отправкой запроса и самим запросом промежуточная фигня короче говоря
axios.interceptors.request.use(config => {
    const token = getItem('accessToken') // получаем токен из локалсториджа
    const authorizationToken = token ? `Token ${token}` : '' // формируем токен в виде строки
    config.headers.Authorization = authorizationToken // положили в хедеры токен
    return config
})

export default axios
