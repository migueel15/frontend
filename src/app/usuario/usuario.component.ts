import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  idUsuario: string | null = null;
  usuarioData: any;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');

    if (this.idUsuario) {
      this.getUsuario();
    }
  }

  getUsuario(): void {
    if (this.idUsuario) {
      this.usuarioService.getUsuario(this.idUsuario).subscribe({
        next: (data) => {
          this.usuarioData = data;
        },
        error: (err) => {
          console.error('Error al obtener los datos del usuario:', err);
        }
      });
    }
  }
}