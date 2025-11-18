import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CinesService {
  private api = 'http://localhost:8080/cineBackend/api/cines';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  obtener(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  crear(cine: any) {
    return this.http.post(this.api, cine);
  }

  actualizar(id: number, cine: any) {
    return this.http.put(`${this.api}/${id}`, cine);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
