import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { ItensPage } from './itens.page';

const routes: Routes = [
  {
    path: '',
    component: ItensPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItensPage, IndexComponent, FormComponent]
})
export class ItensPageModule { }
