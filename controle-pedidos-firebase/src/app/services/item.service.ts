import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Categoria } from '../models/Categoria';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private PATH = 'categoria/';

  constructor(private afs: AngularFirestore) { }

  public async cadastraItem(categoria?: Categoria) {
    const [newItem] = [...categoria.itens];
    delete newItem.id;
    const catId = categoria.id;
    const docRef = this.afs.firestore.collection(this.PATH)
      .doc(catId);

    return this.afs.firestore.runTransaction(transaction => {
      return transaction.get(docRef).then(snapshot => {
        const largerArray = snapshot.get('itens') || [];
        const item = { id: this.afs.createId(), ...newItem };
        largerArray.push(item);
        transaction.update(docRef, 'itens', largerArray);
      });
    });

  }

  public async atualizaItem(categoria: Categoria) {
    const [newItem] = [...categoria.itens];
    const catId = categoria.id;
    const docRef = this.afs.firestore.collection(this.PATH)
      .doc(catId)

    return this.afs.firestore.runTransaction(transaction => {
      return transaction.get(docRef).then(snapshot => {
        const largerArray = snapshot.get('itens') || [];
        if (largerArray) {
          const res = largerArray.map((r: Item) => {
            if (r.id === newItem.id) {
              r.descricao = newItem.descricao;
              r.ativo = newItem.ativo;
              r.preco = newItem.preco;
            }
            return r;
          });

          transaction.update(docRef, 'itens', res);

        }
      });
    });
  }
}
