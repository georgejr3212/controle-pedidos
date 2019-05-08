import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'itens', pathMatch: 'full' },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'itens', loadChildren: './itens/itens.module#ItensPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
