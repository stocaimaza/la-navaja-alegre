import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from '../../modelos/turno';


@Component({
  selector: 'app-lista-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-turnos.html',
  styleUrl: './lista-turnos.css',

})
export class ListaTurnosComponent {
  @Input({ required: true }) turnos!: Turno[];

  @Output() atender = new EventEmitter<number>();
  @Output() cancelar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() editar = new EventEmitter<number>();

  filtroActual: string = 'todos';

  setFiltro(filtro: string): void {
    this.filtroActual = filtro;
  }

  get turnosFiltrados(): Turno[] {
    if (this.filtroActual === 'todos') {
      return this.turnos;
    }
    return this.turnos.filter(t => t.estado === this.filtroActual);
  }
}