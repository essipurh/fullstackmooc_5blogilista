import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return `Bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create }