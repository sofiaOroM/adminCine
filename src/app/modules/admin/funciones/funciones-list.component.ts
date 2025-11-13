import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';

@Component({
  selector: 'app-funciones-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './funciones-list.component.html',
  styleUrls: ['./funciones-list.component.css']
})
export class FuncionesListComponent {
  funciones: Funcion[] = [];

  constructor(private funcionesService: FuncionesService) {}

  ngOnInit() {
    this.cargarFunciones();
  }

  cargarFunciones() {
    this.funcionesService.getFunciones().subscribe({
      next: (data) => {
        this.funciones = data;
      },
      error: (err) => {
        console.error('Error al cargar funciones:', err);
      }
    });
  }

  eliminarFuncion(id: number) {
    if (confirm('¿Deseas eliminar esta función?')) {
      this.funcionesService.deleteFuncion(id).subscribe({
        next: () => {
          alert('Función eliminada correctamente');
          this.cargarFunciones();
        },
        error: (err) => {
          console.error('Error al eliminar la función:', err);
          alert('Ocurrió un error al eliminar la función');
        }
      });
    }
  }

  // Helpers para mostrar datos del backend
  getFecha(fechaHora: string): string {
    return new Date(fechaHora).toLocaleDateString();
  }

  getHora(fechaHora: string): string {
    return new Date(fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}