import { Component, Input, OnInit } from "@angular/core";
import { VersionService } from "./version.service";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-version",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./version.component.html",
})
export class VersionComponent implements OnInit {
  @Input()
  versionId!: string;
  contenido: string = "";
  contenidoSeguro: SafeHtml = "";
  fechaEdicion: Date = new Date();

  constructor(
    private versionService: VersionService,
    private sanatizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.versionService.getVersionById(this.versionId).subscribe({
      next: (data) => {
        console.log("Datos de la versión", data);
        this.contenido = data["contenido"];
        this.fechaEdicion = new Date(data["fechaEdicion"]);
        this.contenidoSeguro = this.sanatizer.bypassSecurityTrustHtml(
          this.contenido,
        );
      },
      error: (err) => {
        console.error("Error al obtener la version:", err);
      },
    });
  }
}
