import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-subir-imagenes",
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: "./subir-imagenes.component.html",
  styleUrls: ["./subir-imagenes.component.scss"],
})
export class SubirImagenesComponent {
  selectedFile: File | null = null;
  mensaje: string = "";

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append("archivo", this.selectedFile);

      try {
        const response = await fetch(
          "http://localhost:5003/v2/archivos/subir",
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.mensaje || "Error al subir la imagen");
        }

        const data = await response.json();
        this.mensaje = data.mensaje;
      } catch (error) {
        if (error instanceof Error) {
          this.mensaje = error.message;
        } else {
          this.mensaje = "Error desconocido al subir la imagen";
        }
      }
    }
  }
}
