import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PacientePage } from '../components/pages/pacientes/PacientePage';
import { PacientesPage } from '../components/pages/pacientes/PacientesPage';

export const PacientesRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<PacientesPage/>}/>
        <Route path=':id' element={<PacientePage/>}/>
        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}
