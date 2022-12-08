import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    'https://passvault-84995-default-rtdb.asia-southeast1.firebasedatabase.app',
  withCredentials: false,
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const getIcons = (obj, index, arr) => {
  if (arr.length == 1) return true
  if (obj.sizes || obj.type) {
    return (
      index ===
      arr.findIndex((value) => {
        if (value.sizes === obj.sizes) {
          return true
        }
      })
    )
  }
}

export default {
  getAccounts() {
    return apiClient.get('/acct.json')
  },
  getAccount(id) {
    return apiClient.get(`acct/${id}.json`)
  },
  deleteAccount(id) {
    return apiClient.delete(`acct/${id}.json`)
  },
  storeAccount(account) {
    return apiClient.post('/acct.json', account)
  },
  updateAccount(id, data) {
    return apiClient.patch(`acct/${id}.json`, data)
  },
  getFavicon(domain) {
    return axios
      .get(`https://favicongrabber.com/api/grab/${domain}`)
      .then((res) => res.data.icons.filter(getIcons))
  },
}
