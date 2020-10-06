import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(
    private sAuth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(value){
   if (this.checkErros(value) === true){
      this.sAuth.login(value.username, value.password).subscribe(
        r => {
        console.log(r);
        alert('Logado com sucesso!');
      }, e => {
        alert('Erro ao logar!');
      });
   } else {
      alert(this.checkErros(value));
   }
  }

  checkErros(value){
    let hasError: string;
    if (value.username.length <= 0){
      hasError = 'O campo de E-mail ou CPF/CNPJ é obrigatório.';
      document.getElementById('username').focus();
      document.getElementById('username').classList.add('is-invalid');
    }
    else if (value.password.length <= 0) {
      hasError = 'O campo de senha é obrigatório.';
      document.getElementById('password').focus();
      document.getElementById('password').classList.add('is-invalid');
    }
    else if (value.password.length < 6) {
      hasError = 'O campo de senha deve ter no minímo 6 caracteres.';
      document.getElementById('password').focus();
      document.getElementById('password').classList.add('is-invalid');
    }
    if (hasError){
      return hasError;
    } else {
      return true;
    }
  }



  getError(formcontrolname: string){
    const form = this.loginForm.controls[formcontrolname];
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
