import { Sala } from "./sala.model";

interface Cine {
    id: number;
    nombre: string;
    direccion: string;
    administrador: string;
    salas?: Sala[];
}
