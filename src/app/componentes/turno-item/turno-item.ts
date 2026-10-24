import { Component, Input, inject } from '@angular/core';
import { Turno } from '../../modelos/turno';
import { TurnosService } from '../../servicios/turnos.service';

@Component({
  selector: 'app-turno-item',
  imports: [],
  templateUrl: './turno-item.html',
  styleUrl: './turno-item.css',
})
export class TurnoItem {
  @Input({ required: true }) turno!: Turno;

  private turnosService = inject(TurnosService);

  atenderTurno() {
    this.turnosService.atender(this.turno.id);
  }

  cancelarTurno() {
    this.turnosService.cancelar(this.turno.id);
  }

  eliminarTurno() {
    this.turnosService.eliminar(this.turno.id);
  }

  editarTurno() {
    this.turnosService.empezarEdicion(this.turno.id);
  }
}
