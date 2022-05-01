import { useEffect, useState } from 'react';
import { SelectItem } from '../types/ui';
import { getPacientesSelect } from '../helpers/paciente';

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