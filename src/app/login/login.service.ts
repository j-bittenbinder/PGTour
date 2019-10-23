import { LoginPageModule } from './login.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'https://apipgtour.herokuapp.com/index.php';
  private headerHttp = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(user: string, pass: string): Observable<LoginPageModule> {
    return this.http.post<LoginPageModule[]>((this.API + '/login'), { email: user, senha: pass }, this.headerHttp);
  }
}

export interface DataUser {
  Permissao: boolean;
  Usuario: string;
  objeto: Objeto[];
}

export interface Objeto {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  cpf: string;
  senha: string;
  pontos: string;
  nome: string;
  rg: string;
  telefone: string;
  email: string;
  img: string;
}


