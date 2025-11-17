import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { ComentariosPeliculaComponent } from '../admin/peliculas/comentarios-pelicula/comentarios-pelicula.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule,   DetallePeliculaComponent, ComentariosPeliculaComponent],
})
export class ClienteModule {}
