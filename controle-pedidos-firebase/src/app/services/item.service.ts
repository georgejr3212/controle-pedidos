import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private PATH = 'item/';

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Item[]> {
    return this.afs.collection(this.PATH)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const item = new Item();
            item.id = action.payload.doc.id;
            item.descricao = action.payload.doc.data().descricao;
            item.preco = action.payload.doc.data().preco;
            item.ativo = action.payload.doc.data().ativo;

            return item;
          });
        })
      );
  }

  /*
 * Insere uma item no banco
 */
  public cadastraItem(item: Item) {

    let t = {
      descricao: item.descricao,
      preco: item.preco,
      ativo: item.ativo
    };

    return new Promise((resolve, reject) => {
      this.afs.collection<any>(this.PATH)
        .add(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Atualiza o status de uma item
   */
  public atualizaItem(item: Item) {

    let t = { "descricao": item.descricao };

    return new Promise((resolve, reject) => {
      this.afs.doc<Item>(this.PATH + item.id)
        .update(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Remove as items concluídas
   */
  public removeConcluidas() {

    return new Promise((resolve, reject) => {

      this.afs.collection<any>(this.PATH)
        .get()
        .subscribe(
          rset => {
            rset.forEach(r => {
              this.afs.doc<Item>(this.PATH + r.id).delete();
            });

            resolve();
          },
          error => reject(error));

    });
  }
}
