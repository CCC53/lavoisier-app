import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PagosPage } from '../components/recepcionista/PagosPage';
import { Navigation } from '../components/ui/Navigation';
import { CitasRouter } from './core/CitasRouter';
import { PacientesRouter } from './core/PacientesRouter';

export const RecepcionistaRouter = () => {
  return (
    <div>
      <Navigation/>
      <Routes>
          <Route path='pagos/*' element={<PagosPage/>}/>
          <Route path='pacientes/*' element={<PacientesRouter/>}/>
          <Route path='citas/*' element={<CitasRouter/>}/>
          <Route path='*' element={<Navigate to={'citas'}/>}/>
      </Routes>
    </div>
  )
}