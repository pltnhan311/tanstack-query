import axios from 'axios'

const BASE_URL = 'http://localhost:4000'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const deleteFood = async (id) => {
  await axiosInstance.delete(`/foods/${id}`)
}

export const updateFood = async (data) => {
  await axiosInstance.put(`/foods/${data.id}`, data)
}

export const getFoodsIds = async () => {
  return (await axiosInstance.get('/foods')).data.map((item) => item.id)
}

export const getFood = async (id) => {
  const res = await axiosInstance.get(`/foods/${id}`)
  console.log(res.data)
  return res.data
}

export const getFoodsPaginated = async (page = 1) => { 
  const res = await axiosInstance.get(`foods?_page=${page}&_per_page=4`)
  console.log(res.data)
  return res.data
}

export const getFoods = async ({ pageParam }) => {
  const res = await axiosInstance.get(`/foods?_page=${pageParam + 1}&_per_page=4`)
  console.log(res.data)
  return res.data
}

export const createFood = async (data) => {
  const res = await axiosInstance.post('/foods', data)
  console.log(res.data)
  return res.data
}

export const getTodoList = async () => {
  const res = await axiosInstance.get('/todos')
  // console.log(res.data)
  return res.data
}

export const createTodo = async (data) => {
  const res = await axiosInstance.post('/todos/add', data)
  console.log(res.data)
  return res.data
}
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

export const getProjects = async (page = 1) => {
  return await (axiosInstance.get(`projects?_page=${page}&_per_page=3`))
}

export const getProducts = async ({ pageParam }) => {
  const res = await axiosInstance.get(`/products?_page=${pageParam + 1}&_per_page=3`)
  return res.data
}

export const getProduct = async (id) => {
  return (await axiosInstance.get(`/products/${id}`)).data
}
