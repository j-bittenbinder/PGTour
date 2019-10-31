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
    console.log(this.navParams.get('id')); // id do ponto pra relacionar avaliação
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
