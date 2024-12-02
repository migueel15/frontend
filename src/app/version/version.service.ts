import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VersionService {
  private apiUrl = "http://localhost:8000/versiones/";

  constructor(private http: HttpClient) {}

  getVersionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }
}