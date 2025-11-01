import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    
    user: User = { id: 0, nombre: '', correo: '', password: '', rol: 'cliente' };
    error = '';
    success = '';

    constructor(private auth: AuthService, private router: Router) { }

    register() {
        this.auth.register(this.user).subscribe({
            next: () => {
                this.success = 'Cuenta creada exitosamente';
                setTimeout(() => this.router.navigate(['/login']), 1500);
            },
            error: () => (this.error = 'El usuario ya existe o los datos son inválidos.')
        });
    }
}