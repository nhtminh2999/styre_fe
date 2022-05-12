import { useQuery } from 'react-query'
import { projectService } from '../../service/Project.Service'

const useCurrentProject = id => {
  return useQuery('current-project', () => projectService.searchById(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1
  })
}

export { useCurrentProject }
