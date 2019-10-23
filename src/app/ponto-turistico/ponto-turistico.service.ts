import { PontoTuristicoPageModule, PontoTuristicoImg } from './ponto-turistico.module';
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

  getPonto(idPonto): Observable<PontoTuristicoPageModule> {
    return this.http.post<PontoTuristicoPageModule[]>((this.API + '/getDadosPontoTuristico'), { id: idPonto }, this.headerHttp);
  }

  getFotos(idPonto) {
    return this.http.post<PontoTuristicoImg[]>((this.API + '/getImagensPonto'), { id: idPonto }, this.headerHttp);
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


