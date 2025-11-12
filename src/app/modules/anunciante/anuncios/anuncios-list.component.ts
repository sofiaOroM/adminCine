import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdsService } from '../../../core/services/ads.service';
import { Cartera, CarteraService } from '../../../core/services/cartera.service';
import { AuthService } from '../../../core/services/auth.service';
import { Anuncio } from '../../../core/models/ad.model';


@Component({
    selector: 'app-anuncio-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './anuncios-list.component.html',
    styleUrls: ['./anuncios-list.component.css']
})
export class AnuncioListComponent implements OnInit {
    anuncios: any[] = [];
    user: any;
    saldo: number = 0;

    constructor(
        private anuncioService: AdsService,
        private carteraService: CarteraService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.user = this.auth.getUsuario();
        this.cargarAnuncios();
        this.cargarSaldo();
    }

    cargarAnuncios(): void {
        this.anuncioService.obtenerPorUsuario(this.user?.id || 0).subscribe({
            next: (data) => (this.anuncios = data),
            error: (err) => console.error('Error al cargar anuncios', err),
        });
    }

    cargarSaldo(): void {
        if (!this.user) return;
        this.carteraService.obtenerCartera(this.user.id).subscribe({
            next: (data: Cartera) => (this.saldo = data.saldo),
            error: (err) => console.error('Error al cargar saldo', err),
        });
    }

    toggleActivo(ad: any): void {
        ad.activo = !ad.activo;
    }

    eliminar(ad: any): void {
        if (confirm('¿Seguro que deseas eliminar este anuncio?')) {
            // lógica para eliminar, falta implementar
        }
    }

    getDiasRestantes(ad: any): number {
        const hoy = new Date().getTime();
        const fechaFin = new Date(ad.fechaFin).getTime();
        return Math.max(0, Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24)));
    }
}


/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdsService } from '../../../core/services/ads.service';
import { Cartera, CarteraService } from '../../../core/services/cartera.service';
import { AuthService } from '../../../core/services/auth.service';
import { Anuncio } from '../../../core/models/ad.model';

@Component({
    selector: 'app-anuncio-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './anuncios-list.component.html',
    styleUrls: ['./anuncios-list.component.css']
})
export class AnuncioListComponent implements OnInit {
    anuncios: Anuncio[] = [];
    user: any;
    saldo: number = 0;

    constructor(
        public cartera: CarteraService,
        private ads: AdsService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.user = this.auth.getUsuario();
        this.load();
    }

    load() {
        this.anuncios = this.ads.getAllIncludingInactive()
            .filter(a => a.ownerId === this.user?.id);
    }

    toggleActivo(a: Anuncio) {
        a.activo = !a.activo;
        this.ads.update(a);
        this.load();
    }

    eliminar(a: Anuncio) {
        if (confirm('¿Seguro que deseas eliminar este anuncio?')) {
            this.ads.deactivate(a.id);
            this.load();
        }
    }

    getDiasRestantes(a: Anuncio): number {
        const fin = new Date(a.fechaFin);
        const hoy = new Date();
        return Math.max(0, Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)));
    }
}*/