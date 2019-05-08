import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private PATH = 'categoria/';

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Categoria[]> {
    return this.afs.collection(this.PATH)
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((action: any) => {
            const categoria = new Categoria();
            categoria.id = action.payload.doc.id;
            categoria.descricao = action.payload.doc.data().descricao;

            return categoria;
          });
        })
      );
  }

  /*
 * Insere uma categoria no banco
 */
  public cadastraCategoria(categoria: Categoria) {

    let t = {
      descricao: categoria.descricao,
      categoria: {...categoria.itens },
    };

    return new Promise((resolve, reject) => {
      this.afs.collection<any>(this.PATH)
        .add(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Atualiza o status de uma categoria
   */
  public atualizaCategoria(categoria: Categoria) {

    let t = { "descricao": categoria.descricao };

    return new Promise((resolve, reject) => {
      this.afs.doc<Categoria>(this.PATH + categoria.id)
        .update(t)
        .then(() => resolve())
        .catch((e) => reject(e));
    });

  }


  /*
   * Remove as categorias concluídas
   */
  public removeConcluidas() {

    return new Promise((resolve, reject) => {

      this.afs.collection<any>(this.PATH)
        .get()
        .subscribe(
          rset => {
            rset.forEach(r => {
              this.afs.doc<Categoria>(this.PATH + r.id).delete();
            });

            resolve();
          },
          error => reject(error));

    });
  }
}
