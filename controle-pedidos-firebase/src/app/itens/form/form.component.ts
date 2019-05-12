import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Categoria } from 'src/app/models/Categoria';
import { Item } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  categorias: Categoria[];
  operation: string;
  descricao: string;
  preco: number;
  categoriaId: string;
  ativo: number;
  item: Item;
  id: string;
  categoria: Categoria;
  constructor(
    private navParams: NavParams,
    private itemService: ItemService,
    private modalController: ModalController) {
    this.categorias = this.navParams.data.categorias;
    this.operation = this.navParams.data.operation;
  }

  ngOnInit() {
    this.item = this.navParams.data.item;
    this.categoriaId = this.navParams.data.categoriaId;
    if (this.item) {
      this.descricao = this.item.descricao;
      this.preco = this.item.preco;
      this.ativo = this.item.ativo;
      this.id = this.item.id;
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }

  onSave() {
    const categoria = new Categoria();
    const item: any = {};

    categoria.id = this.categoriaId;
    item.descricao = this.descricao;
    item.preco = this.preco;
    item.ativo = this.ativo;
    item.id = this.id;
    categoria.itens = [item];
    if (this.operation === 'edit') {
      this.itemService.atualizaItem(categoria).then(data => console.log('deu certo', data));
    } else {
      this.itemService.cadastraItem(categoria).then(data => console.log('deu certo', data));
    }
    this.modalController.dismiss();
  }

}
