import { api } from "..";
import { path } from '../endPoint'



export const qualification = async () => {
    const url = await api.get(path.Qualification)
    return url?.data
}

export const qualificationPost = async (data) => {
    const url = await api.post(path.Qualification , data)
    return url?.data
}

export const qualificationDelete = async (id) => {
    const url = await api .delete(path.Qualification + id)
    return url ?.data
}

export const qualificationUpdate = async (id , QualificationData) => {
    const url = await api .put(path.Qualification + id ,QualificationData)
    return url ?.data
}