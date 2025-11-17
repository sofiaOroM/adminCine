import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentariosService, ComentarioSala } from '../../../../core/services/comentarios.service';

@Component({
  selector: 'app-comentarios-sala',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  templateUrl: './comentarios-sala.component.html',
  styleUrls: ['./comentarios-sala.component.css']
})
export class ComentariosSalaComponent {
  @Input() salaId!: number;
  comentarios: ComentarioSala[] = [];
  promedio: number = 0;
  nuevoComentario: ComentarioSala = { sala: null, usuario: null, comentario: '', calificacion: 0 };

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit() {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentariosService.obtenerComentariosSala(this.salaId).subscribe((data) => {
      this.comentarios = data;
    });
    this.comentariosService.obtenerPromedioSala(this.salaId).subscribe((avg) => {
      this.promedio = avg;
    });
  }

  agregarComentario() {
    this.nuevoComentario.sala = { id: this.salaId };
    this.comentariosService.crearComentarioSala(this.nuevoComentario).subscribe(() => {
      this.nuevoComentario.comentario = '';
      this.nuevoComentario.calificacion = 0;
      this.cargarComentarios();
    });
  }
}
