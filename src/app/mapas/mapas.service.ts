import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapasService {
  private apiUrl = 'http://localhost:8000/v2/mapas/';

  constructor(private http: HttpClient) {}

  geocode(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`);
  }
}
