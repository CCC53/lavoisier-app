import { Cita } from "../core/cita";


export interface Pago {
    id: string;
    monto: number;
    metodoPago: string;
    tipoPago: number;
    cantidadRecibida: number;
    cambio: number;
    cita: string;
}

export interface PagoQueryBuilder {
    id: string;
    monto: number;
    metodo_pago: string;
    tipo_pago: number;
    cantidad_recibida: number;
    cambio: number;
    cita_id: string;
}

export interface PagosResponse {
    pagos: Pago[];
}

export interface PagoResponse {
    pago: PagoQueryBuilder
}

export interface AddPagoResponse {
    pago: Pago;
}

export interface PagoPopulatedResponse {
    pago: {
        id: string;
        monto: number;
        metodoPago: string;
        tipoPago: number;
        cantidadRecibida: number;
        cambio: number;
        cita: Cita;
    }
}