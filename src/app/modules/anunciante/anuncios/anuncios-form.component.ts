import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CarteraService } from '../../../core/services/cartera.service';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { AdsService } from '../../../core/services/ads.service';
import { AuthService } from '../../../core/services/auth.service';
import { AdPeriod, AdType, Anuncio, AnuncioBackend } from '../../../core/models/ad.model';

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

  private periodMap: { [key in AdPeriod]: number } = {
    '1d': 1,
    '3d': 3,
    '7d': 7,
    '14d': 14
  };

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
    if (!user) {
      alert('No se encontró usuario. Inicia sesión nuevamente.');
      return;
    }

    this.calcularPrecio();

    const dias = this.periodMap[this.periodo] || 1;
    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio.getTime() + dias * 24 * 60 * 60 * 1000);

    const nuevoAnuncio: Anuncio = {
        ownerId: user.id,
        tipo: this.anuncio.tipo as AdType,
        titulo: this.anuncio.titulo || '',
        descripcion: this.anuncio.descripcion || '',
        imagen: this.anuncio.imagen || '',
        videoUrl: this.anuncio.videoUrl || '',
        periodo: this.periodo,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        costo: this.precioCalculado,
        activo: true,
        id: 0,
        bloqueadoPor: []
    };

    const backendAd = new AnuncioBackend(nuevoAnuncio);

    this.cartera.debitar(user.id, this.precioCalculado).subscribe({
      next: () => {
        this.ads.create(backendAd).subscribe({
          next: () => {
            console.log('Anuncio creado con éxito', nuevoAnuncio);
            alert('Anuncio comprado y publicado correctamente.');
            this.router.navigate(['/anunciante/anuncios']);
          },
          error: (err) => {
            console.error('Error al crear anuncio:', err);
            alert('Ocurrió un error al publicar el anuncio.');
          }
        });
      },
      error: (err) => {
        console.error('Error al debitar saldo:', err);
        alert('Ocurrió un error al debitar el saldo. Inténtalo nuevamente.');
      }
    });
  }
}
