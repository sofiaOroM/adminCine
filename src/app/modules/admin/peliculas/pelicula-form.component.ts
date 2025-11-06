import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';

@Component({
    selector: 'app-pelicula-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './peliculas-form.component.html',
    styleUrls: ['./pelicula-form.component.css']
})
export class PeliculaFormComponent {
    pelicula: Pelicula = { id: 0, titulo: '', genero: '', duracion: 0, clasificacion: '', sinopsis: '' };
    modoEdicion = false;

    constructor(
        private peliculasService: PeliculasService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            const encontrada = this.peliculasService.getPeliculaById(+id);
            if (encontrada) {
                this.pelicula = { ...encontrada };
                this.modoEdicion = true;
            }
        }
    }

    guardar() {
        if (this.modoEdicion) {
            this.peliculasService.updatePelicula(this.pelicula);
            alert('Película actualizada correctamente');
        } else {
            this.peliculasService.addPelicula(this.pelicula);
            alert('Película registrada correctamente');
        }
        this.router.navigate(['/admin/peliculas']);
    }
}
