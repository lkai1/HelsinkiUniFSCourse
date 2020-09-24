import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const object = { content }
    const response = await axios.post(baseUrl, object)
    return response.data
}
const vote = async (id) => {
    const response = await axios.get(baseUrl)
    const anecdote = response.data.find(e => e.id === id)
    console.log(anecdote)
    anecdote.votes += 1
    await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}
export default { getAll, createNew, vote }