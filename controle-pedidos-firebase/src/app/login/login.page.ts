import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private userService: UsuarioService) { }

  ngOnInit() {
  }

  onLogin() {
    this.userService.login(this.username, this.password).subscribe(result => {
      localStorage.setItem('user', JSON.stringify(result));
      console.log(result);
      switch (result.perfil.descricao) {
        case 'admin':
          this.router.navigate(['./itens']);
          break;

        case 'operador':
          this.router.navigate(['./pedidos/lista-pedidos']);
          break;

        case 'cliente':
          this.router.navigate(['./pedidos/montar-pedido']);
          break;
      }
    });
  }

}
