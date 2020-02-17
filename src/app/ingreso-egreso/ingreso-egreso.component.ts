import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngrersoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public forma: FormGroup;
  tipo = 'ingreso';

  constructor(
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {

    this.forma = new FormGroup({
      description: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  crearIngrersoEgreso(): void {
    console.log('ingresoEgreso', this.forma.value);
    const ingresoEgreso = new IngrersoEgreso({
      ...this.forma.value, tipo: this.tipo
    });

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal.fire('Creado', ingresoEgreso.description, 'success');
        this.forma.reset({
          monto: 0
        });
      }).catch(error => console.log(error));
  }

}
