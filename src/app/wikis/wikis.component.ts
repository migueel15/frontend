import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikisService } from './wikis.service';
import { BarraBusquedaComponent } from '../barra-busqueda/barra-busqueda.component';

@Component({
  selector: 'app-wikis',
  standalone: true,
  imports: [CommonModule, BarraBusquedaComponent],
  templateUrl: './wikis.component.html',
  styleUrls: ['./wikis.component.scss']
})
export class WikisComponent implements OnInit {
  wikis: any[] = [];
  wikisFiltradas: any[] = [];
  textoBusqueda: string = '';

  constructor(private wikisService: WikisService) {}

  ngOnInit(): void {
    this.wikisService.getWikis().subscribe({
        next: (data) => {
            this.wikis = data;
            this.wikisFiltradas = this.wikis;
        },
        error: (err) => {
            console.error('Error al obtener las wikis:', err);
        },
    });
  }

  onSearchTextChanged(textoBusqueda: string): void {
    this.textoBusqueda = textoBusqueda;
    this.wikisFiltradas = this.wikis.filter(wiki =>
      wiki.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }
}