import { api } from "..";
import { path } from '../endPoint'


export const registereduser = async (redioValue) => {
    const url = await api.get(path.User + `${redioValue}&page=1`)
    return url?.data
}

export const allUser = async (search) => {
    const url = await api.get(path.UserSearch + search)
    return url?.data
}