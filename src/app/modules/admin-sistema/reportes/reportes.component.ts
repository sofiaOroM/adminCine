import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  gananciasTotales = 0;
  anunciosActivos = 0;
  anunciosInactivos = 0;
  gananciasPorAnunciante: { [key: string]: number } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/cineBackend/api/reportes/ganancias')
      .subscribe(res => this.gananciasTotales = res.gananciaTotal);

    this.http.get<any>('http://localhost:8080/cineBackend/api/reportes/anuncios')
      .subscribe(res => {
        this.anunciosActivos = res.activos;
        this.anunciosInactivos = res.inactivos;
      });

    this.http.get<any>('http://localhost:8080/cineBackend/api/reportes/ganancias-anunciantes')
      .subscribe(res => this.gananciasPorAnunciante = res);
  }
}

/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { CarteraService } from '../../../core/services/cartera.service';
import { AdsService } from '../../../core/services/ads.service';

Chart.register(...registerables);

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  ingresosPorTipo: any = {};
  anunciosActivos = 0;
  anunciosInactivos = 0;
  topAnunciantes: any[] = [];

  constructor(
    private configService: ConfiguracionService,
    private carteraService: CarteraService,
    private anuncioService: AdsService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const anuncios = this.anuncioService.getAll();

    this.ingresosPorTipo = anuncios.reduce((acc: any, a: any) => {
      const tipo = a.tipo;
      acc[tipo] = (acc[tipo] || 0) + (a.precio || 0);
      return acc;
    }, {});

    this.anunciosActivos = anuncios.filter(a => a.activo).length;
    this.anunciosInactivos = anuncios.filter(a => !a.activo).length;

    const mapaAnunciantes: Record<string, number> = {};
    for (const a of anuncios) {
      mapaAnunciantes[a.ownerId] = (mapaAnunciantes[a.ownerId] || 0) + (a.precioPagado || 0);
    }

    this.topAnunciantes = Object.entries(mapaAnunciantes)
      .map(([id, total]) => ({ id, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    this.generarGraficas();
  }

  generarGraficas() {
    const ctx1 = document.getElementById('chartIngresos') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: Object.keys(this.ingresosPorTipo),
        datasets: [
          {
            label: 'Ingresos por tipo de anuncio',
            data: Object.values(this.ingresosPorTipo),
          },
        ],
      },
    });

    const ctx2 = document.getElementById('chartEstado') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Activos', 'Inactivos'],
        datasets: [
          {
            label: 'Cantidad de anuncios',
            data: [this.anunciosActivos, this.anunciosInactivos],
          },
        ],
      },
    });
  }
}*/
/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-reportes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reportes.component.html'
})
export class ReportesComponent {
    totalVentas = 12500;
    totalClientes = 58;
    totalFunciones = 14;
}
*/