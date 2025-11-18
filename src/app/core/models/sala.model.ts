export interface Sala {
  id: number;
  nombre: string;
  capacidad: number;
  numero?: number;           
  descripcion?: string;
  cine?: {
    id: number;
    nombre: string;
  };
}