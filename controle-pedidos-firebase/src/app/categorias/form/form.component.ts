import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  categorias: Categoria[];
   
  descricao: string;
  categoriaId: string;
  operation: string;

  constructor(private navParams: NavParams, private categoriaService: CategoriaService, private modalController: ModalController) {
    const categoria = this.navParams.data.categoria;
    this.operation = this.navParams.data.operation;
    if (categoria) {
      this.descricao = categoria.descricao;
      this.categoriaId = categoria.id;
    }
  }

  ngOnInit() {

  }

  onSave() {
    const categoria = new Categoria();
    categoria.descricao = this.descricao;
    categoria.id = this.categoriaId;
    
    if (this.operation === 'edit') {
      this.categoriaService.atualizaCategoria(categoria).then(data => console.log('deu certo', data));
    } else {
      this.categoriaService.cadastraCategoria(categoria);
    }

    this.modalController.dismiss();
  }

  onCancel() {
    this.modalController.dismiss();
  }

}
