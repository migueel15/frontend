import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewEntradaService } from './new-entrada.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-entrada',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-entrada.component.html',
})
export class NewEntradaComponent {
  entradaForm: FormGroup;
  idWiki: string | null = null;

  constructor(
    private entradaService: NewEntradaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.entradaForm = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['Usuario', Validators.required], // TO-DO
      idUsuario: ['673d2a12ada998325690b320', Validators.required], // TO-DO
      idWiki: ['', Validators.required],
      idVersionActual: ['6740b2552a63eef24412d169', Validators.required], // TO-DO
    });
  }

  ngOnInit(): void {
    this.idWiki = this.route.snapshot.paramMap.get('idWiki');
    if (this.idWiki) {
      console.log('idWiki recibido:', this.idWiki);
      this.entradaForm.patchValue({ idWiki: this.idWiki });
    } else {
      console.error('idWiki no proporcionado');
    }
  }

  volverAtras() {
    this.router.navigate(['/']);
  }

  crearEntrada() {
    if (this.entradaForm.valid) {
      const entradaData = this.entradaForm.value;
      this.entradaService.createEntrada(entradaData).subscribe({
        next: (response) => {
          console.log('Entrada creada correctamente:', response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear la entrada:', err);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
