/*import { Injectable } from '@angular/core';

export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  duracion: number;
  clasificacion: string;
  sinopsis: string;
  imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private peliculas: Pelicula[] = [
    {
      id: 1,
      titulo: 'Avengers: Endgame',
      genero: 'Acción',
      duracion: 181,
      clasificacion: 'B-12',
      sinopsis: 'Los Vengadores se reúnen para revertir el daño causado por Thanos.',
      imagen: 'https://m.media-amazon.com/images/I/7103d-g1quL._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: 2,
      titulo: 'Coco',
      genero: 'Animación',
      duracion: 105,
      clasificacion: 'B',
      sinopsis: 'Un joven músico viaja al mundo de los muertos en busca de su familia.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-niSAgj6wQcuRWs0KTRUUZxo-mgUq6ps0Q&s'
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  duracion: number;
  clasificacion: string;
  sinopsis: string;
  imagen?: string;
}

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  private apiUrl = 'http://localhost:8080/cineBackend/api/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  addPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  updatePelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${pelicula.id}`, pelicula);
  }

  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
