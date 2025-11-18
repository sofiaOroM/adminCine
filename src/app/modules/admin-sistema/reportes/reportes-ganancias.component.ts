import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../../core/services/reportes.service';

@Component({
    selector: 'app-reportes-ganancias',
    standalone: true,
    templateUrl: './reportes-ganancias.component.html',
    imports: [CommonModule, FormsModule]
})
export class ReportesGananciasComponent {

    desde!: string;
    hasta!: string;

    constructor(private reportes: ReportesService) { }

    descargar() {
        this.reportes.descargarReporteGanancias(this.desde, this.hasta).subscribe((blob: any) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_ganancias.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }, err => {
            console.error('Error descargando reporte', err);
            alert('Error generando reporte en el servidor.');
        });
    }
}

