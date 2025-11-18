import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { EditProfileComponent } from './modules/profile/edit-profile.component';
import { AuthGuard } from './core/guards/auth.guard';

import { AdminSistemaDashboardComponent } from './modules/admin-sistema/admin-sistema-dashboard.component';
import { CinesListComponent } from './modules/admin-sistema/cines/cines-list.component';
import { CineFormComponent } from './modules/admin-sistema/cines/cine-form.component';
import { UsuariosListComponent } from './modules/admin-sistema/usuarios/usuarios-list.component';
import { UsuariosFormComponent } from './modules/admin-sistema/usuarios/usuarios-form.component';
import { ReportesComponent } from './modules/admin-sistema/reportes/reportes.component';
import { ConfiguracionComponent } from './modules/admin-sistema/configuracion/configuracion.component';

import { AdminDashboardComponent } from './modules/admin/admin-dashboard.component';
import { SalasListComponent } from './modules/admin/salas/salas-list.component';
import { PeliculasListComponent } from './modules/admin/peliculas/peliculas-list.component';
import { FuncionesListComponent } from './modules/admin/funciones/funciones-list.component';
import { SalaFormComponent } from './modules/admin/salas/sala-form.component';
import { PeliculaFormComponent } from './modules/admin/peliculas/pelicula-form.component';
import { FuncionFormComponent } from './modules/admin/funciones/funcion-form.component';
import { BloquearAnunciosComponent } from './modules/admin/bloquear-anuncios/bloquear-anuncios.component';

import { AnuncianteDashboardComponent } from './modules/anunciante/anunciante-dashboard.component';
import { AnuncioListComponent } from './modules/anunciante/anuncios/anuncios-list.component';
import { AnuncioFormComponent } from './modules/anunciante/anuncios/anuncios-form.component';
import { CarteraComponent } from './shared/cartera/cartera.component';

import { CarteleraComponent } from './modules/cliente/cartelera/cartelera.component';
import { DetallePeliculaComponent } from './modules/cliente/detalle-pelicula/detalle-pelicula.component';
import { ReservaComponent } from './modules/cliente/reserva/reserva.component';
import { AdSidebarComponent } from './modules/cliente/ad-sidebar/ad-sidebar.component';


import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'perfil/editar', component: EditProfileComponent, canActivate: [AuthGuard] },
            {
                path: 'admin-sistema',
                component: AdminSistemaDashboardComponent,
                children: [
                    { path: 'cines', component: CinesListComponent },
                    { path: 'cines/nuevo', component: CineFormComponent },
                    { path: 'cines/editar/:id', component: CineFormComponent },
                    { path: 'usuarios', component: UsuariosListComponent },
                    { path: 'usuarios/nuevo', component: UsuariosFormComponent },
                    { path: 'usuarios/editar/:id', component: UsuariosFormComponent },
                    { path: 'configuracion', component: ConfiguracionComponent },
                    { path: 'reportes', component: ReportesComponent },
                    { path: '', redirectTo: 'cines', pathMatch: 'full' }
                ]
            },
            {
                path: 'admin',
                component: AdminDashboardComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'salas', component: SalasListComponent },
                    { path: 'salas/nueva', component: SalaFormComponent },
                    { path: 'salas/editar/:id', component: SalaFormComponent },
                    { path: 'peliculas', component: PeliculasListComponent },
                    { path: 'peliculas/nueva', component: PeliculaFormComponent },
                    { path: 'peliculas/editar/:id', component: PeliculaFormComponent },
                    { path: 'funciones', component: FuncionesListComponent },
                    { path: 'funciones/nueva', component: FuncionFormComponent },
                    { path: 'funciones/editar/:id', component: FuncionFormComponent },
                    { path: 'bloquear-anuncios', component: BloquearAnunciosComponent },
                    { path: '', redirectTo: 'salas', pathMatch: 'full' }
                ]
            },
            {
                path: 'anunciante',
                component: AnuncianteDashboardComponent,
                children: [
                    { path: 'cartera', component: CarteraComponent },
                    { path: 'anuncios', component: AnuncioListComponent },
                    { path: 'anuncio', component: AnuncioFormComponent },
                    { path: 'anuncios/nuevo', component: AnuncioFormComponent },
                    { path: 'anuncios/editar/:id', component: AnuncioFormComponent },
                    { path: '', redirectTo: 'anuncios', pathMatch: 'full' }
                ]
            },
            {
                path: 'cliente',
                children: [
                    { path: 'cliente', component: AdSidebarComponent },
                    { path: 'cartelera', component: CarteleraComponent },
                    { path: 'pelicula/:id', component: DetallePeliculaComponent },
                    { path: 'reserva/:id', component: ReservaComponent },
                    { path: '', redirectTo: 'cartelera', pathMatch: 'full' }
                ]
            }
        ]
    }
];