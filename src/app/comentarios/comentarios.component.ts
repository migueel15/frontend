import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComentariosService } from "./comentarios.service";
import { CommonModule, DatePipe } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-comentarios",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./comentarios.component.html",
  providers: [DatePipe],
})
export class ComentariosComponent {
  comentarioForm: FormGroup;
  entradaId!: string;
  comentarios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.comentarioForm = this.fb.group({
      contenido: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.entradaId = this.route.snapshot.paramMap.get("id")!;
    this.comentariosService.getComentarios(this.entradaId).subscribe({
      next: (data) => {
        this.comentarios = data;
        console.log("Comentarios:", this.comentarios);
      },
      error: (err) => {
        console.error("Error al obtener los comentarios:", err);
      },
    });
  }

  crearComentario(): void {
    if (this.comentarioForm.valid) {
      const comentarioData = this.comentarioForm.value;
      comentarioData.idEntrada = this.entradaId;
      comentarioData.idUsuario = "64bda41e8e9f1a7a0e5c2e3f"; // ID de usuario fijo

      this.comentariosService.crearComentario(comentarioData).subscribe({
        next: (response) => {
          console.log("Comentario creado correctamente:", response);
          // put the new comment at the top of the list
          this.comentarios.unshift(response);
          this.comentarioForm.reset();
          // window.location.reload();
        },
        error: (err) => {
          console.error("Error al crear el comentario:", err);
        },
      });
    }
  }

  formatearFecha(fecha: string): string {
    return this.datePipe.transform(fecha, "dd/MM/yyyy HH:mm") || "";
  }
}
