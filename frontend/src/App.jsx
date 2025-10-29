import Landing from './pages/Landing'
import './assets/styles/global.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import { Students, Teachers } from './components/Table/Table'
import AuthLayoutAdmin from './layout/AuthLayoutAdmin'
import Overview from './pages/AdminPage/OverView.jsx'
import Dues from './pages/AdminPage/Dues.jsx'
import AddStudent from './components/Input/AddStudent'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import NotFound from './pages/NotFound.jsx'
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticaionSlice } from './store/features/authentication.js'




const App = () => {
  // const dispatch = useDispatch()
  // dispatch(setAuthenticaionSlice(document.cookie.includes('userToken')))
  // const auth = useSelector(state => state.authentication)

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   (async () => {
  //     const validToken = await axios.get('https://erp-system-1-1p63.onrender.com/api/student/loggedin', { headers: { 'authorization': `bearer ${token}` } })

  //     if ('isValid' in validToken.data)
  //       dispatch(setAuthenticaionSlice(true))
  //   })();

  // })




  return (
    <>
      <BrowserRouter>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='*' element={<NotFound />} />

            {/* {auth ?
              <>
                <Route path='/login' element={<AuthLayoutAdmin />} />
                <Route path='/loggedin' element={<AuthLayoutAdmin />} >
                  <Route path="Students" element={<Students />}>
                  </Route>
                  <Route path='Addstudent' element={<AddStudent />} />

                  <Route path="Overview" element={<Overview />} />
                  <Route path="Teachers" element={<Teachers />} />
                  <Route path="Dues" element={<Dues />} />
                </Route>
              </>
              : */}
               <Route path='/logi' element={<Login />} />



          </Routes>
        </AnimatePresence>

      </BrowserRouter>
    </>
  )
}

export default App