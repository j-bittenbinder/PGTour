import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private modal: ModalController, private router: Router, private menu: MenuController) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  logout() {
    this.menu.enable(false);
    localStorage.clear();
    this.router.navigate(['login']);
    this.modal.dismiss();
  }
}
