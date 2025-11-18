import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CinesService } from '../../../core/services/cines.service';

@Component({
    selector: 'app-cliente-cines-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cines-list.component.html'
})
export class ClienteCinesListComponent {

    cines: any[] = [];
    salasPorCine: Record<number, any[]> = {};  // almacena salas por cine

    constructor(private cineService: CinesService) { }

    ngOnInit() {
        this.cineService.listar().subscribe(cines => {
            this.cines = cines;

            this.cines.forEach(c => {
                this.cineService.listarSalas(c.id).subscribe(salas => {
                    this.salasPorCine[c.id] = salas;
                });
            });
        });
    }
}