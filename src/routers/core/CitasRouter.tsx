import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CitaPage } from '../../components/core/citas/CitaPage'
import { CitasPage } from '../../components/core/citas/CitasPage'

export const CitasRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<CitasPage/>}/>
        <Route path=':id' element={<CitaPage/>}/>
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}