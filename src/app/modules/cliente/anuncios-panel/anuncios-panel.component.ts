import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../../core/services/ads.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anuncios-panel',
  standalone: true,
  templateUrl: './anuncios-panel.component.html',
  styleUrls: ['./anuncios-panel.component.css'],
  imports: [CommonModule]
})
export class AnunciosPanelComponent {

  anuncios: any[] = [];

  constructor(private adsService: AdsService) {}

  ngOnInit() {
    this.adsService.getAnunciosActivos().subscribe({
      next: (data: any[]) => this.anuncios = data,   
      error: (err: any) => console.error('Error cargando anuncios:', err)
    });
  }
}


