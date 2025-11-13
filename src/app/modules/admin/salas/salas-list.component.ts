import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalasService, Sala } from '../../../core/services/salas.service';

@Component({
    selector: 'app-salas-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './salas-list.component.html',
    styleUrls: ['./salas-list.component.css']
})
export class SalasListComponent {
    salas: Sala[] = [];

    constructor(private salasService: SalasService) { }

    ngOnInit() {
        this.salasService.getSalas().subscribe({
            next: (data) => this.salas = data,
            error: (err) => console.error('Error al cargar salas:', err)
        });
    }

    cargarSalas() {
        this.salasService.getSalas().subscribe({
            next: (data) => this.salas = data,
            error: (err) => console.error('Error al cargar salas:', err)
        });
    }

    eliminarSala(id: number) {
        if (confirm('¿Seguro que deseas eliminar esta sala?')) {
            this.salasService.deleteSala(id).subscribe({
                next: () => {
                    alert('Sala eliminada correctamente');
                    this.cargarSalas(); 
                },
                error: (err) => console.error('Error al eliminar sala:', err)
            });
        }
    }
}