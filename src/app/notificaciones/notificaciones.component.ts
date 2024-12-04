import { Component, OnInit } from "@angular/core";
import { NotificacionesService } from "./notificaciones.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-notificaciones",
  standalone: true,
  templateUrl: "./notificaciones.component.html",
  styleUrls: ["./notificaciones.component.scss"],
  imports: [CommonModule]
})

export class NotificacionesComponent implements OnInit {
    notificaciones: any[] = [];
    notificacionesSinLeer: number = 0;
    mostrarDesplegable: boolean = false;

    constructor(private notificacionesService: NotificacionesService, private router: Router) {}

    ngOnInit(): void {
        this.cargarNotificaciones();
    }

    cargarNotificaciones(): void {
        this.notificacionesService.getNotificaciones().subscribe((data) => {
            console.log("Notificaciones:", data);
            this.notificaciones = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            this.notificacionesSinLeer = this.notificaciones.filter(n => !n.is_read).length;
            console.log("Notificaciones sin leer:", this.notificacionesSinLeer);
        });
    }

    toggleDesplegable(): void {
        this.mostrarDesplegable = !this.mostrarDesplegable;
    }

    marcarComoLeida(notificacion: any): void {
        this.notificacionesService.markAsRead(notificacion.id).subscribe(() => {
            notificacion.is_read = true;
            this.notificacionesSinLeer--;
        });
    }

    redirigirEntrada(notificacion: any): void {
        if (!notificacion.is_read) {
            this.notificacionesService.markAsRead(notificacion.id).subscribe(() => {
                notificacion.is_read = true;
                this.notificacionesSinLeer--;
            });
        }
        this.router.navigate([`/entrada/${notificacion.entrada_id}`]);
    }

}