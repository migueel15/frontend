import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValoracionesService } from '../valoraciones/valoraciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-valoracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-valoracion.component.html',
})
export class NewValoracionComponent {
  @Output() valoracionCreada = new EventEmitter<any>();

  valoracionForm: FormGroup;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private valoracionesService: ValoracionesService) {
    this.valoracionForm = this.fb.group({
      idUsuarioRedactor: ['67531570f5f5e7e16350da50', Validators.required],
      idUsuarioValorado: ['673d2a12ada998325690b320', Validators.required], // TO-DO
      nota: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  setNota(nota: number): void {
    this.valoracionForm.patchValue({ nota });
  }

  enviarValoracion(): void {
    if (this.valoracionForm.valid) {
      const valoracion = this.valoracionForm.value;

      this.valoracionesService.createValoracion(valoracion).subscribe({
        next: () => {
          this.valoracionCreada.emit(valoracion);
          this.valoracionForm.reset({ nota: 0 });
          this.mensajeError = null;
        },
        error: (err) => {
          console.error("Error al crear la valoración:", err);
          this.mensajeError = err.error?.detail || "Error desconocido";
        }
      });
    } else {
      this.mensajeError = "Por favor, completa todos los campos correctamente.";
    }
  }
}