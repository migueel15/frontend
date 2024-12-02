import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewWikiService } from './new-wiki.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BotonAtrasComponent } from "../boton-atras/boton-atras.component";
import { SubirImagenesComponent } from "../subir-imagenes/subir-imagenes.component";

@Component({
  selector: 'app-new-wiki',
  standalone: true,
  imports: [ReactiveFormsModule, BotonAtrasComponent, SubirImagenesComponent],
  templateUrl: './new-wiki.component.html',
})
export class NewWikiComponent {
  wikiForm: FormGroup;

  constructor(
    private router: Router,
    private wiki: NewWikiService,
    private fb: FormBuilder
  ) {
    this.wikiForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  volverAtras() {
    this.router.navigate(['/']);
  }

  crearWiki() {
    if (this.wikiForm.valid) {
      const wikiData = this.wikiForm.value;
      this.wiki.createWiki(wikiData).subscribe({
        next: (response) => {
          console.log('wiki creada correctamente:', response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al crear la wiki:', err);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
