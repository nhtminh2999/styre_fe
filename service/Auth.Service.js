import axiosClient from './axiosClient'

class AuthService {
  constructor() {}

  register = model => {
    return axiosClient.post('/auth/register', model)
  }

  login = model => {
    return axiosClient.post('/auth/login', model)
  }

  validate = () => {
    return axiosClient.get('/auth/validate')
  }
}

const authService = new AuthService()
export { authService }
