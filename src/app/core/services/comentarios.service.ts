import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala.model';

export interface ComentarioPelicula {
    id?: number;
    pelicula: any;
    usuario: any;
    comentario: string;
    calificacion: number;
    fechaComentario?: string;
}

export interface ComentarioSala {
    id?: number;
    sala: { id: number } | Sala | null;   
    usuario: { id: number ; nombre?: string } | null; 
    comentario: string;
    calificacion: number;
    fechaComentario?: string;
}


@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    private ApiUrl = 'http://localhost:8080/cineBackend/api/comentarios';

    constructor(private http: HttpClient) { }

    crearComentarioPelicula(comentario: ComentarioPelicula): Observable<any> {
        return this.http.post(`${this.ApiUrl}/pelicula/crear`, comentario);
    }

    obtenerComentariosPelicula(idPelicula: number): Observable<ComentarioPelicula[]> {
        return this.http.get<ComentarioPelicula[]>(`${this.ApiUrl}/pelicula/listar/${idPelicula}`);
    }

    obtenerPromedioPelicula(idPelicula: number): Observable<number> {
        return this.http.get<number>(`${this.ApiUrl}/pelicula/promedio/${idPelicula}`);
    }

    // Comentarios de sala
    crearComentarioSala(comentario: ComentarioSala): Observable<any> {
        return this.http.post(`${this.ApiUrl}/sala/crear`, comentario);
    }

    obtenerComentariosSala(idSala: number): Observable<ComentarioSala[]> {
        return this.http.get<ComentarioSala[]>(`${this.ApiUrl}/sala/${idSala}`);
    }

    obtenerPromedioSala(idSala: number): Observable<number> {
        return this.http.get<number>(`${this.ApiUrl}/sala/${idSala}/promedio`);
    }
}
