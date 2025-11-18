import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private api = 'http://localhost:8080/cineBackend/api/reportes';

  constructor(private http: HttpClient) {}

  descargarReporteGanancias(desde?: string, hasta?: string) {
    let params: any = {};
    if (desde) params.desde = desde;
    if (hasta) params.hasta = hasta;
    const options = {
      params,
      responseType: 'blob' as 'json'
    };
    return this.http.get(`${this.api}/ganancias/pdf`, options);
  }
}
