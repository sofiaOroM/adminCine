export type AdType = 'texto' | 'texto-imagen' | 'video-texto';
export type AdPeriod = '1d' | '3d' | '7d' | '14d';

export interface Anuncio {
  id: number;
  ownerId: number;             // ID del anunciante
  tipo: AdType;                // tipo de anuncio
  titulo: string;              // título visible
  descripcion: string;         // texto del anuncio
  imagen?: string;             // URL de imagen (solo si aplica)
  videoUrl?: string;           // URL del video (solo si aplica)
  periodo: AdPeriod;           // duración
  fechaInicio: string;         // fecha de inicio
  fechaFin: string;            // fecha de fin
  precioPagado: number;        // costo total pagado
  activo: boolean;             // si está visible o no
  bloqueadoPor: number[];      // IDs de cines que lo bloquean
}


/*export interface Anuncio {
    id: number;
    ownerId: number;
    tipo: AdType;
    titulo: string;
    descripcion?: string;
    imagen?: string;         // para texto-imagen
    videoUrl?: string;       // para video-texto
    fechaInicio: string;
    fechaFin: string;
    periodo: AdPeriod;
    precioPagado: number;
    activo: boolean;
    bloqueadoPor?: number[];
}*/
