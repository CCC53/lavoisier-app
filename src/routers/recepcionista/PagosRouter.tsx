import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PagoPage } from '../../components/recepcionista/PagoPage'
import { PagosPage } from '../../components/recepcionista/PagosPage'

export const PagosRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<PagosPage/>}/>    
        <Route path=':id' element={<PagoPage/>}/>    
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}