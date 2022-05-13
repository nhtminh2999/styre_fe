import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { BellFilled, SettingFilled } from '@ant-design/icons'
import UserAvatar from '../UserAvatar'

const HeaderLink = ({ path = '/', title }) => {
  const [active, setActive] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    if (pathname.includes(path)) setActive(true)
    else setActive(false)
  }, [path, pathname])

  return (
    <div
      className={`h-full relative 
        after:absolute after:content-[''] after:bottom-0 after:h-1 after:bg-[#38b6ff] 
        hover:after:w-full ${active ? 'after:w-full' : 'after:w-0'}`}
    >
      <Link href={path}>
        <a className={`flex items-center h-full font-medium text-sm text-[#344563] ${active ? 'text-[#38b6ff]' : ''}`}>
          {title}
        </a>
      </Link>
    </div>
  )
}

function Header() {
  return (
    <header
      className="relative bg-white
        after:absolute after:content-[''] after:left-0 after:right-0 after:h-1
        after:bg-[linear-gradient(#091e4221_0px,#091e4221_1px,#091e4214_1px,#091e4200_4px)]"
    >
      <div className="flex justify-between items-center px-4 relative h-14">
        <nav className="flex justify-between items-center h-full">
          <div className="relative h-8 w-8 mr-6">
            <Link href="/styre/project">
              <a className="relative block w-full h-full">
                <Image src="/favicon.ico" alt="Styre logo" layout="fill" objectFit="scale-down" priority />
              </a>
            </Link>
          </div>
          <div className="flex justify-between items-center space-x-6 h-full">
            <HeaderLink path="/styre/project" title="Project" />
          </div>
        </nav>
        <div className="flex items-center space-x-6 h-full">
          <BellFilled className="text-xl cursor-not-allowed" />
          <SettingFilled className="text-xl cursor-not-allowed" />
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}

export default Header
