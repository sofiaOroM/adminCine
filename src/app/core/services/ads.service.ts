import { Injectable } from '@angular/core';
import { Anuncio, AdType, AdPeriod } from '../models/ad.model';

const STORAGE_KEY = 'anuncios';

@Injectable({ providedIn: 'root' })
export class AdsService {
    private anuncios: Anuncio[] = [];

    constructor() {
        this.load();
        setInterval(() => this.cleanExpired(), 60000);
    }

    private load() {
        const data = localStorage.getItem(STORAGE_KEY);
        this.anuncios = data ? JSON.parse(data) : [];
        this.cleanExpired();
    }

    private save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.anuncios));
    }

    getAll(): Anuncio[] {
        return this.anuncios.filter(a => a.activo);
    }

    getAllIncludingInactive(): Anuncio[] {
        return this.anuncios;
    }

    getById(id: number): Anuncio | undefined {
        return this.anuncios.find(a => a.id === id);
    }

    create(ad: Anuncio) {
        this.anuncios.push(ad);
        this.save();
    }

    update(ad: Anuncio) {
        const index = this.anuncios.findIndex(a => a.id === ad.id);
        if (index > -1) {
            this.anuncios[index] = ad;
            this.save();
        }
    }

    deactivate(id: number) {
        const ad = this.getById(id);
        if (ad) {
            ad.activo = false;
            this.save();
        }
    }

    cleanExpired() {
        const now = new Date();
        let changed = false;
        for (const ad of this.anuncios) {
            if (ad.activo && new Date(ad.fechaFin) <= now) {
                ad.activo = false;
                changed = true;
            }
        }
        if (changed) this.save();
    }

    getVisibleForCinema(cineId?: number): Anuncio[] {
        return this.getAll().filter(a => !a.bloqueadoPor?.includes(cineId || -1));
    }

    toggleActive(id: number, active: boolean) {
        const ad = this.getById(id);
        if (ad) {
            ad.activo = active;
            this.save();
        }
    }
}
