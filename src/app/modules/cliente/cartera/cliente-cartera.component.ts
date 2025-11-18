import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarteraService, Cartera } from '../../../core/services/cartera.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app--cliente-cartera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class ClienteCarteraComponent {
  saldo = 0;
  monto = 0;
  cargando = false;

  constructor(
    private carteraService: CarteraService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.cargarSaldo();
  }

  cargarSaldo() {
    const usuario = this.auth.getUsuario();
    if (usuario) {
        console.log('Cargando saldo para usuario ID:', usuario.id);
      this.carteraService.obtenerCartera(usuario.id).subscribe({
        next: (cartera) => (this.saldo = cartera.saldo),
        error: (err) => console.error('Error al obtener cartera:', err)
      });
    }
  }

  recargar() {
    const usuario = this.auth.getUsuario();
    if (!usuario) return;

    if (this.monto <= 0) {
      alert('Ingrese un monto válido');
      return;
    }
console.log('Iniciando recarga de:', this.monto, 'para usuario ID:', usuario.id);
    this.cargando = true;
    this.carteraService.recargar(usuario.id, this.monto).subscribe({
      next: () => {
        alert('Recarga exitosa');
        this.monto = 0;
        this.cargarSaldo();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al recargar:', err);
        alert('Ocurrió un error al recargar');
        this.cargando = false;
      }
    });
  }
}