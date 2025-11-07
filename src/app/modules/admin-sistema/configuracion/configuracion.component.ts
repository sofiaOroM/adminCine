import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { PricingSettings } from '../../../core/models/configuracion.model';

@Component({
    selector: 'app-configuracion',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './configuracion.component.html'
})

export class ConfiguracionComponent implements OnInit {
    config!: PricingSettings;

    constructor(private configService: ConfiguracionService) { }

    ngOnInit() {
        this.config = this.configService.getSettings(); // ✅ ahora se inicializa correctamente
    }

    guardar() {
        this.configService.update(this.config);
        alert('Configuración guardada correctamente');
    }
}
