import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntradaService } from './entrada.service';
import { CommonModule } from '@angular/common';
import { VersionComponent } from "../version/version.component";

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [CommonModule, VersionComponent],
  templateUrl: './entrada.component.html',
})
export class EntradaComponent implements OnInit {
  entradaId!: string;
  versionActualId!: string;
  nombreEntrada: string = '';
  nombreUsuario: string = '';
  fechaCreacion: Date = new Date();

  constructor(
    private entradaService: EntradaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.entradaId = this.route.snapshot.paramMap.get('id')!;
    this.entradaService.getEntradaById(this.entradaId).subscribe({
      next: (data) => {
        this.versionActualId = data['idVersionActual']
        this.nombreEntrada = data['nombre'];
        this.nombreUsuario = data['nombreUsuario'];
        this.fechaCreacion = new Date(data['fechaCreacion']);
      },
      error: (err) => {
        console.error('Error al obtener la entrada:', err);
      },
    });
  }
}
