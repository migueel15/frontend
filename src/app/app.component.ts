import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubirImagenesComponent } from "./subir-imagenes/subir-imagenes.component";
import { MapasComponent } from './mapas/mapas.component';
import { WikisComponent } from './wikis/wikis.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraNavegacionComponent, NotificacionesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'laWiki';
}
