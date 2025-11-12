import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdType, AdPeriod, PricingSettings } from '../../../core/models/configuracion.model';
import { ConfiguracionService } from '../../../core/services/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html'
})
export class ConfiguracionComponent implements OnInit {
  settings!: PricingSettings;
  adTypes = Object.values(AdType);
  adPeriods = Object.values(AdPeriod);

  constructor(private configService: ConfiguracionService) {}

  ngOnInit() {
    this.settings = this.configService.getSettings();
  }

  guardar() {
    this.configService.update(this.settings);
    alert('Configuración guardada correctamente');
  }
}

/*import { Component, OnInit } from '@angular/core';
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
    settings!: PricingSettings;

    constructor(private configService: ConfiguracionService) { }

    ngOnInit() {
        this.settings = this.configService.getSettings();
    }

    guardar() {
        this.configService.update(this.settings);
        alert('Configuración guardada correctamente');
    }
}*/
