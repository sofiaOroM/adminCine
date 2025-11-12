import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';

@Component({
  selector: 'app-pelicula-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pelicula-form.component.html',
  styleUrls: ['./pelicula-form.component.css']
})
export class PeliculaFormComponent {
  pelicula: Pelicula = { id: 0, titulo: '', genero: '', duracion: 0, clasificacion: '', sinopsis: '' };
  modoEdicion = false;

  constructor(
    private peliculasService: PeliculasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-pelicula-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './peliculas-form.component.html',
    styleUrls: ['./pelicula-form.component.css']
})
export class PeliculaFormComponent {
    pelicula: Pelicula = { titulo: '', genero: '', duracion: 0, clasificacion: '', sinopsis: '' };
    modoEdicion = false;
    cargando = false;
    error = '';

    constructor(
        private peliculasService: PeliculasService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.modoEdicion = true;
            this.cargando = true;
            this.peliculasService.getPeliculaById(+id).subscribe({
                next: (p) => {
                    this.pelicula = p;
                    this.cargando = false;
                },
                error: (err) => {
                    console.error(err);
                    this.error = 'No se pudo cargar la película';
                    this.cargando = false;
                }
            });
        }
    }

    guardar() {
        this.cargando = true;
        this.error = '';

        let obs: Observable<Pelicula>;
        if (this.modoEdicion && this.pelicula.id) {
            obs = this.peliculasService.updatePelicula(this.pelicula);
        } else {
            obs = this.peliculasService.addPelicula(this.pelicula);
        }

        obs.subscribe({
            next: () => {
                alert(this.modoEdicion ? 'Película actualizada correctamente' : 'Película registrada correctamente');
                this.router.navigate(['/admin/peliculas']);
                this.cargando = false;
            },
            error: (err) => {
                console.error(err);
                this.error = 'Ocurrió un error al guardar la película';
                this.cargando = false;
            }
        });
    }
}*/