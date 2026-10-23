// ============================================================
// APP: el componente "integrador" de La Navaja Alegre
// ============================================================
// Lo mantiene el líder técnico (el profe). Es el DUEÑO de la lista de turnos:
// los datos bajan a cada componente con @Input, los componentes avisan con
// @Output y App hace los cambios.
//
// Cuando se mergea el pull request de cada alumno, el líder técnico importa
// su componente acá, lo agrega en imports y lo conecta en app.html.

import { Component } from '@angular/core';
import { Turno } from './modelos/turno';
import { TURNOS_INICIALES } from './datos/turnos';
import { TurnoFormComponent } from './componentes/turno-form/turno-form';
@Component({
  selector: 'app-root',
  imports: [TurnoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Todos los turnos
  turnos: Turno[] = TURNOS_INICIALES;

  // El turno que se está editando (null = ninguno)
  turnoEnEdicion: Turno | null = null;

  // turno-form → (nuevo)
  agregar(turno: Turno) {
    this.turnos.push(turno);
  }

  // turno-item / lista-turnos → (atender)
  atender(id: number) {
    this.cambiarEstado(id, 'atendido');
  }

  // turno-item / lista-turnos → (cancelar)
  cancelar(id: number) {
    this.cambiarEstado(id, 'cancelado');
  }

  // turno-item / lista-turnos → (eliminar)
  eliminar(id: number) {
    this.turnos = this.turnos.filter((t) => t.id !== id);
  }

  // turno-item / lista-turnos → (editar): abre editar-turno con ese turno
  empezarEdicion(id: number) {
    const turno = this.turnos.find((t) => t.id === id);
    if (turno) {
      this.turnoEnEdicion = turno;
    }
  }

  // editar-turno → (guardar): reemplaza el turno por la versión editada
  guardarEdicion(turnoEditado: Turno) {
    this.turnos = this.turnos.map((t) => (t.id === turnoEditado.id ? turnoEditado : t));
    this.turnoEnEdicion = null;
  }

  // editar-turno → (descartar)
  cancelarEdicion() {
    this.turnoEnEdicion = null;
  }

  private cambiarEstado(id: number, estado: 'atendido' | 'cancelado') {
    const turno = this.turnos.find((t) => t.id === id);
    if (turno) {
      turno.estado = estado;
    }
  }
}
