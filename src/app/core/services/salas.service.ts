import { Injectable } from '@angular/core';

export interface Sala {
    id: number;
    nombre: string;
    capacidad: number;
    descripcion?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SalasService {
    private salas: Sala[] = [
        { id: 1, nombre: 'Sala Principal', capacidad: 120, descripcion: 'Pantalla gigante con sonido Dolby' },
        { id: 2, nombre: 'Sala 3D', capacidad: 90, descripcion: 'Sala con proyección 3D' },
    ];

    getSalas(): Sala[] {
        return this.salas;
    }

    getSalaById(id: number): Sala | undefined {
        return this.salas.find(s => s.id === id);
    }

    addSala(sala: Sala) {
        sala.id = this.salas.length > 0 ? Math.max(...this.salas.map(s => s.id)) + 1 : 1;
        this.salas.push(sala);
    }

    updateSala(sala: Sala) {
        const index = this.salas.findIndex(s => s.id === sala.id);
        if (index >= 0) this.salas[index] = sala;
    }

    deleteSala(id: number) {
        this.salas = this.salas.filter(s => s.id !== id);
    }
}