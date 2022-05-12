import { useQuery } from 'react-query'
import { userService } from '../../service/User.Service'

const useCurrentUser = () => {
  return useQuery('current-user', userService.me, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000,
    cacheTime: 0
  })
}

export { useCurrentUser }
