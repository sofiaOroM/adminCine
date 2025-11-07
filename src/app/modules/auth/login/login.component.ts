import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

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
            next: (user: User) => {
                switch (user.rol) {
                    case 'admin_sistema':
                        this.router.navigate(['/admin-sistema']);
                        break;
                    case 'admin_cine':
                        this.router.navigate(['/admin']);
                        break;
                    case 'anunciante':
                        this.router.navigate(['/anunciante']);
                        break;
                    case 'cliente':
                    default:
                        this.router.navigate(['/cliente']);
                        break;
                }
            },
            error: (err) => {
                console.error('Error de login:', err);
                if (err.status === 401) {
                    this.error = 'Correo o contraseña incorrectos';
                } else {
                    this.error = 'Ocurrió un error al iniciar sesión';
                }
            }
        });
    }
}
