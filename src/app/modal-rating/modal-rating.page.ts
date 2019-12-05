import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.page.html',
  styleUrls: ['./modal-rating.page.scss'],
})
export class ModalRatingPage implements OnInit {

  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  ponto: string;

  constructor(private modal: ModalController, private navParams: NavParams) {
    this.ponto = this.navParams.get('ponto');
    // id do ponto pra relacionar avaliação
    // console.log(this.navParams.get('id'));
  }

  rate(index: number) {
    console.log(index);
    this.rating = index;
    this.ratingChange.emit(this.rating);
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
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
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:

          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green
    */
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }



}
