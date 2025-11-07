import { Injectable } from '@angular/core';
import { Cartera } from '../models/cartera.model';

const STORAGE_KEY = 'carteras';

@Injectable({ providedIn: 'root' })
export class CarteraService {
    private carteras: Cartera[] = [];

    constructor() {
        const data = localStorage.getItem(STORAGE_KEY);
        this.carteras = data ? JSON.parse(data) : [];
    }

    private save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.carteras));
    }

    getCartera(ownerId: number): Cartera {
        let w = this.carteras.find(x => x.ownerId === ownerId);
        if (!w) {
            w = { ownerId, balance: 0 };
            this.carteras.push(w);
            this.save();
        }
        return w;
    }

    credit(ownerId: number, amount: number) {
        const w = this.getCartera(ownerId);
        w.balance += amount;
        this.save();
    }

    debit(ownerId: number, amount: number): boolean {
        const w = this.getCartera(ownerId);
        if (w.balance >= amount) {
            w.balance -= amount;
            this.save();
            return true;
        }
        return false;
    }

    getBalance(ownerId: number): number {
        return this.getCartera(ownerId).balance;
    }
}
