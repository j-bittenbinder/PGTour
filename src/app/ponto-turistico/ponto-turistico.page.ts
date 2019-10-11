import { PontoTuristicoService, DadosPonto } from './ponto-turistico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PontoTuristicoImg, PontoTuristicoPageModule } from './ponto-turistico.module';

@Component({
  selector: 'app-ponto-turistico',
  templateUrl: './ponto-turistico.page.html',
  styleUrls: ['./ponto-turistico.page.scss'],
})
export class PontoTuristicoPage implements OnInit {

  point: DadosPonto;
  ponto: PontoTuristicoPageModule[];
  urls: PontoTuristicoImg[];

  constructor(private service: PontoTuristicoService, private route: ActivatedRoute,
              private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.service.getPonto(params[0]).subscribe(dados  => {
        this.ponto = dados;
        console.log('ponto:');
        console.log(this.ponto);
      });
      this.service.getFotos(params[0]).subscribe(datap => {
        this.urls = datap;
        console.log('fotos:');
        console.log(this.urls);
      });
    });
}

  ngOnInit() {}

}
