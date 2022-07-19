import Axios from 'axios'

const request = Axios.create({
    baseURL: 'https://api.realworld.io/api'
})
export default request
