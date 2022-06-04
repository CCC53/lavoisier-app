import axios from 'axios';
import { token } from '../core/cita';
import { apiUrl } from '../core/paciente';
import { GetAntropometricosRes, GetAntropometricoRes, UpdateAntropometricoRes } from '../../types/nutriologo/antropometria';

export const getAntropometricos = async(pacienteId: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/antropometria/paciente/${pacienteId}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { antropometricos } = data as GetAntropometricosRes;
        return antropometricos;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAntropometricoByID = async(id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/antropometria/${id}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { antropometrico } = data as GetAntropometricoRes;
        return antropometrico;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addAntropometrico<T>(formData: T) {
    try {
        const { data } = await axios.post(`${apiUrl}/api/antropometria`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { antropometrico } = data as GetAntropometricoRes;
        return antropometrico;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateAntropometrico<T>(id: string, formData: T) {
    try {
        const { data } = await axios.put(`${apiUrl}/api/antropometria/${id}`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { updated } = data as UpdateAntropometricoRes;
        return updated;
    } catch (error) {
        console.log(error);
        return null;
    }
}