import axios from "axios";
import { SelectItem } from "../types/ui";
import { AddPacienteResponse, GetPacienteResponse, PacienteDeletedResponse, PacientesResponse, PacienteUpdateResponse, Paciente, PacientePopulated } from '../types/paciente';

export const apiUrl = 'http://localhost:3001';

export const getPacientes = async(): Promise<Paciente[] | undefined> => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/pacientes`);
        const { pacientes } = data as PacientesResponse;
        return pacientes;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const getPacientesSelect = async(): Promise<SelectItem[] | undefined> => {
    try {
        const pacientes = await getPacientes();
        if (pacientes) {            
            const selectItems: SelectItem[] = pacientes.map(({nombre, id}) => ({ label: nombre, value: id }));
            selectItems.unshift({ label: 'Seleccione un paciente', value: '' });
            return selectItems;
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const deletePaciente = async(id: string): Promise<boolean | undefined> => {
    try {
        const { data } = await axios.delete(`${apiUrl}/api/pacientes/${id}`);
        const { deleted } = data as PacienteDeletedResponse;
        return deleted;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const getPacienteByID = async(id: string): Promise<PacientePopulated | undefined> => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/pacientes/${id}`);
        const { paciente } = data as GetPacienteResponse;
        return paciente;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function addPaciente<T>(formValues: T): Promise<Paciente | undefined> {
    try {
        const { data } = await axios.post(`${apiUrl}/api/pacientes`, formValues);
        const { paciente } = data as AddPacienteResponse;
        return paciente;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function updatePaciente<T>(id:string, formValues: T): Promise<boolean | undefined> {
    try {
        const { data } = await axios.put(`${apiUrl}/api/pacientes/${id}`, formValues);
        const { updated } = data as PacienteUpdateResponse;
        return updated;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}