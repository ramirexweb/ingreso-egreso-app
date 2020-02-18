import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboarRoutes } from './dashboard.route';
// import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {

    path: '',
    component: DashboardComponent,
    children: dashboarRoutes,
    // canActivate: [ AuthGuardService ]
  },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
