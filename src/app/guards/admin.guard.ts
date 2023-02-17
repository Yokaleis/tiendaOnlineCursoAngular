import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Importamos el estado del usuario
import { AuthService } from "./../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.user
  .pipe(
    map(user => {
      //Este signo de pregunta es importante por que nos protege de errores por que podemos recibir un null 
      if(user?.role === 'admin') {
        return true;
      }else{
        this.router.navigate(['/home']);
        return false;//Si no es admin no lo dejamos ingresar
      }
    })
  )
}

  }
  
