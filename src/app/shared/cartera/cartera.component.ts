import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarteraService } from '../../core/services/cartera.service';
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

    constructor(private cartera: CarteraService, private auth: AuthService) { }

    ngOnInit() {
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
}
