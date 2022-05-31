import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../helpers/auth';

interface Props {
    token: string | null;
    children: JSX.Element;
}

const selectRol = (token: string, children: JSX.Element) => {
    const { personal } = decodeToken(token);
    const { rol } = personal;
    switch (rol) {
        case 'N':
            return children;
        case 'R':
            return children;    
        default:
            return <Navigate to={'/auth'}/> 
    }
}

export const PrivateRoutes = ({token, children}: Props) => {
    return !token ? <Navigate to={'/auth'}/> : selectRol(token, children);
}