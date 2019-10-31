import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.page.html',
  styleUrls: ['./modal-quiz.page.scss'],
})
export class ModalQuizPage implements OnInit {

  ponto: string;

  constructor(private modal: ModalController, private navParams: NavParams) {
    this.ponto = this.navParams.get('ponto');
    console.log(this.navParams.get('id')); // id do ponto pra puxar questão relacionada
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
