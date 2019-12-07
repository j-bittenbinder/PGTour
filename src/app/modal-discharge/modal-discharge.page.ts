import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-discharge',
  templateUrl: './modal-discharge.page.html',
  styleUrls: ['./modal-discharge.page.scss'],
})
export class ModalDischargePage implements OnInit {

  constructor(private modal: ModalController) { }

  close() {
    this.modal.dismiss();
  }

  ngOnInit() {
  }

}
