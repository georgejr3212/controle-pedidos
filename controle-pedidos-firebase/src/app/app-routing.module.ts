import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { HomeComponent } from './home/home.component';

// import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'itens', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'itens',
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
        loadChildren: './itens/itens.module#ItensPageModule'
      },
      {
        path: 'categorias',
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
        loadChildren: './categorias/categorias.module#CategoriasPageModule'
      },
      {
        path: 'pedidos',
        loadChildren: './pedidos/pedidos.module#PedidosPageModule'
      },
    ]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
