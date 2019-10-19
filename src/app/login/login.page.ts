import { LoginService} from './login.service';
import { LoginPageModule } from './login.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../sessions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: LoginPageModule[];
  loading;
  usuario: string;
  senha: string;


  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    public session: Session) {
  }

  logar() {
    // Função de busca de dados do ponto turistico
    /*this.http.post((this.url + '/login'), { email: this.usuario, senha: this.senha },
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) })
      .subscribe(data => {
        console.log(data);
      });*/
    this.service.login(this.usuario, this.senha).subscribe(data  => {
      console.log(data.Permissao);
      if(data.Permissao){
      this.router.navigate(['/home']);} 
      else { 

      }
    });
  }

  ngOnInit() {

  }

}

