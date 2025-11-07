import { Component } from '@angular/core';
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
