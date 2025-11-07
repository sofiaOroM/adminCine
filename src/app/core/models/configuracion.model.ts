import { AdPeriod, AdType } from "./ad.model";


export interface PricingSettings {
    priceByType: { [K in AdType]: number };    // base por tipo
    multiplierByPeriod: { [K in AdPeriod]: number }; // multiplicador por periodo
    hidePricePerDayByCinema: number;           // precio por día para ocultar anuncios en un cine
}