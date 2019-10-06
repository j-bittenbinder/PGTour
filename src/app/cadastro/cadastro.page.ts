import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nome: string;
  telefone: string;
  email: string;
  email2: string;
  senha: string;
  senha2: string;
  url = 'https://apipgtour.herokuapp.com/index.php';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {

   }

  cadastrar() {
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone
    };
    // Constante do header
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
      };
    // Função de busca de dados do ponto turistico
    if (this.email === this.email2 && this.senha === this.senha2) {
      this.http.post((this.url + '/addUser'), dados, httpOptions)
      .subscribe(data => {
        console.log(data);
      });
    } else if (this.senha !== this.senha2) {
      alert('Senha não confere');
    } else {
      alert('Email não confere');
    }
  }
  ngOnInit() {
  }

}
