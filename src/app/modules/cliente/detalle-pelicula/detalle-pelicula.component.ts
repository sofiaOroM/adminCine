import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { ComentariosPeliculaComponent } from '../../admin/peliculas/comentarios-pelicula/comentarios-pelicula.component';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, 
    ComentariosPeliculaComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent {
  pelicula: Pelicula | undefined;

  constructor(private route: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.peliculasService.getPeliculaById(id).subscribe({
      next: (pelicula) => {
        this.pelicula = pelicula;
      },
      error: (err) => console.error('Error al obtener película:', err)
    });
  }
}