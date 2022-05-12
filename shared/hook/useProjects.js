import { useQuery } from 'react-query'
import { projectService } from '../../service/Project.Service'

function useProjects(page, limit, value) {
  return useQuery(['search-projects', { page, limit, value }], () => projectService.search({ page, limit, value }), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1
  })
}

export { useProjects }
