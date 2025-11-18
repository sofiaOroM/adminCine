import { Component } from '@angular/core';
import { ClienteSidebarComponent } from './cliente-sidebar/cliente-sidebar.component';
import { AnunciosPanelComponent } from './anuncios-panel/anuncios-panel.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [
    ClienteSidebarComponent,
    AnunciosPanelComponent,
    RouterOutlet
  ],
  templateUrl: './cliente-dashboard.component.html',
})
export class ClienteDashboardComponent {}
