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
        this.salas = this.salasService.getSalas();
    }

    eliminarSala(id: number) {
        if (confirm('¿Seguro que deseas eliminar esta sala?')) {
            this.salasService.deleteSala(id);
            this.salas = this.salasService.getSalas();
        }
    }
}