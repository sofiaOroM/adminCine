import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funciones-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funciones-list.component.html',
  styleUrls: ['./funciones-list.component.css']
})
export class FuncionesListComponent {
  funciones = [
    { id: 1, nombre: 'Función 1', capacidad: 120 },
    { id: 2, nombre: 'Función 2', capacidad: 80 }
  ];
}
