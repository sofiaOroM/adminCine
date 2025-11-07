import { Injectable } from '@angular/core';
import { PeliculasService } from './peliculas.service';
import { Pelicula } from '../models/pelicula.model';
import { SalasService, Sala } from './salas.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Funcion {
    id: number;
    peliculaId: number;
    salaId: number;
    fecha: string;
    hora: string;
    precio: number;
}

@Injectable({
    providedIn: 'root'
})
export class FuncionesService {
    private funciones: Funcion[] = [
        { id: 1, peliculaId: 1, salaId: 1, fecha: '2025-11-10', hora: '18:00', precio: 45 },
        { id: 2, peliculaId: 2, salaId: 2, fecha: '2025-11-11', hora: '20:30', precio: 40 }
    ];

    constructor(
        private peliculasService: PeliculasService,
        private salasService: SalasService
    ) { }

    getFunciones(): Funcion[] {
        return this.funciones;
    }

    getFuncionById(id: number): Funcion | undefined {
        return this.funciones.find(f => f.id === id);
    }

    addFuncion(funcion: Funcion) {
        funcion.id = this.funciones.length > 0 ? Math.max(...this.funciones.map(f => f.id)) + 1 : 1;
        this.funciones.push(funcion);
    }

    updateFuncion(funcion: Funcion) {
        const index = this.funciones.findIndex(f => f.id === funcion.id);
        if (index >= 0) this.funciones[index] = funcion;
    }

    deleteFuncion(id: number) {
        this.funciones = this.funciones.filter(f => f.id !== id);
    }

    getPelicula(id: number): Observable<Pelicula | undefined> {
        if (!id) return of(undefined);
        return this.peliculasService.getPeliculaById(id);
    }


    getSala(id: number): Sala | undefined {
        return this.salasService.getSalaById(id);
    }
}
