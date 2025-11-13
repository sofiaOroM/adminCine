import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
  funciones: Funcion[] = [];
  funcionesFiltradas: Funcion[] = [];
  filtro: string = '';

  constructor(private funcionesService: FuncionesService) {}

  ngOnInit() {
    this.funcionesService.getFunciones().subscribe({
      next: (funciones) => {
        this.funciones = funciones;
        this.funcionesFiltradas = [...funciones];
      },
      error: (err) => console.error('Error al cargar funciones:', err)
    });
  }

  filtrar() {
    const f = this.filtro.toLowerCase();
    this.funcionesFiltradas = this.funciones.filter(func =>
      func.pelicula.titulo.toLowerCase().includes(f)
    );
  }
}

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cartelera',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './cartelera.component.html',
    styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
    funciones: Funcion[] = [];
    funcionesFiltradas: Funcion[] = [];
    filtro: string = '';

    peliculasMap: { [id: number]: Pelicula } = {};

    constructor(
        private funcionesService: FuncionesService,
        private peliculasService: PeliculasService,
        private salasService: SalasService
    ) { }

    ngOnInit() {
        this.funcionesService.getFunciones().subscribe({
            next: (funciones) => {
                this.funciones = funciones;

                funciones.forEach(func => {
                    this.peliculasService.getPeliculaById(func.peliculaId).subscribe({
                        next: (pelicula) => {
                            this.peliculasMap[func.peliculaId] = pelicula;
                        },
                        error: (err) => console.error('Error al obtener película:', err)
                    });
                });
            },
            error: (err) => console.error('Error al cargar funciones:', err)
        });
    }

    getPelicula(id: number): Pelicula | undefined {
        return this.peliculasMap[id];
    }

    getSala(id: number) {
        return this.salasService.getSalaById(id);
    }

    filtrar() {
        const f = this.filtro.toLowerCase();
        this.funcionesFiltradas = this.funciones.filter(func => {
            const pelicula = this.getPelicula(func.peliculaId);
            return pelicula?.titulo.toLowerCase().includes(f);
        });
    }
}*/
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService, Pelicula } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cartelera',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './cartelera.component.html',
    styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
    funciones: Funcion[] = [];
    funcionesFiltradas: Funcion[] = [];
    filtro: string = '';

    peliculasMap: { [id: number]: Pelicula } = {};

    constructor(
        private funcionesService: FuncionesService,
        private peliculasService: PeliculasService,
        private salasService: SalasService
    ) { }

    ngOnInit() {
        this.funciones = this.funcionesService.getFunciones();

        this.funciones.forEach(func => {
            const pelicula = this.peliculasService.getPeliculaById(func.peliculaId);
            if (pelicula) {
                this.peliculasMap[func.peliculaId] = pelicula;
            }
        });

        this.funcionesFiltradas = [...this.funciones];
    }


    getPelicula(id: number): Pelicula | undefined {
        return this.peliculasMap[id];
    }

    getSala(id: number) {
        return this.salasService.getSalaById(id);
    }

    filtrar() {
        const f = this.filtro.toLowerCase();
        this.funcionesFiltradas = this.funciones.filter(func => {
            const pelicula = this.getPelicula(func.peliculaId);
            return pelicula?.titulo.toLowerCase().includes(f);
        });
    }
}*/