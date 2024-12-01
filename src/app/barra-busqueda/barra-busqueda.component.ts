import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barra-busqueda.component.html'
})
export class BarraBusquedaComponent {
  textoBusqueda: string = '';

  @Output() busqueda = new EventEmitter<string>();

  onSearchChange() {
    this.busqueda.emit(this.textoBusqueda);
  }
}
