import React from 'react'
import {GraduationCap,UsersRound,FileCheck } from 'lucide-react'
import { Outlet } from 'react-router-dom'
const WelcomeCard=({icon,text,data})=>{
    return(
    <div className="container shadow-sm justify-center items-center min-w-45 rounded-lg  border-1 border-blue-100 flex gap-5">
        {icon}
        <div className="data flex flex-col">
            <span>{text}</span>
            <span>{data}</span>
        </div>
    </div>
    )
}



const Overview = () => {
  return (
    <div className='my-5 '>
        <div className="bg-white welcome-section flex gap-10 shadow-sm rounded-lg p-5">
        <WelcomeCard icon={<GraduationCap />} text={'Total Students'} data='12' />
        <WelcomeCard icon={<UsersRound  />} text={'Total Staff'} data='90' />
        <WelcomeCard icon={<FileCheck  />} text={'Pass Percentage'} data='50%' />
        </div>
                <Outlet />

    </div>
  )
}

export default Overview