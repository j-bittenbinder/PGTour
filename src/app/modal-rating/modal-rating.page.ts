import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController, ModalController, NavParams, Events } from '@ionic/angular';
import { PontoTuristicoService } from '../ponto-turistico/ponto-turistico.service';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {

  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  ponto: string;
  comentario: string;
  userData: any;
  toast: any;

  constructor(
    private modal: ModalController,
    private navParams: NavParams,
    private service: PontoTuristicoService,
    private events: Events,
    private toastController: ToastController
  ) {
    this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
    // id do ponto pra relacionar avaliação
    // console.log(this.navParams.get('id'));
  }

  async presentToastWithOptions() {
    this.toast = await this.toastController.create({
      header: 'Sucesso!',
      message: 'Seu comentário foi cadastrado ;)',
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

  rate(index: number) {
    console.log(index);
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    enum COLORS {
      GREY = '#E0E0E0',
      GOLD = 'gold'
    }

    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.GOLD;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }

  async avaliar() {
    let dados = {
      usuario_email: this.userData.objeto.email,
      comentario: this.comentario,
      ponto_turistico_id:this.navParams.get('id'),
      nota: 4
    }

    this.service.avaliarPonto(dados).subscribe(async data=>{
      if(data){
        this.presentToastWithOptions();
        this.modal.dismiss();
        this.events.publish('rating:changed', data); // manda evento p ponto-turistico.page atualizar comentários
      }
    })
  }
}
