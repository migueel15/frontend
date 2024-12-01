import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-filter-entradas",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./filter-entradas.component.html",
  styleUrl: "./filter-entradas.component.scss",
})
export class FilterEntradasComponent {
  filtro = {
    nombre: "",
    autor: "",
    fechaCreacion: "",
  };

  @Output()
  filtroAplicado = new EventEmitter<any>();

  handleEntradasFilter(): void {
    this.filtroAplicado.emit(this.filtro);
  }
}
