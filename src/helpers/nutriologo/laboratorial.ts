import axios from 'axios';
import { GetLaboratorialesRes, GetLaboratorialRes, UpdateLaboratorialRes } from '../../types/nutriologo/laboratorial';
import { token } from '../core/cita';
import { apiUrl } from '../core/paciente';

export const getLaboratoriales = async(pacienteId: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/laboratorial/paciente/${pacienteId}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { laboratoriales } = data as GetLaboratorialesRes;
        return laboratoriales;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getLaboratorialByID = async(id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/laboratorial/${id}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { laboratorial } = data as GetLaboratorialRes;
        return laboratorial;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addLaboratorial<T>(formData: T) {
    try {
        const { data } = await axios.post(`${apiUrl}/api/laboratorial`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { laboratorial } = data as GetLaboratorialRes;
        return laboratorial;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateLaboratorial<T>(id: string, formData: T) {
    try {
        const { data } = await axios.put(`${apiUrl}/api/laboratorial/${id}`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { updated } = data as UpdateLaboratorialRes;
        return updated;
    } catch (error) {
        console.log(error);
        return null;
    }
}