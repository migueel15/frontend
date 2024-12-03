import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubirImagenesService {
  private apiUrl = "http://localhost:8000/archivos/subir";

  constructor(private http: HttpClient) { }

  subirImagen(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append("archivo", archivo);

    return this.http.post(this.apiUrl, formData);
  }
}
