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
    return this.http.post<User>(`${this.apiUrl}`, newUser);
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

/*import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private fakeUsers: User[] = [
    { id: 1, nombre: 'Admin Cine', correo: 'admin@cine.com', password: '123', rol: 'admin_cine' },
    { id: 2, nombre: 'Cliente', correo: 'cliente@cine.com', password: '123', rol: 'cliente' },
    { id: 3, nombre: 'Anunciante', correo: 'anunciante@cine.com', password: '123', rol: 'anunciante' },
    { id: 4, nombre: 'Admin Sistema', correo: 'adminSistema@cine.com', password: '123', rol: 'admin_sistema' }
  ];

  constructor() {
    const saved = localStorage.getItem('user');
    if (saved) this.currentUserSubject.next(JSON.parse(saved));
  }

  login(correo: string, password: string): Observable<User> {
    const user = this.fakeUsers.find(u => u.correo === correo && u.password === password);
    if (!user) throw new Error('Credenciales inválidas');
    return of(user).pipe(
      delay(500),
      tap(u => {
        localStorage.setItem('user', JSON.stringify(u));
        this.currentUserSubject.next(u);
      })
    );
  }

  register(newUser: User): Observable<User> {
    const exists = this.fakeUsers.some(u => u.correo === newUser.correo);
    if (exists) throw new Error('Usuario ya existe');
    newUser.id = this.fakeUsers.length + 1;
    this.fakeUsers.push(newUser);
    return of(newUser).pipe(delay(500));
  }
  updateProfile(data: Partial<User>): Observable<User> {
    const user = this.currentUserSubject.value;
    if (!user) throw new Error('No autenticado');
    const updated = { ...user, ...data };
    localStorage.setItem('user', JSON.stringify(updated));
    this.currentUserSubject.next(updated);
    return of(updated).pipe(delay(500));
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
    let user = this.currentUserSubject.value;
    if (!user) {
      const saved = localStorage.getItem('user');
      if (saved) {
        user = JSON.parse(saved);
        this.currentUserSubject.next(user);
      }
    }
    return user;
  }
}*/