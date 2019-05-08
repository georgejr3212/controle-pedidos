import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user: any = localStorage.getItem('user');
    if (!user) { return; }
    let roles = route.data['roles'] as Array<string>;
    user = JSON.parse(user);
    console.log('user', user);
    console.log('roles', roles);
    if (!roles || roles.indexOf(user.perfil.descricao) > -1) {
      return true;
    }

    this.router.navigate(['/login']);
    console.log('sem permissão');
    return false;
  }

}
