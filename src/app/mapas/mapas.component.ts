import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { MapasService } from './mapas.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapas.component.html',
  styleUrl: './mapas.component.scss'
})
export class MapasComponent implements OnInit {
  private mapa: L.Map | undefined;

  constructor(private mapasService: MapasService) {}

  ngOnInit(): void {
    this.mapa = L.map('map').setView([36.7213028, -4.4216366], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.mapa);
  }

  search(query: string): void {
    if (query) {
      this.mapasService.geocode(query).subscribe((response) => {
        const coords = response.data;
        if (coords) {
          L.marker([coords.lat, coords.lon]).addTo(this.mapa!);
          this.mapa!.setView([coords.lat, coords.lon], 14);
        }
      });
    }
  }
}
