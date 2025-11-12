import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartera {
    id: number;
    saldo: number;
}

@Injectable({ providedIn: 'root' })
export class CarteraService {
    private apiUrl = 'http://localhost:8080/cineBackend/api/cartera';

    constructor(private http: HttpClient) { }


    recargar(id: number, cantidad: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/recargar`, { cantidad });
    }

    debitar(id: number, cantidad: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/debitar`, { cantidad });
    }

    obtenerCartera(usuarioId: number): Observable<Cartera> {
        return this.http.get<Cartera>(`${this.apiUrl}/${usuarioId}`);
    }


}