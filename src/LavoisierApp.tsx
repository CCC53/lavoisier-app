import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/ui/Navigation';
import { PacientesRouter } from './routers/PacientesRouter';
import { CitasRouter } from './routers/CitasRouter';

export const LavoisierApp = () => {
  return (
      <div>
        <BrowserRouter>
          <Navigation/>
          <Routes>
            <Route path='pacientes/*' element={<PacientesRouter/>}/>
            <Route path='citas/*' element={<CitasRouter/>}/>
            <Route path="*" element={<Navigate to={'pacientes'}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}