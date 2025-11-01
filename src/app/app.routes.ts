import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { EditProfileComponent } from './modules/profile/edit-profile.component';
import { AuthGuard } from './core/guards/auth.guard';

import { AdminDashboardComponent } from './modules/admin/admin-dashboard.component';
import { SalasListComponent } from './modules/admin/salas/salas-list.component';
import { PeliculasListComponent } from './modules/admin/peliculas/peliculas-list.component';
import { FuncionesListComponent } from './modules/admin/funciones/funciones-list.component';
import { SalaFormComponent } from './modules/admin/salas/sala-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'perfil/editar', component: EditProfileComponent, canActivate: [AuthGuard] },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'salas', component: SalasListComponent },
            { path: 'salas/nueva', component: SalaFormComponent },
            { path: 'salas/editar/:id', component: SalaFormComponent },
            { path: 'peliculas', component: PeliculasListComponent },
            { path: 'funciones', component: FuncionesListComponent },
            { path: '', redirectTo: 'salas', pathMatch: 'full' }
        ]
    }
];