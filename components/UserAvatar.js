import { Avatar } from 'antd'
import { useCurrentUser } from '../shared/hook/useCurrentUser'
import { getFirstLetterOfWord } from '../shared/utils/method'

const UserAvatar = () => {
  const { data } = useCurrentUser()
  const user = data && data?.message === 'SUCCESS' ? data.user : {}

  return (
    <div
      className="relative p-1 after:absolute after:content-[''] after:w-full after:h-full after:rounded-full
        after:top-0 after:left-0 z-0
        after:hover:shadow-[#c0b6f2_0px_0px_0px_3px,#6554c0_0px_0px_11px]"
    >
      <Avatar
        style={{ backgroundColor: user?.color }}
        className="relative z-[1] align-middle hover:cursor-pointer "
        size="small"
      >
        {getFirstLetterOfWord(`${user?.firstName} ${user?.lastName}`)}
      </Avatar>
    </div>
  )
}

export default UserAvatar
