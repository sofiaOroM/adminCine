import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalasService, Sala } from '../../../core/services/salas.service';

@Component({
    selector: 'app-sala-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sala-form.component.html',
    styleUrls: ['./sala-form.component.css']
})
export class SalaFormComponent {
    sala: Sala = { id: 0, nombre: '', capacidad: 0, descripcion: '' };
    modoEdicion = false;

    constructor(
        private salasService: SalasService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            const encontrada = this.salasService.getSalaById(+id);
            if (encontrada) {
                this.sala = { ...encontrada };
                this.modoEdicion = true;
            }
        }
    }

    guardar() {
        if (this.modoEdicion) {
            this.salasService.updateSala(this.sala);
            alert('Sala actualizada correctamente');
        } else {
            this.salasService.addSala(this.sala);
            alert('Sala creada correctamente');
        }
        this.router.navigate(['/admin/salas']);
    }
}