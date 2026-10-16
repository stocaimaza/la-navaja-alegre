# 💈 La Navaja Alegre · Turnero

TP en equipo de **Clientes Web Mobile** (Nueva Escuela). Un sistema de turnos para la barbería La Navaja Alegre, hecho en Angular con todo lo visto hasta la Clase 7.

Trabajamos como en una empresa: **cada uno hace un componente**, en su propia rama, y lo entrega con un **pull request**. El líder técnico (el profe) revisa y une todo en `main`.

## Cómo levantar el proyecto

```
git clone https://github.com/stocaimaza/la-navaja-alegre.git
cd la-navaja-alegre
npm install
ng serve -o
```

## Cómo trabajar tu componente

1. Creá tu rama desde `main`:
   ```
   git checkout main
   git pull
   git checkout -b turno-form
   ```
   (con el nombre de tu componente)
2. Generá tu componente:
   ```
   ng generate component componentes/turno-form
   ```
3. Trabajá **solo dentro de la carpeta de tu componente**. No toques `app.ts`, `app.html`, `modelos/` ni `datos/`: esos los mantiene el líder técnico.
4. Para probarlo, podés usar tu etiqueta en `app.html` **en tu compu**, pero no subas ese cambio.
5. Subí tu rama:
   ```
   git add src/app/componentes/turno-form
   git commit -m "Componente turno-form"
   git push -u origin turno-form
   ```
6. En GitHub, abrí un **pull request** de tu rama hacia `main`.

## Lo que ya está hecho (no tocar)

| Archivo | Qué tiene |
|---|---|
| `src/app/modelos/turno.ts` | La interface `Turno` y el tipo `EstadoTurno` |
| `src/app/datos/servicios.ts` | Los servicios: Corte, Barba, Corte + barba |
| `src/app/datos/turnos.ts` | 4 turnos de ejemplo |
| `src/app/app.ts` | El integrador: dueño de la lista de turnos, con `agregar`, `atender`, `cancelar`, `eliminar`, `empezarEdicion`, `guardarEdicion` y `cancelarEdicion` |
| `src/app/app.html` | Donde se conectan los componentes |

## Los contratos

Cada componente tiene un **contrato**: qué recibe con `@Input` y qué avisa con `@Output`. **Los nombres tienen que ser exactamente estos**, si no, al unir todo no encaja.

### 1 · `turno-form`: el formulario de nuevo turno

- Selector: `app-turno-form`
- Recibe: `@Input({ required: true }) turnos!: Turno[];` (para controlar los duplicados)
- Avisa: `@Output() nuevo = new EventEmitter<Turno>();` con el turno nuevo, con un `id` único y estado `'pendiente'`
- Tiene que tener:
  - cliente: obligatorio, mínimo 3 letras
  - servicio: obligatorio, `<select>` con los `SERVICIOS`
  - día (`<input type="date">`) y hora (`<input type="time">`): obligatorios
  - un mensaje distinto para cada error y el botón deshabilitado si el formulario es inválido
  - **regla de negocio:** no se puede cargar un turno el mismo día a la misma hora que otro que no esté cancelado. Si pasa, mostrar un mensaje de error y no emitir.
  - el formulario limpio después de agregar

### 2 · `turno-item`: la tarjeta de UN turno

- Selector: `app-turno-item`
- Recibe: `@Input({ required: true }) turno!: Turno;`
- Avisa, con el **id** del turno (`EventEmitter<number>`): `atender`, `cancelar`, `eliminar` y `editar`
- Tiene que mostrar: cliente, servicio, día, hora y estado
  - con class binding: atendido en verde, cancelado tachado y en gris
  - con `@if`: los botones Atender y Cancelar solo si el turno está pendiente

### 3 · `lista-turnos`: la lista completa

- Selector: `app-lista-turnos`
- Recibe: `@Input({ required: true }) turnos!: Turno[];`
- Avisa: reenvía los cuatro avisos de la tarjeta, con los mismos nombres (`atender`, `cancelar`, `eliminar`, `editar`, todos `EventEmitter<number>`)
- Tiene que mostrar:
  - una `<app-turno-item>` por turno, con `@for (...; track turno.id)`
  - "No hay turnos" con `@empty`
  - botones para filtrar: Todos / Pendientes / Atendidos / Cancelados
- Mientras `turno-item` no esté en `main`, mostrá cada turno con un `<p>` provisorio.

### 4 · `resumen`: los números del día

- Selector: `app-resumen`
- Recibe: `@Input({ required: true }) turnos!: Turno[];`
- Avisa: nada
- Tiene que mostrar: total de turnos, pendientes, atendidos y cancelados. Si no hay pendientes, el mensaje "¡Todos atendidos!".

### 5 · `editar-turno`: cambiar un turno

- Selector: `app-editar-turno`
- Recibe: `@Input({ required: true }) turno!: Turno;`
- Avisa: `@Output() guardar = new EventEmitter<Turno>();` con el turno editado (mismo `id`) y `@Output() descartar = new EventEmitter<void>();`
- Tiene que tener: un formulario con el cliente y la hora, que arranca con los datos del turno, con las mismas validaciones que el alta, y los botones Guardar y Descartar.
- Ojo: no modifiques el turno que recibís. Trabajá con una copia y emití la copia.

## Estructura

```
src/app/
├── app.ts / app.html / app.css   ← integrador (líder técnico)
├── modelos/                      ← interface Turno (no tocar)
├── datos/                        ← servicios y turnos de ejemplo (no tocar)
└── componentes/                  ← acá trabaja cada uno, en su carpeta
```
