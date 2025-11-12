import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cartera } from '../models/cartera.model';

export interface User {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  cartera?: Cartera;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/cineBackend/api/usuarios';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('user');
    if (saved) this.currentUserSubject.next(JSON.parse(saved));
  }

  login(correo: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { correo, password }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log('Saldo cartera al iniciar sesión:', user.cartera?.saldo);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUsuario(): User | null {
    return this.currentUserSubject.value;
  }

  register(newUser: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registrar`, newUser);
  }

  updateProfile(updated: Partial<User>): Observable<User> {
    if (!this.currentUser) throw new Error('No hay usuario logueado');
    const userId = this.currentUser.id;
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updated).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }
}