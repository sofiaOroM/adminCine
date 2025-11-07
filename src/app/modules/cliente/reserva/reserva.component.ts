import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
    selector: 'app-reserva',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
    funcion?: Funcion;
    nombre = '';
    cantidad = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private funcionesService: FuncionesService,
        private peliculasService: PeliculasService,
        private salasService: SalasService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.funcion = this.funcionesService.getFuncionById(id);
    }

    getPeliculaTitulo(): Observable<string> {
        if (!this.funcion) return of(''); // importar 'of' desde 'rxjs'
        return this.peliculasService.getPeliculaById(this.funcion.peliculaId).pipe(
            map(pelicula => pelicula.titulo),
            catchError(() => of('Desconocida'))
        );
    }


    getSalaNombre() {
        return this.funcion ? this.salasService.getSalaById(this.funcion.salaId)?.nombre : '';
    }

    reservar() {
        alert(`¡Reserva completada!\nCliente: ${this.nombre}\nPelícula: ${this.getPeliculaTitulo()}\nBoletos: ${this.cantidad}\nTotal: Q${this.cantidad * (this.funcion?.precio || 0)}`);
        this.router.navigate(['/cliente/cartelera']);
    }
}