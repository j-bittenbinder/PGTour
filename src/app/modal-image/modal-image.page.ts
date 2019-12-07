import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage implements OnInit {

  @ViewChild('slider', { static: true }) slider: any;

  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modal: ModalController, private navParams: NavParams) {}

  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modal.dismiss();
  }

}
