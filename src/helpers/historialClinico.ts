import axios from 'axios';
import { fileUploadResponse, GetHistorialesPopulated, HistorialClinicoRes, HistorialUpdateResponse } from '../types/historialClinico';
import { token } from './cita';
import { apiUrl } from './paciente';

export async function addHistorialClinico<T>(formData: T) {
    try {
        const { data } = await axios.post(`${apiUrl}/api/historial-clinico`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { historialClinico } = data as HistorialClinicoRes;
        return historialClinico;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateHistorial<T>(id: string,formData: T) {
    try {
        const { data } = await axios.put(`${apiUrl}/api/historial-clinico/${id}`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { updated } = data as HistorialUpdateResponse;
        return updated;
    } catch (error) {
        console.log(error);
        return null;
    }
}
 
export const getHistorialByID = async(id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/historial-clinico/${id}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { historialClinico } = data as HistorialClinicoRes;
        return historialClinico;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllHistoriales = async() => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/historial-clinico`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { historiales } = data as GetHistorialesPopulated;
        return historiales;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const alimentacionFileUpload = async(file: File) => {
    const url = 'https://api.cloudinary.com/v1_1/dheomdofq/upload';
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'centro-nl');
        const { data } = await axios.post(url, formData);
        const { secure_url, original_filename } = data as fileUploadResponse;
        return {
            url: secure_url,
            name: original_filename
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getHistorialByPaciente = async(id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/historial-clinico/paciente/${id}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { historialClinico } = data as HistorialClinicoRes;
        return historialClinico;
    } catch (error) {
        console.log(error);
        return null;
    }
}