import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';
import { Sala } from '../../../core/models/sala.model';

@Component({
  selector: 'app-funcion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcion-form.component.html',
  styleUrls: ['./funcion-form.component.css']
})
export class FuncionFormComponent {
  fecha: string = '';
  hora: string = '';

  funcion: Funcion = {
    id: 0,
    fechaHora: '',
    precio: 0,
    pelicula: { id: 0, titulo: '', genero: '', duracion: 0, clasificacion: '', sinopsis: '' },
    sala: { id: 0, nombre: '', capacidad: 0 }
  };

  modoEdicion = false;
  peliculas: Pelicula[] = [];
  salas: Sala[] = [];

  constructor(
    private funcionesService: FuncionesService,
    private peliculasService: PeliculasService,
    private salasService: SalasService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.peliculasService.getPeliculas().subscribe({
      next: (data: Pelicula[]) => (this.peliculas = data),
      error: (err) => console.error('Error al cargar películas:', err)
    });

    this.salasService.getSalas().subscribe({
      next: (data: Sala[]) => (this.salas = data),
      error: (err) => console.error('Error al cargar salas:', err)
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
      this.funcionesService.getFuncionById(+id).subscribe({
        next: (data: Funcion) => {
          this.funcion = data;
          const date = new Date(data.fechaHora);
          this.fecha = date.toISOString().split('T')[0];
          this.hora = date.toISOString().split('T')[1].substring(0, 5);
        },
        error: (err) => console.error('Error al cargar función:', err)
      });
    }
  }

  guardar() {
    const fechaHora = new Date(`${this.fecha}T${this.hora}`).toISOString();

    const payload = {
      id: this.funcion.id,
      fechaHora,
      precio: this.funcion.precio,
      pelicula: { id: this.funcion.pelicula.id },
      sala: { id: this.funcion.sala.id }
    };

    if (this.modoEdicion) {
      this.funcionesService.updateFuncion(payload).subscribe({
        next: () => {
          alert('Función actualizada correctamente');
          this.router.navigate(['/admin/funciones']);
        },
        error: (err) => console.error('Error al actualizar función:', err)
      });
    } else {
      this.funcionesService.addFuncion(payload).subscribe({
        next: () => {
          alert('Función creada correctamente');
          this.router.navigate(['/admin/funciones']);
        },
        error: (err) => console.error('Error al crear función:', err)
      });
    }
  }
}