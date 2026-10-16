import { Turno } from '../modelos/turno';

// Turnos de ejemplo para arrancar.
export const TURNOS_INICIALES: Turno[] = [
  { id: 1, cliente: 'Martín', servicio: 'Corte', dia: '2026-10-20', hora: '10:00', estado: 'pendiente' },
  { id: 2, cliente: 'Lautaro', servicio: 'Barba', dia: '2026-10-20', hora: '10:30', estado: 'atendido' },
  { id: 3, cliente: 'Facundo', servicio: 'Corte + barba', dia: '2026-10-20', hora: '11:00', estado: 'cancelado' },
  { id: 4, cliente: 'Tomás', servicio: 'Corte', dia: '2026-10-21', hora: '09:30', estado: 'pendiente' },
];
