import axios from 'axios'
import { firebase } from '../firebase'

const authAxios = axios.create({})

authAxios.interceptors.request.use(config => {
  if (!firebase.auth.currentUser) {
    return config
  }

  return firebase.auth.currentUser.getIdToken(true)
    .then(token => {
      config.headers['Authorization'] = 'Bearer ' + token
      return config
    })
}, err => {
  console.log('interceptor err: ', err)
  Promise.reject(err)
})

export default authAxios