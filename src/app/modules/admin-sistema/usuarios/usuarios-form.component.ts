import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { CinesService } from '../../../core/services/cines.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-usuarios-form',
    standalone: true,
    templateUrl: './usuarios-form.component.html',
    imports: [CommonModule, FormsModule]
})
export class UsuariosFormComponent {
    usuario: any = { cine: { id: null } };
    cines: any[] = [];
    modoEdicion = false;

    constructor(
        private usuariosService: UsuariosService,
        private cinesService: CinesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];

        if (id) {
            this.modoEdicion = true;
            this.usuariosService.listar().subscribe(users => {
                const u = users.find(x => x.id === id);
                this.usuario = u || { cine: { id: null } };

                if (!this.usuario.cine) {
                    this.usuario.cine = { id: null };
                }
            });
        }

        this.cinesService.listar().subscribe(c => this.cines = c);
    }

    guardar() {
        this.usuariosService.actualizar(this.usuario.id, this.usuario)
            .subscribe(() => {
                alert("Usuario actualizado");
            });
    }
}

