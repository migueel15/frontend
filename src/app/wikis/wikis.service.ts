import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WikisService {
  private apiUrl = "http://localhost:8000/wikis/";

  constructor(private http: HttpClient) {}

  getWikis(): Observable<any[]> {
    return this.http
      .get<{ wikis: any[] }>(this.apiUrl)
      .pipe(map((response) => response.wikis));
  }

  // Método para obtener una wiki por su id
  getWiki(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  //Metodo  para editar una wiki
  editWiki(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, data);
  }

  // Método para eliminar una wiki
  deleteWiki(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}

