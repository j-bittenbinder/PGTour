import { FormControl, FormGroup } from '@angular/forms';

export class EmailValidator {

  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  static eIgual(formGroup: FormGroup) {
    let mail;
    let mail2 = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let controle: FormControl = <FormControl>formGroup.controls[key];

        if (mail === undefined) {
          mail = controle.value
        } else {
          if (mail !== controle.value) {
            mail2 = false;
            break;
          }
        }
      }
    }

    if (mail2) {
      return null;
    }

    return {
      eIgual: true
    };
  }
}
