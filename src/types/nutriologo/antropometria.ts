export interface Antropometria {
    id: string;
    fecha: string;
    peso: number;
    talla: number;
    imc: number;
    cintura: number;
    cBrazo: number;
    pTriceps: number;
    pAbdominal: number;
    porcentajeGrasa: string;
    pacienteId: string;
}

export interface GetAntropometricosRes {
    antropometricos: Antropometria[];
}

export interface GetAntropometricoRes {
    antropometrico: Antropometria;
}

export interface UpdateAntropometricoRes {
    updated: boolean;
}