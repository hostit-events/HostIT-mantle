import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

type Props = {
    children: any
}

const DashboardLayout = (props: Props) => {
  return (
    <>
    <Header />
    <Sidebar />
    <div className='w-[94%] mx-auto md:w-[93%] md:ml-[7%] mt-[14vh] md:mt-[12vh]'>
    {props.children}
    </div>
    </>
  )
}

export default DashboardLayout