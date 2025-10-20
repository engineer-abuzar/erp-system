import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Menu = ({options,isActive}) => {
  return (
    <div className={isActive?
      'hidden ':' bg-white py-3 px-5 sticky h-full top-18 flex flex-col gap-2 shadow-sm min-w-45'}>
        <div className="flex items-center space-x-2 ">
                <FaGraduationCap className="text-blue-600 text-2xl" />
                <NavLink className="font-semibold text-blue-600 text-lg">College List</NavLink>
              </div>
       {
                options.map(option=>
              <NavLink to={option} className="hover:bg-blue-500 hover:text-white p-2 rounded-lg">{option}</NavLink>

                )
              }
    </div>
  )
}

export default Menu