import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from '../services/categoria.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias$: Observable<Categoria[]>;

  constructor(private modalController: ModalController, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categorias$ = this.categoriaService.getAll();
  }

  async openModalItem(operation: string, categoria?: string) {
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps: { categoria, operation }
    });

    return await modal.present();
  }

  onRemove(id: string) {
    this.categoriaService.removeCategoria(id);
  }

}
