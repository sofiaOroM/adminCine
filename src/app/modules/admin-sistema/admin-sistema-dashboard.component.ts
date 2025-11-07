import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sistema-sidebar/admin-sistema-sidebar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-sistema-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-sistema-dashboard.component.html',
  styleUrls: ['./admin-sistema-dashboard.component.css']
})
export class AdminSistemaDashboardComponent {
}