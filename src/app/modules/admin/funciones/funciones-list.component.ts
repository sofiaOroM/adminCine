import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pelicula } from '../../../core/models/pelicula.model';
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

  constructor(private funcionesService: FuncionesService) { }

  ngOnInit() {
    this.funciones = this.funcionesService.getFunciones();
  }
  getNombrePelicula(id: number): Observable<string> {
    if (!id) return of('Desconocida');
    return this.funcionesService.getPelicula(id).pipe(
      map(p => p?.titulo || 'Desconocida')
    );
  }

  getNombreSala(id: number): string {
    return this.funcionesService.getSala(id)?.nombre || 'Desconocida';
  }

  eliminarFuncion(id: number) {
    if (confirm('¿Deseas eliminar esta función?')) {
      this.funcionesService.deleteFuncion(id);
      this.funciones = this.funcionesService.getFunciones();
    }
  }
}
