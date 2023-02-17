import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Auth } from "../models/auth.models";
import { User } from '../models/users.models';
import { TokenService } from "./../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  //private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  //Reactivamente guardamos el estado del usuario
  private user$ = new BehaviorSubject<User | null>(null);
  user = this.user$.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }
  
  getCurrentUser() {
    const token = this.tokenService.getToken();
    if (token) {
      this.getProfile()
      .subscribe()
    }
  }

  //Metodo de login
  login(email: string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  //Metodo para obtener el perfil del usuario
  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    //Esto permite hacer la peticion una vez
    .pipe(
      tap(user => this.user$.next(user))
    );
  }
  /* getProfile(token: string){
    //Para hacerlo dinamico creamos esta constante
    //const headers = new HttpHeaders();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
  } */
  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  logout(){ 
    this.tokenService.removeToken();
    this.user$.next(null);
  }

}
