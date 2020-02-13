import { Routes, RouterModule } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { NgModule } from '@angular/core';

export const dashboarRoutes: Routes = [
  {
    path: '',
    component: EstadisticaComponent
  },
  {
    path: 'ingreso-egreso',
    component: IngresoEgresoComponent
  },
  {
    path: 'detalle',
    component: DetalleComponent
  }
];

