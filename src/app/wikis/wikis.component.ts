import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikisService } from './wikis.service';

@Component({
  selector: 'app-wikis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wikis.component.html',
  styleUrls: ['./wikis.component.scss']
})
export class WikisComponent implements OnInit {
  wikis: any[] = [];

  constructor(private wikisService: WikisService) {}

  ngOnInit(): void {
    this.wikisService.getWikis().subscribe({
        next: (data) => {
            this.wikis = data;
        },
        error: (err) => {
            console.error('Error al obtener las wikis:', err);
        },
    });
  }
}