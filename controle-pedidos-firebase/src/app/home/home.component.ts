import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  perfil = JSON.parse(localStorage.getItem('user')).perfil.descricao;

  constructor() { }

  ngOnInit() {}

}
