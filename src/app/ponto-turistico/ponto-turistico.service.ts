import { PontoTuristicoPageModule, PontoTuristicoImg, PontoTuristicoComentario, PontoTuristicoPerguntas } from './ponto-turistico.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PontoTuristicoService {

  private readonly API = 'https://apipgtour.herokuapp.com/index.php';
  private headerHttp = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPesquisa(text) {
    return this.http.post<PontoTuristicoPageModule[]>((this.API + '/buscaPontoTuristico'), { nomePonto: text }, this.headerHttp);
  }

  getListaPontos() {
    return this.http.get<PontoTuristicoPageModule[]>(this.API + '/getPontoTuristico');
  }
  getRankPontos() {
    return this.http.get<PontoTuristicoPageModule[]>(this.API + '/getRank');
  }
  getPonto(idPonto): Observable<PontoTuristicoPageModule> {
    return this.http.post<PontoTuristicoPageModule[]>((this.API + '/getDadosPontoTuristico'), { id: idPonto }, this.headerHttp);
  }
  getFotos(idPonto) {
    return this.http.post<PontoTuristicoImg[]>((this.API + '/getImagensPonto'), { id: idPonto }, this.headerHttp);
  }
  getAvaliacoes(idPonto) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/getAvaliacoes'), { id: idPonto }, this.headerHttp);
  }
  getPerguntas(idPonto, email) {
    return this.http.post<PontoTuristicoPerguntas[]>((this.API + '/getPerguntas'), { id: idPonto, email }, this.headerHttp);
  }
  getResposta(idPonto) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/getResposta'), { id: idPonto }, this.headerHttp);
  }
  responder(idPonto, email) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/responder'), { id: idPonto, usuario_email: email }, this.headerHttp);
  }
  atribuirPonto(email, pontos) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/atribuirPonto'), { email, pontos }, this.headerHttp);
  }
  avaliarPonto(dados) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/avaliarPonto'), dados, this.headerHttp);
  }
  alterarUsuario(dados) {
    return this.http.post<PontoTuristicoComentario>((this.API + '/alterUser'), dados, this.headerHttp);
  }
  addvisita(id){
    return this.http.post<PontoTuristicoComentario>((this.API + '/addVisita'), {id}, this.headerHttp);
  }
}

export interface DadosPonto {
  id_ponto: string;
  nome: string;
  descricao: string;
  latitude: string;
  longitude: string;
  endereco: string;
  quantidade_visita: string;
}
