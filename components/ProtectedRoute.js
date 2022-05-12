import { useRouter } from 'next/router'
import { useCurrentUser } from '../shared/hook/useCurrentUser'

function ProtectedRoute({ children }) {
  const router = useRouter()
  const { data, isLoading, error } = useCurrentUser()
  if (isLoading) return <div></div>

  if (error || (data && data?.message !== 'SUCCESS')) router.replace('/sign-in')

  return children
}

export default ProtectedRoute
