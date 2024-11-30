import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-wiki',
  standalone: true,
  imports: [],
  templateUrl: './new-wiki.component.html',
  styleUrl: './new-wiki.component.scss'
})

export class NewWikiComponent {
  constructor(private router: Router) {}
  
  volverAtras() {
    console.log('Volver a la lista de wikis');

    this.router.navigate(['/']);
  }

}
