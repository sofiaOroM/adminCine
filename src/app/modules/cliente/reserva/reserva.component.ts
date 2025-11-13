import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';

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
        public router: Router,
        private funcionesService: FuncionesService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];

        this.funcionesService.getFuncionById(id).subscribe({
            next: (data) => {
                this.funcion = data;
                console.log('Función cargada:', this.funcion);
            },
            error: (err) => console.error('Error al obtener función:', err)
        });
    }

    reservar() {
        if (!this.funcion) return;

        const pelicula = this.funcion.pelicula.titulo;
        const sala = this.funcion.sala.nombre;
        const total = this.cantidad * this.funcion.precio;

        alert(`Reserva completada: Cliente: ${this.nombre}
                Película: ${pelicula}
                Sala: ${sala}
                Boletos: ${this.cantidad}
                Total: Q${total}`);
        this.router.navigate(['/cliente/cartelera']);
    }
}


/*import { Component } from '@angular/core';
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
    peliculaTitulo: string = '';

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private funcionesService: FuncionesService,
        private peliculasService: PeliculasService,
        private salasService: SalasService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.funcion = this.funcionesService.getFuncionById(id);
    }

    getPeliculaTitulo() {
        if (!this.funcion) return;

        this.peliculasService.getPeliculaById(this.funcion.peliculaId).subscribe({
            next: (pelicula) => {
                this.peliculaTitulo = pelicula.titulo;
            },
            error: (err) => console.error('Error al obtener título de película:', err)
        });
    }

    getSalaNombre() {
        return this.funcion ? this.salasService.getSalaById(this.funcion.salaId)?.nombre : '';
    }

    reservar() {
        alert(`¡Reserva completada!\nCliente: ${this.nombre}\nPelícula: ${this.getPeliculaTitulo()}\nBoletos: ${this.cantidad}\nTotal: Q${this.cantidad * (this.funcion?.precio || 0)}`);
        this.router.navigate(['/cliente/cartelera']);
    }
}*/