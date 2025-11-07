import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsService } from '../../../core/services/ads.service';

@Component({
    selector: 'app-ad-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ad-sidebar.component.html',
    styleUrls: ['./ad-sidebar.component.css']
})
export class AdSidebarComponent {
    anuncios: any[] = [];

    constructor(private ads: AdsService) { }

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
