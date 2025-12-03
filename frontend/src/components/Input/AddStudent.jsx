import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {ArrowLeftToLine } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const AddStudent = () => {
    
    const navigate=useNavigate()
const [formData,setFormData]=useState({
    name:"",
    rollno:"",
    className:"",
    section:"",
    email:"",
    phone:"",
    status:"",
    gpa:"",
    joined:""
})
const handleChange=(e)=>{
setFormData((prev)=>
{
  return { ...prev,[e.target.name]:e.target.value}
})

}

const handleSubmit=async(e)=>{
e.preventDefault();

try{
const resp=await axios.post('/api/student/insert',formData,{
  
})
navigate('/loggedin/Students')

}catch(err){
    const fieldName=Object.keys(err.response.data.keyPattern)
   switch (err.status) {
    case 200:
      alert("Student Added Success");
      break;
    case 400:
      alert("400 Bad Request - Invalid input or request.");
      break;
    case 401:
      alert("401 Unauthorized - Authentication required or failed.");
      break;
    case 403:
      alert("403 Forbidden - You don’t have permission.");
      break;
    case 409:
      alert(`Duplicate entry of : ${fieldName}`);
      break;
    case 500:
      alert("500 Internal Server Error - Something went wrong on the server.");
      break;
    
  }
}

}

    return (
        <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.2 }}
      className="p-6"
    >
        <div className='shadow-sm bg-white p-4'>
        <NavLink to='/loggedin/Students'>    <ArrowLeftToLine className='hover:bg-stone-100 h-10 w-10 p-2 rounded-sm '/></NavLink>
            <form onSubmit={handleSubmit} className=' flex flex-col items-center gap-5 p-10 rounded-xs  ' method="POST">
            <div  className='flex gap-2 '>
 <div className="labels flex flex-col gap-3">
                    <label className='h-7'>Name:</label>
                    <label className='h-7'>Roll No:</label>
                    <label className='h-7'>Class:</label>
                    <label className='h-7'>Section:</label>
                    <label className='h-7'>Email:</label>
                    <label className='h-7'>Phone:</label>
                    <label className='h-12 flex items-center'>Status:</label>
                    <label className='h-7'>GPA:</label>
                    <label className='h-7'>Joined Date:</label>
                </div>


                <div className="inputs flex flex-col gap-3">
                    <input className='h-7  rounded-sm px-2 border-stone-400 py-3 border-1' onChange={handleChange} type="text" name="name" required />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="number" name="rollno" required />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="number" name="className" required />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="text" name="section" required />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="email" name="email" required />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="tel" name="phone" required />

                    <select className=' rounded-sm px-2 border-stone-400 py-3 border-1 'onChange={handleChange} name="status" required>

                        <option  value="Select">Select</option>
                        <option  value="Active">Active</option>
                        <option  value="Inactive">Inactive</option>
                    </select>

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="number" step="0.01" name="gpa" />

                    <input className='h-7 rounded-sm px-2 border-stone-400 py-3 border-1'onChange={handleChange} type="date" name="joined" />

                </div>
            </div>
               
              <button className='px-8 py-1 bg-blue-400 text-white rounded-sm' type='submit'>Add</button>

            </form>

        </div>
        </motion.div>
    )
}

export default AddStudent