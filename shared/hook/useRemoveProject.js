import { useMutation, useQueryClient } from 'react-query'
import { projectService } from '../../service/Project.Service'

function useRemoveProject(page, limit, value) {
  const queryClient = useQueryClient()
  return useMutation(id => projectService.remove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['search-projects', { page, limit, value }])
    }
  })
}

export { useRemoveProject }
