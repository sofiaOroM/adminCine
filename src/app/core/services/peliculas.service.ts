import { Injectable } from '@angular/core';

export interface Pelicula {
  id: number;
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
}
