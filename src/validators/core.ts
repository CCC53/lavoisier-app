import validator from "validator";

export interface PacienteForm {
    nombre: string;
    nacimiento: string;
    sexo: string;
    telefono: string;
    email: string;
}

export const validatePacienteEmptyData = ({ nombre, nacimiento, sexo, telefono, email }: PacienteForm) => {
    if (validator.isEmpty(nombre) || validator.isEmpty(email) || validator.isEmpty(telefono)
        || validator.isEmpty(nacimiento) || validator.isEmpty(sexo) || !validator.isMobilePhone(telefono, 'es-MX', { strictMode: true })) {
        return true;
    }
    return false;
}

export interface CitaForm {
    motivo: string;
    fecha: string;
    horario: string;
    paciente: string;
}

export const valdiateCitaEmptyData = ({ motivo, fecha, horario, paciente }: CitaForm) => {
    if (validator.isEmpty(motivo) || validator.isEmpty(fecha) || validator.isEmpty(horario)
        || validator.isEmpty(paciente)) {
        return true;
    }
    return false;
}