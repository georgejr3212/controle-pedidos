import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.page.html',
  styleUrls: ['./itens.page.scss'],
})
export class ItensPage implements OnInit {

  itens$: Observable<Categoria[]>;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.itens$ = this.categoriaService.getAll();
  }

}
