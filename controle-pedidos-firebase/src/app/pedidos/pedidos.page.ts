import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Categoria } from '../models/Categoria';
import { Pedido } from '../models/Pedido';
import { CategoriaService } from '../services/categoria.service';
import { PedidoService } from '../services/pedido.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  categorias$: Observable<Categoria[]>;
  itensCategoria$: Observable<any>;
  cats;
  itensPedido = [];
  constructor(
    private modalController: ModalController,
    private categoriaService: CategoriaService,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categorias$ = this.categoriaService.getAll();
    this.categorias$.subscribe(res => this.cats = res);
  }

  onRemoveInativos(itens) {
    return itens.filter(res => res.ativo !== '0');
  }

  onFieldQtdAdd(itens) {
    return itens.map(item => {
      if (!item.qtd) {
        item.qtd = 0;
      }

      return item;
    });
  }

  onAdd(item) {
    item.qtd = ++item.qtd;
    let up = false;
    this.itensPedido.map(data => {
      if (data.id === item.id) {
        data.qtd = item.qtd;
        up = true;
      }
    });

    if (!up) {
      this.itensPedido.push(item);
    }

  }

  onRemove(item) {
    item.qtd = --item.qtd;
    let up = false;
    this.itensPedido.map(data => {
      if (data.id === item.id) {
        data.qtd = item.qtd;
        up = true;
      }
    });

    if (!up) {
      this.itensPedido.push(item);
    }

    this.itensPedido = this.itensPedido.filter(res => res.qtd > 0);

  }

  findQtd(item) {
    if (!this.itensPedido.length) {
      return 0;
    }
    const i = this.itensPedido.find(itemP => itemP.id === item.id);
    if (!i) {
      return 0;
    }
    return i.qtd;
  }

  async finalizarPedido() {
    const user = JSON.parse(localStorage.getItem('user'));
    const total = this.itensPedido.map(a => {
      return a.qtd * a.preco;
    }).reduce((a, b) => a + b);

    const pedido: Pedido = {
      comprador: user.nome,
      itens: this.itensPedido,
      total,
      status: 'Registrado',
      dtCompra: new Date()
    }

    const idPedido = await this.pedidoService.cadastraPedido(pedido);

    this.router.navigate([`../status/${idPedido}`], { relativeTo: this.activatedRoute })

    // this.modalController.create({
    //   component: StatusPedidoComponent,
    //   componentProps: pedido
    // });

  }

}
