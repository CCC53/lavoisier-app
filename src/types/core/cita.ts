import { Paciente } from './paciente';

export interface Cita {
    id: string;
    motivo: string;
    fecha: string;
    horario: string;
}

export interface CitaPopulated extends Cita {
    paciente: Paciente;
}

export interface GetCitaResponse {
    cita: CitaPopulated;
}

export interface GetCitasResponse {
    citas: Cita[];
}

export interface AddCitaResponse {
    cita: Cita;
}

export interface UpdateCitaResponse {
    updated: boolean;
}

export interface DeleteCitaResponse {
    deleted: boolean;
}