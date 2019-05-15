import { ActivatedRoute } from '@angular/router';
import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.scss'],
})
export class StatusPedidoComponent implements OnInit {
  idPedido: string;
  pedido$: Observable<Pedido>;
  constructor(private activatedRoute: ActivatedRoute, private pedidoService: PedidoService) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(p => this.idPedido = p.id);
    this.pedido$ = await this.pedidoService.getPedido(this.idPedido);
  }

}
