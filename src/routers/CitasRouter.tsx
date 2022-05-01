import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CitaPage } from '../components/pages/citas/CitaPage'
import { CitasPage } from '../components/pages/citas/CitasPage'

export const CitasRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<CitasPage/>}/>
        <Route path='/:id' element={<CitaPage/>}/>
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}
