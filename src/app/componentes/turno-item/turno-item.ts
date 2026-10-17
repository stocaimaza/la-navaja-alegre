import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../modelos/turno';

@Component({
  selector: 'app-turno-item',
  imports: [],
  templateUrl: './turno-item.html',
  styleUrl: './turno-item.css',
})
export class TurnoItem {
  @Input({ required: true }) turno!: Turno;

  @Output() atender = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() editar = new EventEmitter<number>();

  atenderTurno() {
    this.atender.emit(this.turno.id);
  }

  cancelarTurno() {
    this.cancelar.emit(this.turno.id);
  }

  eliminarTurno() {
    this.eliminar.emit(this.turno.id);
  }

  editarTurno() {
    this.editar.emit(this.turno.id);
  }
}
