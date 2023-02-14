import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //Metodo para guardar el token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  //Metodo para obtener el token guardado en localstorage
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  //Metododo para eliminar el token
  removeToken() {
    localStorage.removeItem('token');
  }
  
}
