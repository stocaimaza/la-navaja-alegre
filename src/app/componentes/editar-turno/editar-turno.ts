import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../modelos/turno';
import { TurnosService } from '../../servicios/turnos.service';

@Component({
  selector: 'app-editar-turno',
  imports: [FormsModule],
  templateUrl: './editar-turno.html',
  styleUrl: './editar-turno.css',
})
export class EditarTurno implements OnChanges {
  @Input({ required: true }) turno!: Turno;

  private turnosService = inject(TurnosService);

  copia!: Turno;

  ngOnChanges(): void {
    this.copia = { ...this.turno };
  }

  onGuardar(): void {
    this.turnosService.guardarEdicion({ ...this.copia });
  }

  onDescartar(): void {
    this.turnosService.cancelarEdicion();
  }
}
