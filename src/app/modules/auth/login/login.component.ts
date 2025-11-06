import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    correo = '';
    password = '';
    error = '';

    constructor(private auth: AuthService, private router: Router) { }

    login() {
        this.auth.login(this.correo, this.password).subscribe({
            next: () => this.router.navigate(['/admin']),
            error: () => (this.error = 'Credenciales incorrectas')
        });
    }
}