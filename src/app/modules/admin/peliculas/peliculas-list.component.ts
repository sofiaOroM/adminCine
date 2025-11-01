import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent {
  peliculas = [
    { id: 1, nombre: 'Pelicula 1', capacidad: 120 },
    { id: 2, nombre: 'Pelicula 2', capacidad: 80 }
  ];
}
