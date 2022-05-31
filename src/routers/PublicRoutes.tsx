import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../helpers/auth';

interface Props {
    token: string | null;
    children: JSX.Element;
}

const selectRol = (token: string) => {
    const { personal } = decodeToken(token);
    const { rol } = personal;
    return rol === 'N' ? <Navigate to={'/nutriologo/'}/> : <Navigate to={'/recepcionista/'}/>
}

export const PublicRoutes = ({children, token}: Props) => {
    return token ? selectRol(token) : children;
}