import { LoginService, DataUser} from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../sessions';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataUser: DataUser;
  usuario: string;
  senha: string;
  loading: any;
  toast: any;

  constructor(
    private service: LoginService,
    private router: Router,
    public session: Session,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  async presentToastWithOptions() {
    this.toast = await this.toastController.create({
      header: 'Erro',
      message: 'Usuário ou senha incorretos.',
      duration: 5000,
      position: 'top',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return this.toast.present();
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
    this.presentLoadingWithOptions();
    this.service.login(this.usuario, this.senha).subscribe((data: DataUser)  => {
      this.dataUser = data;
      if (this.dataUser.Permissao === true) {
        this.loading.dismiss();
        this.router.navigate(['/home']);
        localStorage.setItem('DadosUsuario', JSON.stringify(this.dataUser));
      } else {
        this.loading.dismiss();
        this.presentToastWithOptions();
      }
    });
  }

  navCadastro() {
    this.router.navigate(['/cadastro']);
  }

  ngOnInit() {}

}

