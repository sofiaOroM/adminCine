import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdsService } from '../../../core/services/ads.service';
import { CarteraService } from '../../../core/services/cartera.service';
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
}