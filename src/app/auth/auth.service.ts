import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private ususario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      // console.log(fbUser);

      if ( fbUser ) {
        this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
          .subscribe( (usuarioObj: any) => {
            const newUser = new User( usuarioObj);
            this.store.dispatch( new SetUserAction( newUser));
            this.ususario = newUser;
          });
      } else {
        this.ususario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map( fbUser => {
        if ( fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser !== null;
      })
    );
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {

        const user: User = {
          uid: resp.user.uid,
          nombre,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`).set(user).then(() => {
          this.router.navigate(['/']);
          this.store.dispatch(new DesactivarLoadingAction());
        });

      }). catch( error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error al crear el Usuario', error.message, 'error');
      });
  }

  login(email: string, password: string) {

    this.store.dispatch( new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( resp => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      }).catch( error => {
        console.log(error);
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error en el login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new UnSetUserAction());
  }

  getUsuario() {
    return { ...this.ususario};
  }
}
