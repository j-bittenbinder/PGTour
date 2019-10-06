import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string;
  senha: string;
  url = 'https://apipgtour.herokuapp.com/index.php';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {

  }

  logar() {
    const dados = {
      email: this.usuario,
      senha: this.senha,
    };
    // Constante do header
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    // Função de busca de dados do ponto turistico
    this.http.post((this.url + '/login'), dados, httpOptions)
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }

}

