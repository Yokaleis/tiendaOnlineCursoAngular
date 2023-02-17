import { Component, OnInit } from '@angular/core';

import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";

import { TokenService } from "./services/token.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  imgPadre = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private usersService: UsersService
  ){}
    //De esta forma mantenemos el estado de login del usuario y al ir a otra ruta no tendra que entrar nuevamente
  ngOnInit(){
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile()
      .subscribe()
    }
  }


  onLoaded(img: String) {
    console.log('Ha llegado al componente padre', img);
  }

  /*Metodo para cambiar de estado a showImg*/
  toggleImg(){
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Jhon',
      email: 'john@mail.com',
      password: 'changeme',
      role: 'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  

}

