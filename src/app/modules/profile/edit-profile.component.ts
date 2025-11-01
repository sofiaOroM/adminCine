import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
    user: User = { id: 0, nombre: '', correo: '', password: '', rol: '' };

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        const current = this.auth.currentUser;
        if (current) this.user = { ...current };
    }

    saveChanges() {
        this.auth.updateProfile(this.user).subscribe(() => {
            alert('Perfil actualizado correctamente');
            this.router.navigate(['/perfil']);
        });
    }
}