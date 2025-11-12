export enum AdType {
  TEXTO = 'texto',
  TEXTO_IMAGEN = 'texto-imagen',
  VIDEO_TEXTO = 'video-texto'
}

export enum AdPeriod {
  DIA_1 = '1d',
  DIA_3 = '3d',
  DIA_7 = '7d',
  DIA_14 = '14d'
}

export interface PricingSettings {
  priceByType: Record<AdType, number>;
  multiplierByPeriod: Record<AdPeriod, number>;
  hidePricePerDayByCinema: number;
}

/*import { AdPeriod, AdType } from "./ad.model";

export interface PricingSettings {
    priceByType: Record<AdType, number>;    // base por tipo
    multiplierByPeriod: Record<AdPeriod, number>; // multiplicador por periodo
    hidePricePerDayByCinema: number;           // precio por día para ocultar anuncios en un cine
}*/