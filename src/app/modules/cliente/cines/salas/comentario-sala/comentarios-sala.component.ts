import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentariosService, ComentarioSala } from '../../../../../core/services/comentarios.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios-sala',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios-sala.component.html'
})
export class ComentariosSalaComponent {
  @Input() salaId!: number;

  comentarios: ComentarioSala[] = [];
  promedio: number = 0;

  nuevoComentario: ComentarioSala = {
    sala: null,
    usuario: null,
    comentario: '',
    calificacion: 0
  };

  constructor(
    private comentariosService: ComentariosService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Intentamos obtener la sala desde la ruta o desde el input
    const idRuta = Number(this.route.snapshot.params['id']);
    if (idRuta) {
      this.salaId = idRuta;
    }

    if (!this.salaId) {
      console.error('ID de sala no definido');
      return;
    }

    this.cargarComentarios();
  }

  cargarComentarios() {
    if (!this.salaId) return;

    this.comentariosService.obtenerComentariosSala(this.salaId)
      .subscribe(data => this.comentarios = data);

    this.comentariosService.obtenerPromedioSala(this.salaId)
      .subscribe(avg => this.promedio = avg);
  }

  agregarComentario() {
    const usuario = this.auth.getUsuario();
    if (!usuario) {
      console.error('Usuario no autenticado');
      return;
    }

    if (!this.salaId) {
      console.error('No hay sala seleccionada para enviar el comentario');
      return;
    }

    const comentarioAEnviar: ComentarioSala = {
      comentario: this.nuevoComentario.comentario,
      calificacion: this.nuevoComentario.calificacion,
      usuario: { id: usuario.id, nombre: usuario.nombre },
      sala: { id: this.salaId }
    };

    console.log('Enviando comentario:', comentarioAEnviar);

    this.comentariosService.crearComentarioSala(comentarioAEnviar)
      .subscribe({
        next: () => {
          console.log('Comentario creado exitosamente');

          // limpiar formulario
          this.nuevoComentario.comentario = '';
          this.nuevoComentario.calificacion = 0;

          // recargar comentarios y promedio
          this.cargarComentarios();
        },
        error: err => {
          console.error('Error al crear comentario', err);
        }
      });
  }

  getNombreUsuario(c: ComentarioSala): string {
    // Evitamos errores si usuario viene solo con id
    return 'usuario' in c.usuario! && c.usuario.nombre
      ? c.usuario.nombre
      : 'Usuario';
  }
}
