import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: function (params) {
    return queryString.stringify(params, { arrayFormat: 'comma' })
  }
})

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // // Any status codes that falls outside the range of 2xx cause this function to trigger
    // // Do something with response error
    // const originalConfig = error.config
    // if (error.response) {
    //   if (error.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true
    //     // Do something, call refreshToken() request for example;
    //     // return a request
    //     return axiosClient(config)
    //   }
    //   return Promise.reject(error.response.data)
    // }
    return Promise.reject(error)
  }
)

export default axiosClient
