import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../modelos/turno';

@Component({
  selector: 'app-editar-turno',
  imports: [FormsModule],
  templateUrl: './editar-turno.html',
  styleUrl: './editar-turno.css',
})
export class EditarTurno implements OnChanges {
  @Input({ required: true }) turno!: Turno;

  @Output() guardar = new EventEmitter<Turno>();
  @Output() descartar = new EventEmitter<void>();

  copia!: Turno;

  ngOnChanges(): void {
    this.copia = { ...this.turno };
  }

  onGuardar(): void {
    this.guardar.emit({ ...this.copia });
  }

  onDescartar(): void {
    this.descartar.emit();
  }
}
