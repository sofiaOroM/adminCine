import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CinesService } from '../../../core/services/cines.service';

@Component({
    selector: 'app-cine-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './cine-form.component.html'
})
export class CineFormComponent {
    cine = { nombre: '', direccion: '', cartera: 0 };
    modoEdicion = false;

    constructor(private cineService: CinesService,
        private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];

        if (id) {
            this.modoEdicion = true;
            this.cineService.listar().subscribe(cines => {
                const c = cines.find(x => x.id === id);
                this.cine = c || { nombre: '', direccion: '', cartera: 0 };
            });
        }
    }
    guardar() {
        this.cineService.crear(this.cine).subscribe(() => {
            this.router.navigate(['/admin-sistema/cines']);
        });
    }
}