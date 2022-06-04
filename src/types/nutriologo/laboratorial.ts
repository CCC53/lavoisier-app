export interface Laboratorial {
    id: string;
    fecha: string;
    glucosa: string;
    insulina: number;
    trigliceridos: number;
    colesterolTotal: number;
    hdl: number;
    ldl: number;
    pacienteId: string;
}

export interface GetLaboratorialesRes {
    laboratoriales: Laboratorial[];
}

export interface GetLaboratorialRes {
    laboratorial: Laboratorial;
}

export interface UpdateLaboratorialRes {
    updated: boolean;
}