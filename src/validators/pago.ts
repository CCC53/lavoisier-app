import validator from 'validator';

export interface PagoForm {
    monto: string;
    metodoPago: string;
    tipoPago: number;
    cantidadRecibida: string;
    citaId: string;
}

export const validatePagoEmpty = ({ monto, metodoPago, tipoPago, cantidadRecibida, citaId }: PagoForm) => {
    if (validator.isEmpty(monto) || validator.isEmpty(metodoPago) || validator.isEmpty(tipoPago.toString())
        || validator.isEmpty(cantidadRecibida) || validator.isEmpty(citaId)) {
        return true;
    }
    return false;
}