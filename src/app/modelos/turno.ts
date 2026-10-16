// Un turno de la barbería.
// NO MODIFICAR sin avisar al equipo: todos los componentes dependen de esta forma.

// Los tres estados posibles de un turno (union type)
export type EstadoTurno = 'pendiente' | 'atendido' | 'cancelado';

export interface Turno {
  id: number;           // único, nunca se repite
  cliente: string;      // nombre del cliente
  servicio: string;     // uno de SERVICIOS (datos/servicios.ts)
  dia: string;          // formato 'AAAA-MM-DD', el que da <input type="date">
  hora: string;         // formato 'HH:MM', el que da <input type="time">
  estado: EstadoTurno;
}
