import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'

type Props = {
    children: any
}

const layout = (props: Props) => {
  return (
    <DashboardLayout>
      {props.children}
    </DashboardLayout>
  )
}

export default layout