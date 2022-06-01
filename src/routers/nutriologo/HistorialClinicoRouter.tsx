import React from 'react'
import { HistorialesClinicosPage } from '../../components/nutriologo/HistorialesClinicosPage';
import { HistorialClinicoPage } from '../../components/nutriologo/HistorialClinicoPage';
import { Routes, Route, Navigate } from 'react-router-dom';

export const HistorialClinicoRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<HistorialesClinicosPage/>}/>    
        <Route path=':id' element={<HistorialClinicoPage/>}/>    
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}