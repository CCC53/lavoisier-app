import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistorialClinicoPage } from '../../components/nutriologo/historialClinico/HistorialClinicoPage';
import { HistorialesClinicosPage } from '../../components/nutriologo/historialClinico/HistorialesClinicosPage';

export const HistorialClinicoRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<HistorialesClinicosPage/>}/>    
        <Route path=':id' element={<HistorialClinicoPage/>}/>    
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}