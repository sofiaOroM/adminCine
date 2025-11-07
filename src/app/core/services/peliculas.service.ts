import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: number;
  titulo: string;
  genero: string;
  duracion: number;
  clasificacion: string;
  sinopsis: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:8080/cineBackend/api/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  addPelicula(p: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, p);
  }

  updatePelicula(p: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${p.id}`, p);
  }

  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


/*@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private peliculas: Pelicula[] = [
    {
      id: 1,
      titulo: 'Avengers: Endgame',
      genero: 'Acción',
      duracion: 181,
      clasificacion: 'PG-13',
      sinopsis: 'Los Vengadores se reúnen para revertir el daño causado por Thanos.'
    },
    {
      id: 2,
      titulo: 'Coco',
      genero: 'Animación',
      duracion: 105,
      clasificacion: 'PG',
      sinopsis: 'Un joven músico viaja al mundo de los muertos en busca de su familia.'
    }
  ];

  getPeliculas(): Pelicula[] {
    return this.peliculas;
  }

  getPeliculaById(id: number): Pelicula | undefined {
    return this.peliculas.find(p => p.id === id);
  }

  addPelicula(pelicula: Pelicula) {
    pelicula.id = this.peliculas.length > 0 ? Math.max(...this.peliculas.map(p => p.id)) + 1 : 1;
    this.peliculas.push(pelicula);
  }

  updatePelicula(pelicula: Pelicula) {
    const index = this.peliculas.findIndex(p => p.id === pelicula.id);
    if (index >= 0) this.peliculas[index] = pelicula;
  }

  deletePelicula(id: number) {
    this.peliculas = this.peliculas.filter(p => p.id !== id);
  }
}*/
