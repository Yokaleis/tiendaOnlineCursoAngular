import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User, CreareUserDTO } from "../models/users.models";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api';
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api';
  //private apiUrl = 'https://api.escuelajs.co/api/v1/users';


  constructor(
    private http: HttpClient
  ) { }

  //Creamos el usuario
  create(dto: CreareUserDTO){
    return this.http.post<User>(this.apiUrl, dto);
  }

  //Obtenemos un array de todos los usuarios
  getAllUser(){
    return this.http.get<User[]>(this.apiUrl);
  }
}
