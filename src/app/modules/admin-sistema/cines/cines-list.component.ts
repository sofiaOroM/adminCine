import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Cine {
    id: number;
    nombre: string;
    direccion: string;
    administrador: string;
}

@Component({
    selector: 'app-cines-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cines-list.component.html'
})
export class CinesListComponent {
    cines: Cine[] = [
        { id: 1, nombre: 'Cine Majestic', direccion: 'Zona 10', administrador: 'Sofía Orozco' },
        { id: 2, nombre: 'Cine Central', direccion: 'Zona 1', administrador: 'Luis Pérez' }
    ];

    eliminar(id: number) {
        if (confirm('¿Eliminar este cine?')) {
            this.cines = this.cines.filter(c => c.id !== id);
        }
    }
}
