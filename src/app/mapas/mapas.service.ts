import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapasService {
  private apiUrl = 'http://localhost:8000/mapas/';

  constructor(private http: HttpClient) {}

  searchByQuery(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }

  createMapa(mapaData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl,mapaData,{headers}).pipe(
        catchError((error) => {
            console.error("Error al crear el mapa", error);
            return throwError(() => error);
        })
    );
  }

  updateMapa(id: string, mapaData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}${id}`,mapaData,{headers}).pipe(
        catchError((error) => {
            console.error("Error al actualizar el mapa", error);
            return throwError(() => error);
        })
    );
  }
}
