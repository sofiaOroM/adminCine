import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-sistema-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sistema-dashboard.component.html',
  styleUrls: ['./admin-sistema-dashboard.component.css']
})
export class AdminSistemaDashboardComponent {
  constructor(public auth: AuthService) {}
}
