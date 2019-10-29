import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.page.html',
  styleUrls: ['./modal-quiz.page.scss'],
})
export class ModalQuizPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
