import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '../../components/ui/Navigation';
import { CitasRouter } from '../core/CitasRouter';
import { PacientesRouter } from '../core/PacientesRouter';
import { HistorialClinicoRouter } from './HistorialClinicoRouter';


export const NutriologoRouter = () => {
  return (
    <div>
      <Navigation/>
      <Routes>
          <Route path='historial-clinico/*' element={<HistorialClinicoRouter/>} />
          <Route path='pacientes/*' element={<PacientesRouter/>}/>
          <Route path='citas/*' element={<CitasRouter/>}/>
          <Route path='*' element={<Navigate to={'pacientes'}/>}/>
      </Routes>
    </div>
  )
}