import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WikisService } from '../wikis/wikis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  selector: 'app-editar-wiki',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: './editar-wiki.component.html',
})
export class EditorWikiComponent implements OnInit {
  wikiId!: string;
  nombreWiki: string = '';
  antiguoNombreWiki: string = '';

  constructor(
    private WikisService: WikisService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.wikiId = this.route.snapshot.paramMap.get('idWiki')!;
    this.WikisService.getWiki(this.wikiId).subscribe({
      next: (data) => {
        this.nombreWiki = data.nombre;
        this.antiguoNombreWiki = data.nombre;
        console.log('Wiki:', data);
      },
      error: (err) => {
        console.error('Error al obtener la wiki:', err);
      },
    });
  }

  guardarCambios(): void {
    console.log('Guardando cambios...');
    this.WikisService.editWiki(this.wikiId, { nombre: this.nombreWiki}).subscribe({
      next: (data) => {
        console.log('Cambios guardados:', data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al guardar los cambios:', err);
      },
    });
  }
}
