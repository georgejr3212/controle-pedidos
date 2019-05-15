import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private PATH = 'usuario/';

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Usuario[]> {
    return this.afs.collection(this.PATH)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map(async (action: any) => {
            const perfil$ = await this.afs.collection('perfil').doc(action.payload.doc.data().perfil);
            const perfil: any = perfil$.get();

            const usuario = new Usuario();
            usuario.id = action.payload.doc.id;
            usuario.nome = action.payload.doc.data().nome;
            usuario.perfil = perfil;
            usuario.username = action.payload.doc.data().username;
            usuario.password = action.payload.doc.data().password;

            return usuario;
          });
        })
      );
  }

  /*
 * Insere uma usuario no banco
 */
  public cadastraUsuario(usuario: Usuario) {

    let t = {
      nome: usuario.nome,
      perfil: {...usuario.perfil},
      password: usuario.password,
      username: usuario.username
    };

    return new Promise((resolve, reject) => {
      this.afs.collection<any>(this.PATH)
        .add(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Atualiza o status de uma usuario
   */
  public atualizaUsuario(usuario: Usuario) {

    let t = {
      "nome": usuario.nome,
      "perfil": usuario.perfil
    };

    return new Promise((resolve, reject) => {
      this.afs.doc<Usuario>(this.PATH + usuario.id)
        .update(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }

  public login(username: string, password: string) {
    return this.afs.collection(this.PATH, ref => ref.where('username', '==', username).where('password', '==', password))
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            // const perfil$ = await this.afs.collection('perfil').doc(action.payload.doc.data().perfil);
            // const perfil: any = perfil$.get();

            const usuario = new Usuario();
            usuario.id = action.payload.doc.id;
            usuario.nome = action.payload.doc.data().nome;
            usuario.perfil = action.payload.doc.data().perfil;
            usuario.username = action.payload.doc.data().username;
            usuario.password = action.payload.doc.data().password;

            return usuario;
          })[0];
        })
      );
  }
  /*
   * Remove as usuarios concluídas
   */
  public removeConcluidas() {

    return new Promise((resolve, reject) => {

      this.afs.collection<any>(this.PATH)
        .get()
        .subscribe(
          rset => {
            rset.forEach(r => {
              this.afs.doc<Usuario>(this.PATH + r.id).delete();
            });

            resolve();
          },
          error => reject(error));

    });
  }
}
