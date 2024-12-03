import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EntradasService } from "./entradas.service";
import { FilterEntradasComponent } from "../filter-entradas/filter-entradas.component";
import { BotonAtrasComponent } from "../boton-atras/boton-atras.component";
import { VersionService } from "../version/version.service";

@Component({
  selector: "app-entradas",
  standalone: true,
  imports: [CommonModule, FilterEntradasComponent, BotonAtrasComponent],
  templateUrl: "./entradas.component.html",
})
export class EntradasComponent implements OnInit {
  wikiId!: string;
  entradas: any[] = [];
  entradasFiltradas: any[] = [];
  nombre_wiki: string = "";

  constructor(
    private entradasService: EntradasService,
    private versionService: VersionService,
    private route: ActivatedRoute,
    private router: Router,
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

  handleEntradaClick(entradaId: string): void {
    console.log("Entrada:", entradaId);
    this.router.navigate(["/entrada/", entradaId]);
  }

  aplicarFiltro(filtros: any): void {
    console.log("Filtros:", filtros);

    this.entradasFiltradas = this.entradas.filter((entrada) => {
      return (
        (!filtros.nombre ||
          entrada.nombre
            .toLowerCase()
            .includes(filtros.nombre.toLowerCase())) &&
        (!filtros.autor ||
          entrada.nombreUsuario
            .toLowerCase()
            .includes(filtros.autor.toLowerCase())) &&
        (!filtros.fechaCreacion ||
          entrada.fechaCreacion >= filtros.fechaCreacion)
      );
    });
  }

  crearEntrada() {
    console.log("Crear entrada");

    this.router.navigate([`/wiki/${this.wikiId}/new_entrada/`]);
  }

  borrarEntrada(id: string): void {
    this.versionService.deleteVersionesByIdEntrada(id).subscribe({
      next: () => {
        console.log(`Versiones asociadas a la entrada ${id} eliminadas correctamente`);

        this.entradasService.deleteEntrada(id).subscribe({
          next: () => {
            console.log(`Entrada ${id} eliminada correctamente`);
            this.entradasFiltradas = this.entradasFiltradas.filter(
              (entrada) => entrada.id !== id
            );
          },
          error: (err) => {
            console.error("Error al borrar la entrada:", err);
          },
        });
      },
      error: (err) => {
        console.error("Error al borrar las versiones asociadas:", err);
      },
    });
  }

}
