import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CarteraService } from '../../../core/services/cartera.service';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { AdsService } from '../../../core/services/ads.service';
import { AuthService } from '../../../core/services/auth.service';
import { AdPeriod, AdType, Anuncio } from '../../../core/models/ad.model';

@Component({
    selector: 'app-anuncio-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './anuncios-form.component.html',
    styleUrls: ['./anuncios-form.component.css']
})
export class AnuncioFormComponent {
    anuncio: Partial<Anuncio> = { tipo: 'texto', titulo: '', descripcion: '' };
    periodo: AdPeriod = '1d';
    precioCalculado = 0;
    modoEdicion = false;

    tipos: { id: AdType, nombre: string }[] = [
        { id: 'texto', nombre: 'Anuncio de texto' },
        { id: 'texto-imagen', nombre: 'Anuncio de texto e imagen' },
        { id: 'video-texto', nombre: 'Anuncio de video y texto' }
    ];

    periodos = [
        { id: '1d', nombre: '1 día' },
        { id: '3d', nombre: '3 días' },
        { id: '7d', nombre: '1 semana' },
        { id: '14d', nombre: '2 semanas' }
    ];

    constructor(
        private cartera: CarteraService,
        private config: ConfiguracionService,
        private ads: AdsService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    calcularPrecio() {
        this.precioCalculado = this.config.calculatePrice(this.anuncio.tipo as AdType, this.periodo);
    }

    guardar() {
        const user = this.auth.getUsuario();
        if (!user) return;

        this.calcularPrecio();
        const id = user.id;

        if (!this.cartera.debit(id, this.precioCalculado)) {
            alert('Saldo insuficiente. Recarga tu cartera antes de comprar.');
            return;
        }

        const dias = this.periodo === '1d' ? 1 : this.periodo === '3d' ? 3 : this.periodo === '7d' ? 7 : 14;
        const inicio = new Date();
        const fin = new Date(inicio.getTime() + dias * 24 * 60 * 60 * 1000);

        const nuevo: Anuncio = {
            id: Date.now(),
            ownerId: id,
            tipo: this.anuncio.tipo as AdType,
            titulo: this.anuncio.titulo || '',
            descripcion: this.anuncio.descripcion || '',
            imagen: this.anuncio.imagen || '',
            videoUrl: this.anuncio.videoUrl || '',
            periodo: this.periodo,
            fechaInicio: inicio.toISOString(),
            fechaFin: fin.toISOString(),
            precioPagado: this.precioCalculado,
            activo: true,
            bloqueadoPor: []
        };

        this.ads.create(nuevo);
        alert('Anuncio comprado y publicado correctamente.');
        this.router.navigate(['/anunciante/anuncios']);
    }
}
