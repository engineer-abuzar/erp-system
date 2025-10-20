import Landing from './pages/Landing'
import './assets/styles/global.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import { Students, Teachers } from './components/Table/Table'
import LoggedInLayout from './layout/LoggedInLayout'
import Overview from './pages/StudentsPage/OverView'
import Dues from './pages/StudentsPage/Dues'
import AddStudent from './components/Input/AddStudent'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticaionSlice } from './store/features/authentication.js'




const App = () => {
  const dispatch = useDispatch()
 dispatch(setAuthenticaionSlice(document.cookie.includes('userToken')))
 const auth=useSelector(state=>state.authentication)

  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
      const validToken = await axios.get('http://localhost:3000/api/student/loggedin', { headers: { 'authorization': `bearer ${token}` } })

      if ('isValid' in validToken.data)
        dispatch(setAuthenticaionSlice(true))
    })();

  })
  
  

  
  return (
    <>
      <BrowserRouter>
    
          <AnimatePresence mode="wait">
            <Routes>
              <Route path='/' element={<Landing />} />


              {auth ?
                <>
                  <Route path='/login' element={<LoggedInLayout />} />
                  <Route path='/loggedin' element={<LoggedInLayout />} >
                    <Route path="Students" element={<Students />}>
                    </Route>
                    <Route path='Addstudent' element={<AddStudent />} />

                    <Route path="Overview" element={<Overview />} />
                    <Route path="Teachers" element={<Teachers />} />
                    <Route path="Dues" element={<Dues />} />
                  </Route>
                </>
                : <Route path='/login' element={<Login />} />}



            </Routes>
          </AnimatePresence>
    
      </BrowserRouter>
    </>
  )
}

export default App