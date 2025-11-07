import { Injectable } from '@angular/core';
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
}