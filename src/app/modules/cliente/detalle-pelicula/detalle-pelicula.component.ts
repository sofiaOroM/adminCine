import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent {
  pelicula$!: Observable<Pelicula>;

  constructor(private route: ActivatedRoute, private peliculasService: PeliculasService) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.pelicula$ = this.peliculasService.getPeliculaById(id);
  }
}
