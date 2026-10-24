// ============================================================
// APP: el componente "integrador" de La Navaja Alegre
// ============================================================
// Lo mantiene el líder técnico (el profe). Los turnos ya NO viven acá:
// están en TurnosService (servicios/turnos.service.ts). Cada componente
// inyecta el service y lo usa directamente, sin pasar por App.
//
// Cuando se mergea el pull request de cada alumno, el líder técnico importa
// su componente acá, lo agrega en imports y lo pone en app.html.

import { Component, inject } from '@angular/core';
import { TurnosService } from './servicios/turnos.service';
import { TurnoFormComponent } from './componentes/turno-form/turno-form';
@Component({
  selector: 'app-root',
  imports: [TurnoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Público para poder usarlo desde app.html
  turnosService = inject(TurnosService);
}
