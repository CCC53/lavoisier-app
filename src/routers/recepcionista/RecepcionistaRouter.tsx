import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '../../components/ui/Navigation';
import { CitasRouter } from '../core/CitasRouter';
import { PacientesRouter } from '../core/PacientesRouter';
import { PagosRouter } from './PagosRouter';

export const RecepcionistaRouter = () => {
  return (
    <div>
      <Navigation/>
      <Routes>
          <Route path='pagos/*' element={<PagosRouter/>}/>
          <Route path='pacientes/*' element={<PacientesRouter/>}/>
          <Route path='citas/*' element={<CitasRouter/>}/>
          <Route path='*' element={<Navigate to={'citas'}/>}/>
      </Routes>
    </div>
  )
}