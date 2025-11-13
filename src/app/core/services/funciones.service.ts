import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './peliculas.service';
import { Sala } from './salas.service';

export interface Funcion {
  id: number;
  fechaHora: string;
  precio: number;
  pelicula: Pelicula;
  sala: Sala;
  fecha?: string;
  hora?: string;
}

export interface FuncionPayload {
  id?: number;
  fechaHora: string;
  precio: number;
  pelicula: { id: number };
  sala: { id: number };
}

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  private apiUrl = 'http://localhost:8080/cineBackend/api/funciones';

  constructor(private http: HttpClient) {}

  getFunciones(): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/listar`);
  }

  getFuncionById(id: number): Observable<Funcion> {
    return this.http.get<Funcion>(`${this.apiUrl}/${id}`);
  }

  addFuncion(funcion: FuncionPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/registrar`, funcion);
  }

  updateFuncion(funcion: FuncionPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${funcion.id}`, funcion);
  }

  deleteFuncion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


/*import { Injectable } from '@angular/core';
import { PeliculasService, Pelicula } from './peliculas.service';
import { SalasService, Sala } from './salas.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    private apiUrl = 'http://localhost:8080/cineBackend/api/funciones';

    private funciones: Funcion[] = [
        { id: 1, peliculaId: 1, salaId: 1, fecha: '2025-11-10', hora: '18:00', precio: 45 },
        { id: 2, peliculaId: 2, salaId: 2, fecha: '2025-11-11', hora: '20:30', precio: 40 }
    ];

    pelicula: Pelicula | undefined;

    constructor(
        private peliculasService: PeliculasService,
        private salasService: SalasService,
        private http: HttpClient
    ) { }

    getFunciones(): Observable<Funcion[]> {
        return this.http.get<Funcion[]>(`${this.apiUrl}/funciones`);
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

    getPelicula(id: number): Pelicula | undefined {
        this.peliculasService.getPeliculaById(id).subscribe({
            next: (pelicula) => {
                this.pelicula = pelicula;
            },
            error: (err) => console.error('Error al obtener película:', err)
        });
        return this.pelicula;
    }

    getSala(id: number): Sala | undefined {
        return this.salasService.getSalaById(id);
    }

    deleteFuncion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/funciones/${id}`);
    }

}*/

/*import { Injectable } from '@angular/core';
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

    getPeliculaById(id: number): Pelicula | undefined {
        return this.peliculasService.getPeliculaById(id);
    }

    getSala(id: number): Sala | undefined {
        return this.salasService.getSalaById(id);
    }
}
*/