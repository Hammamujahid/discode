import Sidebar from '@/components/sidebar'
import { SidebarProps } from '@/utils/types'
import React from 'react'

const Layout = ({children}: SidebarProps) => {
  return (
    <div className='w-screen h-screen bg-white'>
      <div className='flex'>
        <Sidebar></Sidebar>
        <div className='w-full h-screen overflow-y-auto'>{children}</div>
      </div>
    </div>
  )
}

export default Layout