import { Router } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cpfcnpj: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    razao_social: new FormControl('')
  })
  constructor(
    private sUser: UserService,
    private route: Router,
    private sAuth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  checkErros(value){
    let hasError: string;
    console.log(value)
    if (value.name.length <= 0){
      hasError = 'O campo de nome é obrigatorio.';
      document.getElementById('name').focus();
      document.getElementById('name').classList.add('is-invalid');
    }
    else if (value.email.length <= 0){
      hasError = 'O campo de E-mail é obrigatorio.';
      document.getElementById('email').focus();
      document.getElementById('email').classList.add('is-invalid');
    }
    else if (value.password.length <= 0) {
      hasError = 'O campo de senha é obrigatorio.';
      document.getElementById('password').focus();
      document.getElementById('password').classList.add('is-invalid');
    }
    else if (value.password.length < 6) {
      hasError = 'O campo de senha deve ter no minímo 6 caracteres.';
      document.getElementById('password').focus();
      document.getElementById('password').classList.add('is-invalid');
    }
    else if (value.cpfcnpj.length <= 0) {
      hasError = 'O campo CPF/CNPJ é obrigatorio.';
      document.getElementById('cpfcnpj').focus();
      document.getElementById('cpfcnpj').classList.add('is-invalid');
    }
    else if (value.phone.length <= 0) {
      hasError = 'O campo telefone/celular é obrigatorio.';
      document.getElementById('phone').focus();
      document.getElementById('phone').classList.add('is-invalid');
    }
    if (hasError){
      return hasError;
    } else {
      return true;
    }
  }

  onSubmit(value){
    if (this.checkErros(value) === true){
      this.sUser.register(value).subscribe(r => {
        alert('Registrado com sucesso!');
        this.sAuth.login(value.email, value.password).subscribe(r => {
          this.route.navigate(['/user/briefing']);
        })
      }, e => {
        alert(e);
      })
    } else {
       alert(this.checkErros(value));
    }
   }

  getError(formcontrolname: string){
    const form = this.registerForm.controls[formcontrolname];
    if(form.invalid && (form.dirty || form.touched)){
      if (form.errors?.required) {
        return 'Este campo é requirido.';
      }
      if (form.errors?.minlength) {
        return `Minímo ${form.errors.minlength.requiredLength} caracteres.`;
      }
    }
  }

}

