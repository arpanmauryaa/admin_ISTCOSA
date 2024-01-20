import {api} from './index'
import {path} from './endPoint'

// api for login
export const postAccount = async (loginData)=>{
    const url = await api.post(path.Account , loginData )
    return url?.data
}

// api for get batch years
export const getBatch = async ()=>{
    const url = await api.get(path.Batch )
    return url?.data
}

// api for post batch years
export const addBatch = async (data) =>{
    const url = await api.post(path.Batch , data)
}

// api for delete batch years
export const deletebatch = async (id) =>{
    const url = await api.delete(path.Batch + `/${id}`) 
}



