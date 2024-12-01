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
}
