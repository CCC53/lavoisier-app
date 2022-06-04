import { useEffect, useState } from 'react';
import { getPacientesSelect } from '../helpers/core/paciente';
import { SelectItem } from '../types/ui';

export const useFetchPacientes = (): SelectItem[] => {
    const initialState: SelectItem[] = [];
    const [pacientes, setPacientes] = useState(initialState);

    useEffect(() => {
        getPacientesSelect().then(pacientes => {
            if (pacientes) {
                setPacientes(pacientes);
            }
        });
    }, [])
    
    return pacientes;
}