import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-ponto-turistico',
  templateUrl: './ponto-turistico.page.html',
  styleUrls: ['./ponto-turistico.page.scss'],
})
export class PontoTuristicoPage implements OnInit {
  pontos = {
    nome : ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      // Id do ponto turistico solicitado na home
      const dados = {
        id: params[0]
      };
      // Constante do header fodase
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
          })
        };
      // Função de busca de dados do ponto turistico
      this.http.post('https://apipgtour.herokuapp.com/index.php/getDadosPontoTuristico', dados, httpOptions)
      .subscribe(data => {
        this.pontos = data[0];
        console.log(this.pontos);
      });
    });

  }

  ngOnInit() {
  }

}
