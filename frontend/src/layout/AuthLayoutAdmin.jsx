import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import { useState } from 'react'
import StudentPage from '../pages/StudentsPage/OverView'
import Menu from '../components/Menu/Menu'
import Overview from '../pages/StudentsPage/OverView'
import '../assets/styles/component/LoggedInLayout.module.css'

const adminOptions = ['Overview', 'Students', 'Teachers', 'Assigments', 'Dues', 'Time table']


const AuthLayoutAdmin = () => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <div className='w-full bg-stone-100  h-screen'>
      <div className="main  flex flex-col gap-3">
        <Header setMenuActive={setMenuActive} isLoggedIn={true} />

        <div className='flex gap-5'>
          <Menu isActive={menuActive} options={adminOptions} />
<Outlet />
        </div>

      </div>
    </div>
  )
}

export default AuthLayoutAdmin