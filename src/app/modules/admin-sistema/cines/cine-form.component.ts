import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cine-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './cine-form.component.html'
})
export class CineFormComponent {
    cine = { id: 0, nombre: '', direccion: '', administrador: '' };
    modoEdicion = false;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.modoEdicion = true;
            this.cine = { id: +id, nombre: 'Cine Majestic', direccion: 'Zona 10', administrador: 'Sofía Orozco' };
        }
    }

    guardar() {
        alert(`Cine ${this.modoEdicion ? 'actualizado' : 'creado'} correctamente`);
        this.router.navigate(['/admin-sistema/cines']);
    }
}