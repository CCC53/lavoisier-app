import validator from "validator";

export const validateLoginEmptyData = (email: string, password: string) => validator.isEmpty(email) || !validator.isEmail(email)
        || validator.isEmpty(password) || !validator.isLength(password, { min: 5 }) ? true : false; 

export const validateEmail = (email: string) => validator.isEmail(email) || validator.isEmpty(email) ? true : false;

export const validatePassword = (password: string) => validator.isLength(password, { min: 5 }) || validator.isEmpty(password) ? true : false;

export const validatePhone = (phone: string) => validator.isEmpty(phone) || validator.isMobilePhone(phone, 'es-MX', { strictMode: true }) ? true : false;

export const validateName = (name: string) => validator.isEmpty(name) || validator.isLength(name, { max: 20 }) ? true : false;

export interface RegisterFields {
    nombre: string;
    telefono: string;
    rol: string;
    email: string;
    password: string
}

export const validateRegisterEmptyData =
    ({ nombre, telefono, rol, email, password }: RegisterFields) => validator.isEmpty(nombre) || validator.isEmpty(rol) || validator.isEmpty(email)
        || !validator.isEmail(email) || validator.isEmpty(telefono)
        || !validator.isMobilePhone(telefono, 'es-MX', { strictMode: true }) || validator.isEmpty(password)
        || !validator.isLength(password, { min: 5 }) ? true : false;