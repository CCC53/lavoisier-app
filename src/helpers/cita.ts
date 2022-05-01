import axios from "axios"
import { Cita, CitaPopulated, GetCitaResponse, GetCitasResponse, AddCitaResponse, DeleteCitaResponse, UpdateCitaResponse } from '../types/cita';
import { apiUrl } from "./paciente";

export const getCitaByID = async(id: string): Promise<CitaPopulated | undefined> => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/citas/${id}`);
        const { cita } = data as GetCitaResponse;
        return cita;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const getAllCitas = async(): Promise<Cita[] | undefined> => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/citas`);
        const { citas } = data as GetCitasResponse;
        return citas;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function addCita<T>(formValues:T): Promise<Cita | undefined> {
    try {
        const { data } = await axios.post(`${apiUrl}/api/citas`, formValues);
        const { cita } = data as AddCitaResponse;
        return cita;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function updateCita<T>(id: string, formValues: T): Promise<boolean | undefined> {
    try {
        const { data } = await axios.put(`${apiUrl}/api/citas/${id}`, formValues);
        const { updated } = data as UpdateCitaResponse;
        return updated;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const deleteCita = async(id: string): Promise<boolean | undefined> => {
    try {
        const { data } = await axios.delete(`${apiUrl}/api/citas/${id}`);
        const { deleted } = data as DeleteCitaResponse;
        return deleted;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}