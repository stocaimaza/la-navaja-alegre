import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from '../../modelos/turno';
import { TurnosService } from '../../servicios/turnos.service';


@Component({
  selector: 'app-lista-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-turnos.html',
  styleUrl: './lista-turnos.css',

})
export class ListaTurnosComponent {
  // Público para usar atender/cancelar/editar/eliminar desde el html
  turnosService = inject(TurnosService);

  filtroActual: string = 'todos';

  setFiltro(filtro: string): void {
    this.filtroActual = filtro;
  }

  get turnosFiltrados(): Turno[] {
    const turnos = this.turnosService.turnos;
    if (this.filtroActual === 'todos') {
      return turnos;
    }
    return turnos.filter(t => t.estado === this.filtroActual);
  }
}
