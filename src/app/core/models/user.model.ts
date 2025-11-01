export interface User {
    id?: number;
    nombre: string;
    correo: string;
    password?: string;
    rol: 'cliente' | 'anunciante' | 'admin_cine' | 'admin_sistema';
    token?: string;
}