// Это делалось для того, чтобы локал сторидж мог работаь и с объектами и массивами
// то есть мы созадли своего рода оёртку

export const getItem = key => {
    try {
        return JSON.parse(localStorage.getItem(key)) // парсим данные с локалсториджа
    } catch (e) {
        console.log('Error getting data from localStorage', e)
        return null
    }
}

export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.log('Error saving data from localStorage', e)
    }
}
