
import { api } from '../api/index'
import { path } from '../api/endPoint'

// Get Roll Number
export const rollnumbergetbatch = async () => {
    const url = await api.get(path.RollNumberGetBatch)
    return url?.data
}

// Get RollNumber By Batch 
export const getrollnumberbybatch = async (batch) => {
    const url = await api.get(path.GetRollNumberByBatch + batch)
    return url?.data
}

// marge Roll Number Post Batch
export const rollnumberpostbatch = async (addBatch) => {
    const url = await api.post(path.RollNuberPostBatch, addBatch)
    return url?.data
}

// Delete Roll Number
export const deleterollNumber = async (id ) => {
    const url = await api.delete(path.DeleteRollNumber  + id)
    return url?.data
}
