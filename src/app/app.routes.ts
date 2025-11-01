import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { EditProfileComponent } from './modules/profile/edit-profile.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'perfil/editar', component: EditProfileComponent, canActivate: [AuthGuard] }
];