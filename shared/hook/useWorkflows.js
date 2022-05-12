import { useQuery } from 'react-query'
import { workflowService } from '../../service/Workflow.Service'

function useWorkflows(projectKey) {
  return useQuery(['search-workflows', { projectKey }], () => workflowService.search({ projectKey }), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1
  })
}

export { useWorkflows }
