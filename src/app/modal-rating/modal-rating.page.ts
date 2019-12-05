import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PontoTuristicoService, DadosPonto } from '../ponto-turistico/ponto-turistico.service';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {

  ponto: string;
  comentario: string;
  userData: any;

  constructor(private modal: ModalController, private navParams: NavParams, private service: PontoTuristicoService) {
    this.userData = JSON.parse(localStorage.getItem('DadosUsuario'));
    // id do ponto pra relacionar avaliação
    // console.log(this.navParams.get('id'));
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  
  async avaliar(){
    let dados = {
      usuario_email: this.userData.objeto.email,
      comentario: this.comentario,
      ponto_turistico_id:this.navParams.get('id'),
      nota: 4
    }

    this.service.avaliarPonto(dados).subscribe(async data=>{
      if(data){
        alert("Comentário cadastrado !");
        this.modal.dismiss();
      }
    })
  }
}
