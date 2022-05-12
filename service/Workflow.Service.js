import axiosClient from './axiosClient'

class WorkflowService {
  constructor() {}

  create = model => {
    return axiosClient.post('/workflow/create', model)
  }

  search = params => {
    return axiosClient.get('/workflow/search', { params })
  }

  update = id => {
    return axiosClient.delete(`/workflow/update/${id}`)
  }
}

const workflowService = new WorkflowService()
export { workflowService }
