import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-sistema-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-sistema-sidebar.component.html',
    styleUrls: ['./admin-sistema-sidebar.component.css']
})
export class AdminSidebarComponent {
    constructor(public auth: AuthService) { }
}