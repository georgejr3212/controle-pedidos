import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Categoria } from '../models/Categoria';
import { Pedido } from '../models/Pedido';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private PATH = 'pedido/';

  constructor(private afs: AngularFirestore) { }

  public async cadastraPedido(pedido?: Pedido) {
    const newPedido = { ...pedido };
    return new Promise((resolve, reject) => {
      this.afs.collection<any>(this.PATH)
        .add(newPedido)
        .then((res) => resolve(res.id))
        .catch((e) => reject(e));
    });
  }

  public async getPedido(id: string) {
    return this.afs.collection(this.PATH)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          const pedido = new Pedido();
          pedido.id = action.payload.id;
          pedido.comprador = action.payload.data().comprador;
          pedido.itens = action.payload.data().itens;
          pedido.total = action.payload.data().total;
          pedido.status = action.payload.data().status;
          pedido.dtCompra = action.payload.data().dtCompra;
          return pedido;
        })
      );
  }

  public async getAllPedidos() {
    return this.afs.collection(this.PATH)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const pedido = new Pedido();
            pedido.id = action.payload.doc.id;
            pedido.comprador = action.payload.doc.data().comprador;
            pedido.itens = action.payload.doc.data().itens;
            pedido.total = action.payload.doc.data().total;
            pedido.status = action.payload.doc.data().status;
            pedido.dtCompra = action.payload.doc.data().dtCompra;
            return pedido;
          });
        })
      );
  }

  public async atualizaStatusPedido(id: string, status: string) {
    const t = { status };
    return new Promise((resolve, reject) => {
      this.afs.doc<Pedido>(this.PATH + id)
        .update(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }

  public async atualizaPedido(pedido: Categoria) {
    const [newPedido] = [...pedido.itens];
    const catId = pedido.id;
    const docRef = this.afs.firestore.collection(this.PATH)
      .doc(catId)

    return this.afs.firestore.runTransaction(transaction => {
      return transaction.get(docRef).then(snapshot => {
        const largerArray = snapshot.get('itens') || [];
        if (largerArray) {
          const res = largerArray.map((r: Pedido) => {
            if (r.id === newPedido.id) {
              r.comprador = newPedido.comprador;

              // itens: Item[];
              // total: number;
              // status: string;
              // dtCompra: Date;

              // r.descricao = newPedido.descricao;
              // r.ativo = newPedido.ativo;
              // r.preco = newPedido.preco;
            }
            return r;
          });

          transaction.update(docRef, 'itens', res);

        }
      });
    });
  }
}
