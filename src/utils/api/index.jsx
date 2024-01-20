import axios from 'axios'

export const api = axios.create({
    // baseURL: 'http://new.istcosa.com/api',
    baseURL: 'http://dev-softwiz-002',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})