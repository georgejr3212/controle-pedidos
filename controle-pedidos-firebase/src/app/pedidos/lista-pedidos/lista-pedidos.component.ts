import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-lista-pedidos-pedido',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss'],
})
export class ListaPedidosComponent implements OnInit {
  pedidos$: Observable<Pedido[]>;
  user = JSON.parse(localStorage.getItem('user')).perfil.descricao;
  constructor(private activatedRoute: ActivatedRoute, private pedidoService: PedidoService) { }

  async ngOnInit() {
    this.pedidos$ = await this.pedidoService.getAllPedidos();
  }

  onChangeSituacaoPedido(id, status) {
    this.pedidoService.atualizaStatusPedido(id, status)
      .then(res => console.log('res', res));
  }

}
