import { useMutation, useQueryClient } from 'react-query'
import { projectService } from '../../service/Project.Service'

function useCreateProject(page, limit, value) {
  const queryClient = useQueryClient()
  return useMutation(project => projectService.create(project), {
    onSuccess: () => {
      queryClient.invalidateQueries(['search-projects', { page, limit, value }])
    }
  })
}

export { useCreateProject }
