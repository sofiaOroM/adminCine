import { Injectable } from '@angular/core';
import { CinemaBlocking } from '../models/bloquear.model';
import { CarteraService } from './cartera.service';
import { ConfiguracionService } from './configuracion.service';

const STORAGE_KEY = 'cinema_blockings';

@Injectable({ providedIn: 'root' })
export class BloquearService {
    private blocks: CinemaBlocking[] = [];

    constructor(private cartera: CarteraService, private settings: ConfiguracionService) {
        const data = localStorage.getItem(STORAGE_KEY);
        this.blocks = data ? JSON.parse(data) : [];
        setInterval(() => this.cleanExpired(), 60000);
    }

    private save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blocks));
    }

    createBlock(cineId: number, adminId: number, dias: number): CinemaBlocking | null {
        const pricePerDay = this.settings.getSettings().hidePricePerDayByCinema;
        const total = pricePerDay * dias;
        const carteraDueño = -Math.abs(cineId);

        if (!this.cartera.debitar(carteraDueño, total)) return null;

        const start = new Date();
        const end = new Date(start.getTime() + dias * 24 * 60 * 60 * 1000);

        const block: CinemaBlocking = {
            id: Date.now(),
            cineId,
            adminId,
            fechaInicio: start.toISOString(),
            fechaFin: end.toISOString(),
            costo: total
        };

        this.blocks.push(block);
        this.save();
        return block;
    }

    getActiveBlocks(): CinemaBlocking[] {
        const now = new Date();
        return this.blocks.filter(b => new Date(b.fechaFin) > now);
    }

    isCinemaBlocked(cineId: number): boolean {
        const now = new Date();
        return this.blocks.some(b => b.cineId === cineId && new Date(b.fechaFin) > now);
    }

    cleanExpired() {
        const now = new Date();
        const updated = this.blocks.filter(b => new Date(b.fechaFin) > now);
        if (updated.length !== this.blocks.length) {
            this.blocks = updated;
            this.save();
        }
    }
}
