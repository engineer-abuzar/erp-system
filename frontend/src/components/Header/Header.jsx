import React from "react";
import '../../assets/styles/component/Header.module.css'
import { FaGraduationCap } from "react-icons/fa";
import { Menu, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import {Squash as Hamburger} from "hamburger-react";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setAuthenticaionSlice } from "../../store/features/authentication";

const Header=({ isLoggedIn,setMenuActive }) =>{
  const dispatch=useDispatch()
      const handleClick=()=>{
setMenuActive(prev=>!prev)
}
const logout=async()=>{
  localStorage.removeItem('token')
  await fetch('/api/student/logout',{ method: 'POST', credentials: 'include' })
  dispatch(setAuthenticaionSlice(false))
}
const pathname=useLocation().pathname.split('/').slice(-1)
  if (!isLoggedIn)
    return (
      <header className="w-screen sticky top-0 bg-white flex items-center justify-between p-5 bg-white ">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-2">
          <FaGraduationCap className="text-blue-600 text-2xl" />
          <span className="font-semibold text-blue-600 text-lg">College List</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 z-10">
          <NavLink to="/features" className="text-gray-700 hover:text-blue-600">Features</NavLink>
          <NavLink to="/login" className="text-gray-700 hover:text-blue-600">Login</NavLink>
          <NavLink
            to="/get-started"
            className="bg-white text-blue-600 border border-white rounded-full px-4 py-2 font-medium shadow hover:bg-blue-50"
          >
            Get Started
          </NavLink>
        </div>

        {/* Blue Diagonal Shape */}
        <div className="absolute right-0 top-0 h-full w-1/2  -z-10 clip-path-diagonal"></div>
      </header>
    );
  else
    return (
      <div className="bg-white sticky z-1 top-0 flex py-2 px-5 justify-between shadow-sm items-center">
        <div className="left flex gap-1 items-center">
         <NavLink className='flex  justify-center ' onClick={handleClick}> <Hamburger size={25} onToggle={toggled=>!toggled}  />
          
          </NavLink>
          <span className="font-semibold">{pathname}</span>
        </div>
        <div className="right flex gap-2 items-center">
          <User />
          <span>John</span>
          <NavLink to={'/'} onClick={logout} className=" px-2 py-1 rounded-sm bg-blue-500 text-white hover:bg-blue-600">Logout</NavLink>

        </div>
      </div>
    )
}

export default Header