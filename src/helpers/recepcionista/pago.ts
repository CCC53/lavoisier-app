import axios from 'axios';
import { AddPagoResponse, PagoPopulatedResponse, PagoResponse, PagosResponse } from '../../types/recepcionista/pago';
import { token } from '../core/cita';
import { apiUrl } from '../core/paciente';

export const getAllPagos = async() => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/pagos`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { pagos } = data as PagosResponse;
        return pagos;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPagoByID = async(id: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/pagos/${id}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { pago } = data as PagoPopulatedResponse;
        return pago;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addPago<T>(formData: T) {
    try {
        const { data } = await axios.post(`${apiUrl}/api/pagos`, formData, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { pago } = data as AddPagoResponse;
        return pago;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPagoByCita = async(citaId: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/pagos/cita/${citaId}`, {
            headers: {
                authorization: token ? token : ''
            }
        });
        const { pago } = data as PagoResponse;
        return pago;
    } catch (error) {
        console.log(error);
        return null;
    }
};