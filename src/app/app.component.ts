import { Component } from '@angular/core';

import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgPadre = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ){}


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

