import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentariosService, ComentarioPelicula } from '../../../../core/services/comentarios.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-comentarios-pelicula',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './comentarios-pelicula.component.html'
})
export class ComentariosPeliculaComponent {
    @Input() peliculaId!: number;
    comentarios: ComentarioPelicula[] = [];
    promedio: number = 0;
    nuevoComentario: ComentarioPelicula = { pelicula: null, usuario: null, comentario: '', calificacion: 0 };

    constructor(
        private comentariosService: ComentariosService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.cargarComentarios();
    }
    
    cargarComentarios() {
        this.comentariosService.obtenerComentariosPelicula(this.peliculaId)
        .subscribe(data => this.comentarios = data);
        this.comentariosService.obtenerPromedioPelicula(this.peliculaId)
        .subscribe(avg => this.promedio = avg);
    }

    agregarComentario() {
        const usuario = this.auth.getUsuario();
        this.nuevoComentario.usuario = { id: usuario?.id || 0 };
        this.nuevoComentario.pelicula = { id: this.peliculaId };
        this.comentariosService.crearComentarioPelicula(this.nuevoComentario).subscribe(() => {
        this.nuevoComentario.comentario = '';
        this.nuevoComentario.calificacion = 0;
        this.cargarComentarios();
        });
    }
}
