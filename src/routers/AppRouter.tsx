import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { RecepcionistaRouter } from './RecepcionistaRouter';
import { NutriologoRouter } from './NutriologoRouter';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { isLogged } from '../helpers/auth';

export const AppRouter = () => {

  const [token, setToken] = useState<string | null>(null);
  const tokenRes = isLogged();

  useEffect(() => {
    if (tokenRes) {
      setToken(tokenRes)
    }
  }, [tokenRes])
  
  return (
    <Routes>
      <Route path='auth/*' element={
          <PublicRoutes token={token}>
            <AuthRouter/>
          </PublicRoutes>
      }/>
      <Route path='nutriologo/*' element={
          <PrivateRoutes token={token}>
            <NutriologoRouter/>
          </PrivateRoutes>
      }/>
      <Route path='recepcionista/*' element={
        <PrivateRoutes token={token}>
          <RecepcionistaRouter/>
        </PrivateRoutes>
      }/>
      {/* <Route path='*' element={
        <PublicRoutes token={token}>
          <AuthRouter/>
        </PublicRoutes>
      }/> */}
    </Routes>
  )
}