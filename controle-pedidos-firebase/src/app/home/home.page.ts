import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    // const user = new Usuario();
    // user.nome = 'George Alexandre';
    // user.password = '12345';
    // user.perfil = 'QkVBiQfsbkr6odNpExwY';

    // this.usuarioService.cadastraUsuario(user);
  }

}
