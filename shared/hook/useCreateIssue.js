import { useMutation, useQueryClient } from 'react-query'
import { issueService } from '../../service/Issue.Service'

function useCreateIssue(projectKey) {
  const queryClient = useQueryClient()
  return useMutation(issue => issueService.create(issue), {
    onSuccess: () => {
      console.log('dfds')
      queryClient.invalidateQueries(['search-workflows', { projectKey }])
    }
  })
}

export { useCreateIssue }
