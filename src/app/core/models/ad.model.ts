export type AdType = 'texto' | 'texto-imagen' | 'video-texto';
export type AdPeriod = '1d' | '3d' | '7d' | '14d';

export interface Anuncio {
  id: number;
  ownerId: number;             
  tipo: AdType;                
  titulo: string;              
  descripcion: string;         
  imagen?: string;             
  videoUrl?: string;           
  periodo: AdPeriod;           
  fechaInicio: string;         
  fechaFin: string;            
  precioPagado: number;        
  activo: boolean;             
  bloqueadoPor: number[];      
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
