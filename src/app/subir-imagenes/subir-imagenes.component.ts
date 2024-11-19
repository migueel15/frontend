import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subir-imagenes',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule],  
  templateUrl: './subir-imagenes.component.html',
  styleUrls: ['./subir-imagenes.component.scss']
})
export class SubirImagenesComponent {
  selectedFile: File | null = null;
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('archivo', this.selectedFile);

      this.http.post<any>('http://localhost:5000/v2/archivos/subir', formData).subscribe(
        (response) => {
          this.mensaje = response.mensaje;
        },
        (error) => {
          this.mensaje = 'Error al subir la imagen';
        }
      );
    }
  }
}
