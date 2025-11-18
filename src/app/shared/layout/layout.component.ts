import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ClienteSidebarComponent } from '../../modules/cliente/cliente-sidebar/cliente-sidebar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule,
         RouterModule],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    constructor(private auth: AuthService, private router: Router) { }
    user: any;

    ngOnInit(): void {
        this.user = this.auth.getUsuario();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
