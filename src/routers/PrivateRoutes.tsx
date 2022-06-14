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
    return rol === 'N' || rol === 'R' ? children : <Navigate to={'/auth'}/>;
}

export const PrivateRoutes = ({token, children}: Props) => {
    return !token ? <Navigate to={'/auth'}/> : selectRol(token, children);
}