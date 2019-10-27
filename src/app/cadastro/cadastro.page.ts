import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from '../validators/country-phone.model';
import { EmailValidator } from '../validators/email.validator'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  name: string;
  phone: string;
  email: string;
  password: string;
  url = 'https://apipgtour.herokuapp.com/index.php';
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  matching_email_group: FormGroup;

  countries: Array<CountryPhone>;


  

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    public formBuilder : FormBuilder) {
     
  // Array de países para validação de telefone
      this.countries = [
        new CountryPhone('BR', 'Brasil'),
        new CountryPhone('US', 'United States'),        
      ];

  // Criação do formGroup de confirmação de email
      this.matching_email_group = new FormGroup({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        confirm_email: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return EmailValidator.eIgual(formGroup);
      });
  
  // Criação do formGroup de confirmação de senha
      this.matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_.+-]+$')
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      });      

  
      // Validação de países e telefone
      let country = new FormControl(this.countries[0], Validators.required);
      let phone = new FormControl('', Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ]));
      this.country_phone_group = new FormGroup({
        country: country,
        phone: phone
      });


      // Criação do formBuilder do form inteiro
      this.validations_form =this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(7)
        ])),
        country_phone: this.country_phone_group,
        matching_email: this.matching_email_group,
        matching_passwords: this.matching_passwords_group,        
        terms: new FormControl(true, Validators.pattern('true'))
      });  



   }

  cadastrar() {
    const dados = {
      nome: this.name,
      email: this.email,
      senha: this.password,
      telefone: this.phone
    };
    // Constante do header
    const headerHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(dados)
    // Função de busca de dados do ponto turistico
      this.http.post(this.url + '/addUser', dados, headerHttp)
      .subscribe(data => {
        console.log(data);        
      });
      this.router.navigate(["/login"]);
    }
  ngOnInit() {
   


  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Seu nome é obrigatório.' },
      { type: 'minlength', message: 'Tamanho mínimo de 7 caracteres.'}
    ],
    'phone': [
      { type: 'required', message: 'Seu telefone é obrigatório.' },
      { type: 'validCountryPhone', message: 'O telefone é inválido para o país selecionado.' }
    ],
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Por favor entre com um e-mail válido.' }
    ],
    'confirm_email':[
      {type: 'required', message: 'É necessário confirmar o e-mail.'}
    ],
    'matching_email': [
      { type: 'eIgual', message: 'E-mail não confere.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Senha deve ter no mínimo 5 caracteres' },
      { type: 'pattern', message: 'Sua senha deve ter no mínimo uma letra maíuscula, uma minúscula e um número.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'É necessário confirmar a senha.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'As senhas não conferem.' }
    ],
    'terms': [
      { type: 'pattern', message: 'Você deve aceitar os termos e condições.' }
    ],
  };
  
}


