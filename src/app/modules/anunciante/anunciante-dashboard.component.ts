import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-anunciante-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './anunciante-dashboard.component.html',
    styleUrls: ['./anunciante-dashboard.component.css']
})
export class AnuncianteDashboardComponent {
    constructor(public auth: AuthService) { }
}
