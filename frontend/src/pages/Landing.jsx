import React from 'react'
import Header from '../components/Header/Header'
import laptop from '../assets/images/laptop.jpg'
import { NavLink } from 'react-router-dom';
import { PiStudentFill } from "react-icons/pi";
import { FaLaptopFile } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";



const LandingCard=({para,Icon})=>{
return(
  
  <div className="flex flex-col gap-3 shadow-sm p-5 text-6xl card max-w-70">
   {Icon}
    <p className='text-xl'>{para}</p>
  </div>
)
}



const Landing = () => {
  return (
    <div className='xs:max-sm:flex xs:max-sm:flex-col justify-center items-center'>
    <Header isLoggedIn={false}/>
    <div className="container w-full items-center justify-center flex xs:max-sm:flex-col">
      
<div className="hero-left items-center justify-center w-full  flex sm:flex-col items-center py-20">
  <div className="left-banner-container max-w-70 flex flex-col gap-5">
<div className="banner-text text-4xl">Manage your students data with College List</div>


<NavLink to='/login'>  <button className=' max-w-30 text-lg bg-indigo-500 text-white py-1 px-5 rounded-lg'>Login</button></NavLink>
</div>
</div>
<div className="hero-right w-full flex  items-center">
<div className="max-w-80 laptop-image">
  <img src={laptop} alt="" />
</div>
</div>
    </div>

    {/*cards*/}
    <div className="my-4 w-full items-center card-container xs:max-sm:flex-col justify-center flex gap-4 ">
    <LandingCard  Icon={<PiStudentFill className='text-white rounded-full p-3 bg-yellow-400'/>} para="Manage Student data with well organized system" />
    <LandingCard  Icon={<FaLaptopFile className='text-white rounded-full p-3 bg-indigo-600'/>} para="Manage Teachers data and payment status with ease" />
    <LandingCard  Icon={<RiMoneyRupeeCircleFill className='text-white rounded-full p-3 bg-cyan-400'/>} para="See earning of every month and week with" />
    </div>
    </div>
  )
}

export default Landing