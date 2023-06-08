import validator from 'validator';

export interface LaboratorialForm {
    fecha: string;
    glucosa: string;
    insulina: string;
    trigliceridos: string;
    colesterolTotal: string;
    hdl: string
    ldl:string
};

export const validateEmptyLaboratorial = ({ fecha, glucosa, insulina, trigliceridos, colesterolTotal, hdl, ldl }: LaboratorialForm) => {
    if (validator.isEmpty(fecha) || validator.isEmpty(glucosa) || validator.isEmpty(insulina) || validator.isEmpty(trigliceridos)
        || validator.isEmpty(colesterolTotal) || validator.isEmpty(hdl) || validator.isEmpty(ldl)) {
        return true;
    }
    return false;
};

export interface AntropometricoForm {
    fecha: string;
    peso: string;
    talla: string;
    imc: string;
    cintura: string;
    cBrazo: string;
    pTriceps: string;
    pAbdominal: string;
    porcentajeGrasa:string;
}
export const validateEmptyAntropometico = ({ fecha, peso, talla, imc, cintura, cBrazo, pTriceps, pAbdominal, porcentajeGrasa }: AntropometricoForm) => {
    if (validator.isEmpty(fecha) || validator.isEmpty(peso) || validator.isEmpty(talla) || validator.isEmpty(imc) || validator.isEmpty(cintura)
        || validator.isEmpty(cBrazo) || validator.isEmpty(pTriceps) || validator.isEmpty(pAbdominal) || validator.isEmpty(porcentajeGrasa)) {
        return true;
    }
    return false;
};