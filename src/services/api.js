import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getUsersIds = async () => {
  return (await axiosInstance.get('/users')).data.map((item) => item.id)
}

export const getUser = async (id) => {
  return await axiosInstance.get(`/users/${id}`)
}

export const createUser = async (data) => {
  await axiosInstance.post('/users', data)
}

export const updateUser = async (data) => {
  await axiosInstance.put(`/users/${data.id}`, data)
}

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/users/${id}`)
}

export const getProjects = async (page) => {
  const res = await axiosInstance.get(`/projects?_page=${page}&_per_page=3`)
  console.log(res.data)
  return res.data
  // return await axiosInstance.get(`projects?_page=${page}&_limit=3`)
}
