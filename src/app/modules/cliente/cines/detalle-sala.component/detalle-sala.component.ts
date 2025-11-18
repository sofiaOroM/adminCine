import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SalasService} from '../../../../core/services/salas.service';
import { Sala } from '../../../../core/models/sala.model';
import { ComentariosSalaComponent } from '../salas/comentario-sala/comentarios-sala.component';

@Component({
  selector: 'app-detalle-sala',
  standalone: true,
  imports: [
    CommonModule,
    ComentariosSalaComponent
  ],
  templateUrl: './detalle-sala.component.html',
})
export class DetalleSalaComponent {

  sala!: Sala;

  constructor(
    private route: ActivatedRoute,
    private salasService: SalasService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.salasService.getSalaById(id).subscribe({
      next: s => this.sala = s
    });
  }
}
