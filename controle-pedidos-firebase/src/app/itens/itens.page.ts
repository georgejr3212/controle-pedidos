import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { Item } from '../models/Item';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.page.html',
  styleUrls: ['./itens.page.scss'],
})
export class ItensPage implements OnInit {

  categorias$: Observable<Categoria[]>;
  itensCategoria$: Observable<any>;
  cats;
  itens = [];
  constructor(private modalController: ModalController, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categorias$ = this.categoriaService.getAll();
    this.categorias$.subscribe(res => this.cats = res);
  }

  async openModalItem(operation, data?, categoriaId?) {
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps: { categorias: this.cats, operation, item: data, categoriaId }
    });

    return await modal.present();
  }

  onRemoveInativos(itens) {
    return itens.filter(res => res.ativo !== '0');
  }


}
