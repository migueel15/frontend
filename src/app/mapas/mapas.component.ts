import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MapasService } from './mapas.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mapas.component.html',
})
export class MapasComponent implements OnInit {
  @Input() ubicacion!: FormGroup;
  @Output() mapaCreated = new EventEmitter<string>();
  private mapa: L.Map | undefined;

  constructor(private mapasService: MapasService) {}

  ngOnInit(): void {
    this.mapa = L.map('map').setView([36.7213028, -4.4216366], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.mapa);
  }

  buscar(query: string): void {
    if (query) {
      this.mapasService.searchByQuery(query).subscribe((response) => {
        const coords = response.data;
        if (coords) {
          L.marker([coords.lat, coords.lon]).addTo(this.mapa!);
          this.mapa!.setView([coords.lat, coords.lon], 13);

          this.ubicacion.patchValue({
            lat: coords.lat,
            lon: coords.lon,
          });
        }
      });
    }
  }

  crearMapa() {
    if (this.ubicacion.valid) {
      const mapaData = {
        idEntrada: '674df7b1a1067f53a7b2e294', // TO-DO
        lat: this.ubicacion.get('lat')?.value,
        lon: this.ubicacion.get('lon')?.value,
        zoom: 13,
      };

      this.mapasService.createMapa(mapaData).subscribe({
        next: (response) => {
          console.log('Mapa creado correctamente:', response);
          this.mapaCreated.emit(response.idMapa);
        },
        error: (err) => {
          console.error('Error al crear el mapa:', err);
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  actualizarMapa(id: string, idEntrada: string) {
    const mapaData = {
      idEntrada: idEntrada,
    };

    this.mapasService.updateMapa(id, mapaData).subscribe({
      next: (response) => {
        console.log('Mapa actualizado correctamente:', response);
      },
      error: (err) => {
        console.error('Error al actualizar el mapa:', err);
      },
    });
  }
}
