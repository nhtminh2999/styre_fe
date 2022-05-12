import axiosClient from './axiosClient'

class IssueService {
  constructor() {}

  create = model => {
    return axiosClient.post('/issue/create', model)
  }
}

const issueService = new IssueService()
export { issueService }
