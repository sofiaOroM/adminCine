import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsService } from '../../../core/services/ads.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-cliente-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cliente-sidebar.component.html',
    styleUrls: ['./cliente-sidebar.component.css']
})
export class ClienteSidebarComponent {
    anuncios: any[] = [];

    constructor(private ads: AdsService,
        public auth: AuthService
    ) { }

    ngOnInit() {
        this.actualizarAnuncios();
        setInterval(() => this.actualizarAnuncios(), 15000);
    }

    actualizarAnuncios() {
        const todos = this.ads.getVisibleForCinema();
        this.anuncios = shuffle(todos).slice(0, 2);
    }
}

function shuffle(arr: any[]) {
    return arr.sort(() => Math.random() - 0.5);
}
