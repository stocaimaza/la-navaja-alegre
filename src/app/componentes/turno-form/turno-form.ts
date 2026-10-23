import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../modelos/turno';

@Component({
  selector: 'app-turno-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './turno-form.html',
  styleUrl: './turno-form.css'
})
export class TurnoFormComponent {
  @Output() agregar = new EventEmitter<Turno>();

  nuevoTurno: Turno = {
    id: 0,
    cliente: '',
    servicio: '',
    dia: '',
    hora: '',
    estado: 'pendiente'
  };

  guardarTurno() {
    if (!this.nuevoTurno.cliente || !this.nuevoTurno.servicio) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    this.agregar.emit({
      ...this.nuevoTurno,
      id: Date.now() 
    });

    this.nuevoTurno = {
      id: 0,
      cliente: '',
      servicio: '',
      dia: '',
      hora: '',
      estado: 'pendiente'
    };
  }
}