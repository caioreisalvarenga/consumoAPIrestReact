import axios from 'axios'

const API = axios.create({
  baseURL: 'https://apislhubclient.dev.slhub.com.br/api/viagem',
  headers: {
    'api-token': '2f4c6f15-970d-4a8e-aa99-8daaa6801112'
  }
})

export const fetchViagens = async (params) => {
  const res = await API.get('', { params })
  return res.data
}
