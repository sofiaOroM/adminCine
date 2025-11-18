import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cartera } from "./cartera.service";
import { Observable } from "rxjs";

export interface User {
  id: number;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  cartera?: Cartera;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
    private apiUrl = 'http://localhost:8080/cineBackend/api/usuarios';

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<any[]>(`${this.apiUrl}/listar`);
    }

    actualizar(id: number, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }
    register(newUser: Omit<User, 'id'>): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/registrar`, newUser);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
