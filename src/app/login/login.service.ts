import { LoginPageModule } from './login.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'https://apipgtour.herokuapp.com/index.php';
  private headerHttp = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(user: string, pass: string) {
    return this.http.post<LoginPageModule[]>((this.API + '/login'), { email: user, senha: pass }, this.headerHttp);
  }
}
