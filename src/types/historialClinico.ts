import { Paciente } from './paciente';

export interface fileUploadResponse {
    format: string;
    resource_type: string;
    secure_url: string;
    original_filename: string;
}

export interface HistorialClinico {
    id: string;
    enfermedadesCardiovasculares: string;
    enfermedadesPulmonares: string;
    enfermedadesMetabolicas: string;
    tabaquismo: string;
    alcoholismo: string;
    sedentarismo: string;
    drogas: string;
    cafe: string
    alimentacion: string | null;
    pacienteId: string;
}

export interface HistorialClinicoRes {
    historialClinico: HistorialClinico;
}

export interface HistorialClinicoPopulated extends HistorialClinico {
    paciente: Paciente;
}

export interface GetHistorialesPopulated {
    historiales: HistorialClinicoPopulated[];
}

export interface HistorialUpdateResponse {
    updated: boolean;
}