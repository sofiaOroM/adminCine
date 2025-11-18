// ad.model.ts
export type AdType = 'texto' | 'texto-imagen' | 'video-texto';
export type AdPeriod = '1d' | '3d' | '7d' | '14d';

export interface Anuncio {
  id?: number;
  ownerId: number;
  tipo: AdType;
  titulo: string;
  descripcion: string;
  imagen?: string;
  videoUrl?: string;
  periodo: AdPeriod;
  fechaInicio: string; 
  fechaFin: string;    
  costo: number;
  activo: boolean;
  bloqueadoPor?: number[]; 
}

export class AnuncioBackend {
  ownerId: number;
  tipo: AdType;
  titulo: string;
  descripcion: string;
  imagen?: string;
  videoUrl?: string;
  periodo: AdPeriod;
  fechaInicio: string;
  fechaFin: string;
  costo: number;
  activo: boolean;

  constructor(anuncio: Anuncio) {
    this.ownerId = anuncio.ownerId;
    this.tipo = anuncio.tipo;
    this.titulo = anuncio.titulo;
    this.descripcion = anuncio.descripcion;
    this.imagen = anuncio.imagen;
    this.videoUrl = anuncio.videoUrl;
    this.periodo = anuncio.periodo;
    this.fechaInicio = anuncio.fechaInicio;
    this.fechaFin = anuncio.fechaFin;
    this.costo = anuncio.costo;
    this.activo = anuncio.activo;
  }
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
