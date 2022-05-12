import axiosClient from './axiosClient'

class ProjectService {
  constructor() {}

  create = model => {
    return axiosClient.post('/project/create', model)
  }

  search = params => {
    return axiosClient.get('/project/search', { params })
  }

  searchById = id => {
    return axiosClient.get(`/project/search/${id}`)
  }

  remove = id => {
    return axiosClient.delete(`/project/remove/${id}`)
  }
}

const projectService = new ProjectService()
export { projectService }
