import validator from "validator";

export interface HistorialForm {
    enfermedadesCardiovasculares: string;
    enfermedadesPulmonares: string;
    enfermedadesMetabolicas: string;
    tabaquismo: string;
    alcoholismo: string;
    sedentarismo: string;
    drogas: string;
    cafe: string;
    pacienteId: string;
}

export const validateHistorialEmptyData = ({ enfermedadesCardiovasculares, enfermedadesMetabolicas, enfermedadesPulmonares,
    tabaquismo, alcoholismo, sedentarismo, drogas, cafe, pacienteId}: HistorialForm) => {
        if (validator.isEmpty(enfermedadesCardiovasculares) || validator.isEmpty(enfermedadesMetabolicas)
            || validator.isEmpty(enfermedadesPulmonares) || validator.isEmpty(tabaquismo) || validator.isEmpty(alcoholismo)
            || validator.isEmpty(sedentarismo) || validator.isEmpty(drogas) || validator.isEmpty(cafe) || validator.isEmpty(pacienteId)) {
            return true;
        }
        return false;
}