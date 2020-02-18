import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription =  this.store.select('auth')
      .pipe(
        filter( authPipe => authPipe.user !== null)
      )
      .subscribe( authSubs => this.nombre = authSubs.user.nombre);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
