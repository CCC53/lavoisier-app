export interface Personal {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    rol: string;
}

export interface LoginResponse {
    token: string;
}

export interface LoginError {
    response: {
        data: LoginErrorResponse;
    }
}

export interface LoginErrorResponse {
    error: string;
}

export interface jwtPayload {
    personal: Personal;
    iat: number;
    exp: number;
}