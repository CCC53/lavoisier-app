import axios from 'axios';
import { jwtPayload, LoginResponse } from '../types/auth';
import { apiUrl } from './paciente';
import jwtDecode  from 'jwt-decode';

export const initLogin = async(email: string, password: string) => {
    try {
        const { data } = await axios.post(`${apiUrl}/api/auth/login`, {email, password});
        const response = data as LoginResponse;
        const { token } = response;
        localStorage.setItem('token', token);
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function initRegister<T>(formData: T) {
    try {
        const { data } = await axios.post(`${apiUrl}/api/auth/register`, formData);
        const response = data as LoginResponse;
        const { token } = response;
        localStorage.setItem('token', token);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const decodeToken = (token: string) => {
    const decoded = jwtDecode(token) as jwtPayload;
    return decoded;
}

export const isLogged = () => {
    const tokenSaved = localStorage.getItem('token');
    if (!tokenSaved) {
        return null;
    } else {
        const { exp } = decodeToken(tokenSaved);
        const dateExpire = new Date();
        dateExpire.setTime(exp);
        if (dateExpire > new Date()) {
            localStorage.removeItem('token');
            return null;
        } else {
            return tokenSaved;
        }
    }
}

export const initLogout = () => {
    localStorage.removeItem('token');
}