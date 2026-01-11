import { UserCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const FeedbackCard = (props: Props) => {
  return (
    <div
    className={`flex flex-col gap-6 justify-center items-center rounded-xl  w-80 border-subsidiary border cursor-pointer hover:bg-subsidiary py-8 px-10`}
  >
    <UserCircle size={50} color="#ffffff" />
    <p className="text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at arcu varius, suscipit leo ut, gravida tortor. Morbi nec arcu ex. Pellentesque elementum accumsan felis. Donec a pretium dui, sit amet.</p>
  </div>
  )
}

export default FeedbackCard