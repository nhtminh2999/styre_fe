import axiosClient from './axiosClient'

class UserService {
  constructor() {}

  me = () => {
    return axiosClient.get('/user/me')
  }
}

const userService = new UserService()
export { userService }
