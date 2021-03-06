import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, SingleDataSet } from 'ng2-charts';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: SingleDataSet = [];

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<fromIngresoEgreso.IEState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso =>
        this.contarIngresoEgreso(ingresoEgreso.items));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private contarIngresoEgreso( items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach( item => {
      if ( item.tipo === 'ingreso' ) {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];
  }

}
