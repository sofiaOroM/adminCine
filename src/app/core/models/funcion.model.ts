import { Pelicula } from "./pelicula.model";
import { Sala } from "./sala.model";

export interface Funcion {
  id: number;
  fechaHora: string;
  precio: number;
  pelicula: Pelicula;
  sala: Sala;
}
