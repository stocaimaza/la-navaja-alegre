import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../modelos/turno';
import { SERVICIOS } from '../../datos/servicios';
import { TurnosService } from '../../servicios/turnos.service';

@Component({
  selector: 'app-turno-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './turno-form.html',
  styleUrl: './turno-form.css'
})
export class TurnoFormComponent {
  private turnosService = inject(TurnosService);

  servicios = SERVICIOS;

  // El id y el estado los pone el service al agregar
  nuevoTurno: Omit<Turno, 'id' | 'estado'> = {
    cliente: '',
    servicio: '',
    dia: '',
    hora: ''
  };

  guardarTurno() {
    if (!this.nuevoTurno.cliente || !this.nuevoTurno.servicio) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    this.turnosService.agregar({ ...this.nuevoTurno });

    this.nuevoTurno = {
      cliente: '',
      servicio: '',
      dia: '',
      hora: ''
    };
  }
}
