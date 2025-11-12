import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarteraService, Cartera } from '../../core/services/cartera.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent {
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
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-cartera',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cartera.component.html',
    styleUrls: ['./cartera.component.css']
})
export class CarteraComponent {
    monto = 0;
    saldo = 0;

    constructor(private auth: AuthService) { }
    ngOnInit() {
        this.auth.currentUser$.subscribe(user => {
            this.saldo = user?.cartera?.saldo ?? 0;
        });
    }

    recargar() {
        if (this.monto > 0) {
            const user = this.auth.getUsuario();
            if (user && user.cartera) {
                user.cartera.saldo += this.monto;

                localStorage.setItem('user', JSON.stringify(user));
                this.auth['currentUserSubject'].next(user);

                this.monto = 0;
                alert('Recarga exitosa');
            }
        }
    }*/
    /*ngOnInit() {
        this.actualizarSaldo();
    }

    actualizarSaldo() {
        const id = this.auth.getUsuario()?.id || 0;
        this.saldo = this.cartera.getBalance(id);
    }

    recargar() {
        if (this.monto > 0) {
            const id = this.auth.getUsuario()?.id || 0;
            this.cartera.credit(id, this.monto);
            this.monto = 0;
            this.actualizarSaldo();
            alert('Recarga exitosa');
        }
    }
}*/
