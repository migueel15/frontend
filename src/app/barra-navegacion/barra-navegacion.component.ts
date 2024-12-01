import { Component } from '@angular/core';
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss'
})
export class BarraNavegacionComponent {
usuarioEnSesion() {
  return true;
}

usuarioEsAdmin() {
  return true;
}

}
