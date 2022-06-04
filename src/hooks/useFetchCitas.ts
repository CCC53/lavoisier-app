import { useEffect, useState } from "react";
import { SelectItem } from "../types/ui";
import { getCitasSelect } from '../helpers/core/cita';

export const useFetchCitas = () => {
    const initialState: SelectItem[] = [];
    const [citas, setCitas] = useState(initialState);

    useEffect(() => {
        getCitasSelect().then(res => {
            if(res) {
                setCitas(res);
            }
        });
    }, []);

    return citas;
}
