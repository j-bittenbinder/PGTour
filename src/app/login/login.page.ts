import { LoginService} from './login.service';
import { LoginPageModule } from './login.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../sessions';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: LoginPageModule[];
  usuario: string;
  senha: string;
  loading: any;

  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    public session: Session,
    public toastController: ToastController,
    public loadingController: LoadingController ) {
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Erro',
      message: 'Usuário ou senha incorretos.',
      position: 'top',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present();
  }

  logar() {
    // Função de busca de dados do ponto turistico
    /*this.http.post((this.url + '/login'), { email: this.usuario, senha: this.senha },
      { headers: new HttpHeaders({'Content-Type': 'application/json'}) })
      .subscribe(data => {
        console.log(data);
      });*/
    this.presentLoadingWithOptions();
    this.service.login(this.usuario, this.senha).subscribe(data  => {
      console.log(data.Permissao);
      if(data.Permissao){
      this.loading.dismiss();
      this.router.navigate(['/home']);} 
      else { 
        this.loading.dismiss();
        this.presentToastWithOptions();
      }
    });
  }

  ngOnInit() {

  }

}

