import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/Pedido';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.scss'],
})
export class MeusPedidosComponent implements OnInit {
  user;
  pedidos$: Observable<Pedido[]>;
  constructor(private activatedRoute: ActivatedRoute, private pedidoService: PedidoService, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.pedidos$ = await this.pedidoService.getAllPedidosByUser(user.nome);
  }

}
