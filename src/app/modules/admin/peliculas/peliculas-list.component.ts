import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';

@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent {
  peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.peliculas = this.peliculasService.getPeliculas();
  }

  eliminarPelicula(id: number) {
    if (confirm('¿Deseas eliminar esta película?')) {
      this.peliculasService.deletePelicula(id);
      this.peliculas = this.peliculasService.getPeliculas();
    }
  }
}
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';

@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent {
  peliculas: Pelicula[] = [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.peliculasService.getPeliculas().subscribe({
      next: (data: Pelicula[]) => this.peliculas = data,
      error: (err) => console.error('Error al cargar películas:', err)
    });
  }

  eliminarPelicula(id: number) {
    if (confirm('¿Deseas eliminar esta película?')) {
      this.peliculasService.deletePelicula(id).subscribe({
        next: () => this.cargarPeliculas(),
        error: (err) => console.error('Error al eliminar película:', err)
      });
    }
  }
}*/