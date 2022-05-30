import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/auth/LoginPage'
import { RegisterPage } from '../components/auth/RegisterPage';

export const AuthRouter = () => {
  return (
    <div className='auth'>
      <div className='authContainer'>
        <Routes>
          <Route path='login' element={<LoginPage/>} />
          <Route path='registro' element={<RegisterPage/>}/>
          <Route path='*' element={<Navigate to={'login'}/>}/>
        </Routes>
      </div>
    </div>
  )
}