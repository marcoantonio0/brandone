import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  private returnUrl;
  constructor(
    private sAuth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(this.sAuth.currentUserValue){
      this.router.navigate(['/']);
    }
    if(this.route.snapshot.queryParams['session'] === 'true'){
      this.snackbar.open('Sua sessão foi encerrada, faça login novamente.', 'OK', { duration: 2000 });
    }
  }

  ngOnInit(): void {
  }

  Submit(value){
    if (this.checkErros(value) === true){
      this.sAuth.login(value.username, value.password).subscribe(
        r => {
        alert('Logado com sucesso!');
        this.router.navigateByUrl(this.returnUrl);
      }, e => {
        alert(e);
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
