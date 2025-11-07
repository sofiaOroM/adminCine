import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent {
  usuarios = [
    { id: 1, nombre: 'Sofía Orozco', rol: 'admin_cine' },
    { id: 2, nombre: 'Luis Pérez', rol: 'admin_sistema' },
    { id: 3, nombre: 'Carlos Gómez', rol: 'cliente' }
  ];
}
