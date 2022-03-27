import axios from 'axios'

const apiUrl = 'https://localhost:44372/api'
export default {
  get(url) {
    url = apiUrl + url
    return axios.get(url)
  },
  // eslint-disable-next-line no-dupe-keys
  get(url, params) {
    url = apiUrl + url
    return axios.get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  post(url, data) {
    url = apiUrl + url
    return axios.post(url, data)
  },
}
