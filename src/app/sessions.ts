import { Storage } from '@ionic/storage';

// pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';



@Injectable()
export class Session {

    constructor(public storage: Storage) {

    }
    // setando uma seção e passando o tipo de usuário
    create(usuario) {
        this.storage.set('usuario', usuario);
        // console.log('usuario do storage fodase ', this.storage.set('usuario', usuario));
    }

    get(): Promise<any> {
        return this.storage.get('usuario');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('usuario');
    }

    // exist() {
    //     this.storage.get('usuario')
    //     .then(res => {
    //         if(res!=null) {
    //             console.log("foi");
    //             return true;
    //         } else {
    //             return "nao foi";
    //         }
    //     });
    // }
}
