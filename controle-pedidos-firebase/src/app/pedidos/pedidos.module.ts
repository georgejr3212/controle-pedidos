import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { PedidosPage } from './pedidos.page';
import { StatusPedidoComponent } from './status-pedido/status-pedido.component';
import { AuthGuard } from '../utils/auth.guard';
import { MeusPedidosComponent } from './meus-pedidos/meus-pedidos.component';

const routes: Routes = [
  {
    component: PedidosPage,
    canActivate: [AuthGuard],
    data: { roles: ['cliente', 'admin', 'operador'] },
    path: 'montar-pedido',
  },
  {
    path: 'lista-pedidos',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'operador'] },
    component: ListaPedidosComponent,
  },
  {
    path: 'status/:id',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'cliente'] },
    component: StatusPedidoComponent
  },
  {
    path: 'meus-pedidos',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'cliente'] },
    component: MeusPedidosComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PedidosPage, StatusPedidoComponent, ListaPedidosComponent, MeusPedidosComponent]
})
export class PedidosPageModule { }
