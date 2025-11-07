import { Injectable } from '@angular/core';
import { PricingSettings } from '../models/configuracion.model';
import { AdType, AdPeriod } from '../models/ad.model';

const STORAGE_KEY = 'ad_settings';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  private settings: PricingSettings;

  constructor() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) this.settings = JSON.parse(data);
    else {
      this.settings = {
        priceByType: { 'texto': 5, 'texto-imagen': 15, 'video-texto': 30 },
        multiplierByPeriod: { '1d': 1, '3d': 2.5, '7d': 5, '14d': 9 },
        hidePricePerDayByCinema: 10
      };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
  }

  getSettings(): PricingSettings {
    return this.settings;
  }

  update(settings: PricingSettings) {
    this.settings = settings;
    this.save();
  }

  calculatePrice(tipo: AdType, periodo: AdPeriod): number {
    const base = this.settings.priceByType[tipo];
    const mult = this.settings.multiplierByPeriod[periodo];
    return Math.round(base * mult * 100) / 100;
  }
}
