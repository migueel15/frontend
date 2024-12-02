import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewWikiService } from './new-wiki.service';

@Component({
  selector: 'app-new-wiki',
  standalone: true,
  imports: [],
  templateUrl: './new-wiki.component.html'
})

export class NewWikiComponent {
  constructor(private router: Router, private wikisService: NewWikiService) {}
  
  volverAtras() {
    console.log('Volver a la lista de wikis');
    this.router.navigate(['/']);
  }
  wiki = {title: '', content: ''};

  crearWiki(){
    console.log('Crear una nueva wiki');
    //Para crear una wiki tenemos que hacer una peticion a la base de datos
    this.wikisService.createWiki(this.wiki).subscribe({
      next: (response) => {
        console.log("Wiki creada correctamente:", response);
        //this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Error al crear la wiki:", err);
      },
    });
  }
}
