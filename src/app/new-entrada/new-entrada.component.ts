import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewEntradaService } from './new-entrada.service';
import { NewVersionComponent } from '../new-version/new-version.component';

@Component({
  selector: 'app-new-entrada',
  standalone: true,
  imports: [ReactiveFormsModule, NewVersionComponent],
  templateUrl: './new-entrada.component.html',
})
export class NewEntradaComponent {
  entradaForm: FormGroup;
  idWiki: string | null = null;
  idVersion: string | null = null;

  @ViewChild(NewVersionComponent) newVersionComponent!: NewVersionComponent;

  constructor(
    private newEntradaService: NewEntradaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
  ) {
    this.entradaForm = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['Usuario', Validators.required], // TO-DO
      idUsuario: ['673d2a12ada998325690b320', Validators.required], // TO-DO
      idWiki: ['', Validators.required],
      version: this.fb.group({
        contenido: ['', Validators.required]
      })
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
    this.location.back();
  }

  crearEntrada() {
    if (this.entradaForm.valid) {
      const entradaData = this.entradaForm.value;

      this.newVersionComponent.crearVersion();

      this.newVersionComponent.versionCreated.subscribe((idVersion: string) => {
        this.idVersion = idVersion;

        entradaData.idVersionActual = this.idVersion;

        this.newEntradaService.createEntrada(entradaData).subscribe({
          next: (response) => {
            console.log('Entrada creada correctamente:', response);

            const idEntrada = response.idEntrada;
            if (idEntrada) {
              this.newVersionComponent.actualizarVersion(
                entradaData.idUsuario,
                idEntrada,
                entradaData.version.contenido
              );
            }

            this.location.back();
          },
          error: (err) => {
            console.error('Error al crear la entrada:', err);
          },
        });
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
