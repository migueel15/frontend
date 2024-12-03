import { Component, Input, OnInit } from "@angular/core";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { SubirImagenesService } from "./subirImagen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

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
export class EditorEntradasComponent implements OnInit {
  idEntrada: string = "";
  defaultContent: string = "";
  selectedImageName: string = ""; // Almacena el nombre del archivo seleccionado

  constructor(
    private subirImagenesService: SubirImagenesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  //init
  ngOnInit(): void {
    // url id de la entrada
    this.idEntrada = this.route.snapshot.paramMap.get("id")!;
    this.obtenerContenidoEntrada(this.idEntrada).subscribe({
      next: (contenido) => {
        console.log(
          "Contenido de la entrada:",
          contenido.versiones[0].contenido,
        );
        this.defaultContent = contenido.versiones[0].contenido;
      },
      error: (err) => {
        console.error("Error al obtener el contenido de la entrada:", err);
      },
    });
  }

  obtenerContenidoEntrada(id: string): Observable<any> {
    const url = "http://localhost:8000/versiones";
    return this.http.get<{ contenido: string }>(url + "/?idEntrada=" + id);
  }

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

  saveContent(editor: any) {
    console.log(editor.getContent());
  }

  init: EditorComponent["init"] = {
    license_key: "gpl",
    plugins: "lists link image table code help wordcount",
    images_upload_handler: this.imageUploadHandler,
    image_list: [
      { title: "My image 1", value: "https://www.example.com/my1.gif" },
      { title: "My image 2", value: "http://www.moxiecode.com/my2.gif" },
    ],
    toolbar:
      "save image | undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link",
    setup: (editor) => {
      editor.ui.registry.addButton("customImagePicker", {
        icon: "image",
        onAction: () => {
          alert("Custom image picker button clicked");
        },
      });
      editor.ui.registry.addButton("save", {
        icon: "save",
        onAction: () => {
          this.saveContent(editor);
        },
      });
    },
  };
}
