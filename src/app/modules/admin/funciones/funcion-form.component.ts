import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';

@Component({
  selector: 'app-funcion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcion-form.component.html',
  styleUrls: ['./funcion-form.component.css']
})
export class FuncionFormComponent {
  funcion: Funcion = { id: 0, peliculaId: 0, salaId: 0, fecha: '', hora: '', precio: 0 };
  modoEdicion = false;

  peliculas: any[] = [];
  salas: any[] = [];

  constructor(
    private funcionesService: FuncionesService,
    private peliculasService: PeliculasService,
    private salasService: SalasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.peliculas = this.peliculasService.getPeliculas();
    this.salas = this.salasService.getSalas();

    const id = this.route.snapshot.params['id'];
    if (id) {
      const encontrada = this.funcionesService.getFuncionById(+id);
      if (encontrada) {
        this.funcion = { ...encontrada };
        this.modoEdicion = true;
      }
    }
  }

  guardar() {
    if (this.modoEdicion) {
      this.funcionesService.updateFuncion(this.funcion);
      alert('Función actualizada correctamente');
    } else {
      this.funcionesService.addFuncion(this.funcion);
      alert('Función creada correctamente');
    }
    this.router.navigate(['/admin/funciones']);
  }
}

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionesService, Funcion } from '../../../core/services/funciones.service';
import { PeliculasService } from '../../../core/services/peliculas.service';
import { SalasService } from '../../../core/services/salas.service';

@Component({
  selector: 'app-funcion-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcion-form.component.html',
  styleUrls: ['./funcion-form.component.css']
})
export class FuncionFormComponent {
  funcion: Funcion = { id: 0, peliculaId: 0, salaId: 0, fecha: '', hora: '', precio: 0 };
  modoEdicion = false;

  peliculas: any[] = [];
  salas: any[] = [];

  constructor(
    private funcionesService: FuncionesService,
    private peliculasService: PeliculasService,
    private salasService: SalasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.peliculasService.getPeliculas().subscribe({
      next: (data) => this.peliculas = data,
      error: (err) => console.error('Error al cargar películas', err)
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      const encontrada = this.funcionesService.getFuncionById(+id);
      if (encontrada) {
        this.funcion = { ...encontrada };
        this.modoEdicion = true;
      }
    }
  }


  guardar() {
    if (this.modoEdicion) {
      this.funcionesService.updateFuncion(this.funcion);
      alert('Función actualizada correctamente');
    } else {
      this.funcionesService.addFuncion(this.funcion);
      alert('Función creada correctamente');
    }
    this.router.navigate(['/admin/funciones']);
  }
}*/