import { api } from '..'
import { path } from '../endPoint'


export const getcompany = async () => {
    const url = await api.get(path.Company)
    return url?.data
}

export const deletecompany = async (id) => {
    const url = await api.delete(path.Company+ '/' + id)
    return url?.data
}

export const getcountry = async () => {
    const url = await api.get(path.GetCountry)
    return url?.data
}

export const getbystate = async (countryID) => {
    const url = await api.get(path.GetByState + countryID)
    return url?.data
}

export const getbycity = async (cityID) => {
    const url = await api.get(path.GetByCity + cityID)
    return url?.data
}

export const postcompany = async (addCompany) => {
    const url = await api.post(path.Company ,addCompany)
    return url?.data
}

export const updatecompany = async (id,updateCompany) => {
    const url = await api.put(path.Company + id , updateCompany)
    return url?.data
}

export const getindustry = async () => {
    const url = await api.get(path.IndustryType)
    return url?.data
}







