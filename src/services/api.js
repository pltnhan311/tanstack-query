import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getUsersIds = async () => {
  return (await axiosInstance.get('/users')).data.map((item) => item.id)
}

export const getUser = async (id) => {
  return (await axiosInstance.get(`/users/${id}`)).data
}

export const createUser = async (data) => {
  return await axiosInstance.post('/users', {
    name: data.name,
    email: data.email
  })
}
