import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalone',
  templateUrl: './modalone.page.html',
  styleUrls: ['./modalone.page.scss'],
})
export class ModalonePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

}
