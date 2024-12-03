import { Component } from "@angular/core";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { SubirImagenesService } from "./subirImagen.service";

@Component({
  selector: "app-editor-entradas",
  standalone: true,
  imports: [EditorComponent],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: "tinymce/tinymce.min.js" },
  ],
  templateUrl: "./editor-entradas.component.html",
  styleUrl: "./editor-entradas.component.scss",
})
export class EditorEntradasComponent {
  selectedImageName: string = ""; // Almacena el nombre del archivo seleccionado

  constructor(private subirImagenesService: SubirImagenesService) {}

  // imageUploadHandler = (
  //   blobInfo: any,
  //   progress: (percent: number) => void,
  // ): Promise<string> => {
  //   return new Promise<string>((resolve) => {
  //     this.selectedImageName = blobInfo.filename(); // Extrae y guarda el nombre del archivo
  //     console.log("Archivo seleccionado:", this.selectedImageName);
  //     this.subirImagenesService.subirImagen(blobInfo.blob()).subscribe({
  //       next: (data) => {
  //         console.log("Imagen subida correctamente:", data);
  //         resolve(data.url);
  //       },
  //       error: (err) => {
  //         console.error("Error al subir la imagen:", err);
  //         resolve("");
  //       },
  //     });
  //   });
  // };

  imageUploadHandler = (
    blobInfo: any,
    progress: (percent: number) => void,
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const archivo = blobInfo.blob(); // Convertir a tipo File
      const formData = new FormData();
      formData.append("archivo", archivo);
      fetch("http://localhost:8000/archivos/subir", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.mensaje || "Error al subir la imagen");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Imagen subida correctamente:", data);
          resolve(data.url);
        })
        .catch((err) => {
          console.error("Error al subir la imagen:", err);
          resolve("");
        });
    });
  };

  init: EditorComponent["init"] = {
    license_key: "gpl",
    plugins: "lists link image table code help wordcount",
    images_upload_handler: this.imageUploadHandler,
  };
}
