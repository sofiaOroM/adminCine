import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloquearService } from '../../../core/services/bloquear.service';
import { CarteraService } from '../../../core/services/cartera.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-bloquear-anuncios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bloquear-anuncios.component.html'
})
export class BloquearAnunciosComponent {
  dias = 1;
  mensaje = '';
  constructor(private bloqueos: BloquearService, private cartera: CarteraService, private auth: AuthService) {}

  bloquear() {
    const admin = this.auth.getUsuario();
    if (!admin) return;
    const cineId = 1; 
    const bloqueado = this.bloqueos.createBlock(cineId, admin.id, this.dias);
    if (bloqueado) {
      this.mensaje = `Bloqueo activado hasta ${new Date(bloqueado.fechaFin).toLocaleDateString()}`;
    } else {
      this.mensaje = 'Saldo insuficiente en la cartera del cine.';
    }
  }
}
