import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EntradasService } from "./entradas.service";
import { FilterEntradasComponent } from "../filter-entradas/filter-entradas.component";

@Component({
  selector: "app-entradas",
  standalone: true,
  imports: [CommonModule, FilterEntradasComponent],
  templateUrl: "./entradas.component.html",
  styleUrl: "./entradas.component.scss",
})
export class EntradasComponent implements OnInit {
  wikiId!: string;
  entradas: any[] = [];
  entradasFiltradas: any[] = [];
  nombre_wiki: string = "";

  constructor(
    private entradasService: EntradasService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Captura el parámetro `id` de la URL
    this.wikiId = this.route.snapshot.paramMap.get("id")!;
    this.entradasService.getWikiName(this.wikiId).subscribe({
      next: (data) => {
        this.nombre_wiki = data["nombre"];
      },
      error: (err) => {
        console.error("Error al obtener el nombre de la wiki:", err);
      },
    });
    this.entradasService.getEntradas(this.wikiId).subscribe({
      next: (data) => {
        this.entradas = data;
        this.entradasFiltradas = this.entradas;
      },
      error: (err) => {
        console.error("Error al obtener las entradas:", err);
      },
    });
  }

  handleEntradaClick(idVersion: any): void {
    console.log("Entrada:", idVersion);
  }
  aplicarFiltro(filtros: any): void {
    this.entradasFiltradas = this.entradas.filter((entrada) => {
      return (
        (!filtros.nombre || entrada.nombre.includes(filtros.nombre)) &&
        (!filtros.usuario || entrada.usuario.includes(filtros.usuario)) &&
        (!filtros.fechaCreacion ||
          entrada.fechaCreacion === filtros.fechaCreacion)
      );
    });
  }
}
