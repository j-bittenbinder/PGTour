import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {

  ponto: string;

  constructor(private modal: ModalController, private navParams: NavParams) {
    this.ponto = this.navParams.get('ponto');
    // id do ponto pra relacionar avaliação
    // console.log(this.navParams.get('id'));
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
