import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Perfil } from '../models/Perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private PATH = 'perfil/';

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Perfil[]> {
    return this.afs.collection(this.PATH)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const perfil = new Perfil();
            perfil.id = action.payload.doc.id;
            perfil.descricao = action.payload.doc.data().descricao;

            return perfil;
          });
        })
      );
  }

  /*
 * Insere uma perfil no banco
 */
  public cadastraPerfil(perfil: Perfil) {

    let t = { "descricao": perfil.descricao };

    return new Promise((resolve, reject) => {
      this.afs.collection<any>(this.PATH)
        .add(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Atualiza o status de uma perfil
   */
  public atualizaPerfil(perfil: Perfil) {

    let t = { "descricao": perfil.descricao };

    return new Promise((resolve, reject) => {
      this.afs.doc<Perfil>(this.PATH + perfil.id)
        .update(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Remove as perfils concluídas
   */
  public removeConcluidas() {

    return new Promise((resolve, reject) => {

      this.afs.collection<any>(this.PATH)
        .get()
        .subscribe(
          rset => {
            rset.forEach(r => {
              this.afs.doc<Perfil>(this.PATH + r.id).delete();
            });

            resolve();
          },
          error => reject(error));

    });
  }


}
