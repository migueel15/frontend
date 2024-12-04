import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = "http://localhost:8000/comentarios/";

  constructor(private http: HttpClient) {}

  getComentarios(idEntrada: string): Observable<any[]> {
    return this.http
      .get<{ comentarios: any[] }>(this.apiUrl + "?idEntrada=" + idEntrada)
      .pipe(map((response) => response.comentarios));
  }

  crearComentario(comentarioData: any): Observable<any> {
    return this.http.post(this.apiUrl, comentarioData);
  }
}
