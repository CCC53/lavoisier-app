import { Cita } from './cita';

export interface Paciente {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    nacimiento: string;
    sexo: string;
}

export interface PacientePopulated extends Paciente {
    citas: Cita[];
}

export interface PacientesResponse {
    pacientes: Paciente[];
}

export interface PacienteDeletedResponse {
    deleted: boolean;
}

export interface GetPacienteResponse {
    paciente: PacientePopulated;
}

export interface AddPacienteResponse {
    paciente: Paciente;
}

export interface PacienteUpdateResponse {
    updated: boolean;
}