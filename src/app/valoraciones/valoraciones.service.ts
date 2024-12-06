import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private apiUrl = "http://localhost:8000/valoraciones/";

  constructor(private http: HttpClient) { }

  getValoracionesByUsuario(idUsuarioValorado: string): Observable<any> {
    const params = new HttpParams().set('idUsuarioValorado', idUsuarioValorado);
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }
}
