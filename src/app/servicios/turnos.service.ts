// ============================================================
// TURNOS SERVICE: el único lugar donde viven los turnos
// ============================================================
// (Ojo: "servicio" acá es un service de Angular, no un servicio de la
// barbería como "Corte" o "Barba"; esos están en datos/servicios.ts.)
//
// Antes App era el dueño de la lista y los datos viajaban con @Input/@Output.
// Ahora cualquier componente que necesite los turnos hace:
//
//   private turnosService = inject(TurnosService);
//
// y lee o modifica los turnos llamando a estos métodos.

import { Injectable } from '@angular/core';
import { Turno } from '../modelos/turno';
import { TURNOS_INICIALES } from '../datos/turnos';

// providedIn: 'root' → Angular crea UNA sola instancia para toda la app,
// así todos los componentes comparten los mismos turnos.
@Injectable({ providedIn: 'root' })
export class TurnosService {
  // Copiamos los turnos de ejemplo para no modificar la constante original
  turnos: Turno[] = TURNOS_INICIALES.map((t) => ({ ...t }));

  // El turno que se está editando (null = ninguno)
  turnoEnEdicion: Turno | null = null;

  // Recibe los datos del formulario; el id y el estado los pone el service.
  // Omit<Turno, 'id' | 'estado'> = un Turno sin esos dos campos.
  agregar(datos: Omit<Turno, 'id' | 'estado'>) {
    this.turnos.push({ ...datos, id: this.siguienteId(), estado: 'pendiente' });
  }

  atender(id: number) {
    this.cambiarEstado(id, 'atendido');
  }

  cancelar(id: number) {
    this.cambiarEstado(id, 'cancelado');
  }

  eliminar(id: number) {
    this.turnos = this.turnos.filter((t) => t.id !== id);
    if (this.turnoEnEdicion?.id === id) {
      this.turnoEnEdicion = null;
    }
  }

  // Abre editar-turno con ese turno
  empezarEdicion(id: number) {
    this.turnoEnEdicion = this.turnos.find((t) => t.id === id) ?? null;
  }

  // Reemplaza el turno por la versión editada y cierra la edición
  guardarEdicion(turnoEditado: Turno) {
    this.turnos = this.turnos.map((t) => (t.id === turnoEditado.id ? turnoEditado : t));
    this.turnoEnEdicion = null;
  }

  cancelarEdicion() {
    this.turnoEnEdicion = null;
  }

  private cambiarEstado(id: number, estado: 'atendido' | 'cancelado') {
    const turno = this.turnos.find((t) => t.id === id);
    if (turno) {
      turno.estado = estado;
    }
  }

  // El id más alto + 1, así nunca se repite
  private siguienteId(): number {
    return Math.max(0, ...this.turnos.map((t) => t.id)) + 1;
  }
}
